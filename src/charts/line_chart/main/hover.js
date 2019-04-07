import { Position, Rectangle, Circle } from 'elements'

export default class Hover {

   constructor({canvas, width, height, localeObserver, themeObserver, hiddenColumnsObserver}) {
      this.canvas = canvas;
      this.width = width;
      this.height = height;
      this.prev_input = {};
      this.hidden_columns = [];
      this.r = 5

      localeObserver.subscribe(locale => {         
         this.locale = locale;
         this.updatePointers();
      })

      this.padding_bottom = 0;

      themeObserver.subscribe(theme => {
         this.padding_bottom = theme.main_padding_bottom;
         this.background = theme.background;
         this.line.color = theme.line_color2;

         this.div.setAttribute('class', 'chart-popup ' + theme.name + '-theme')

         this.updatePointers();
      })

      hiddenColumnsObserver.subscribe(([act, index]) => {         
         if (act == 'hide' && this.visible_columns.length > 1) {
            this.hidden_columns.push(index);
         }

         if (act == 'show') {
            for(let i in this.hidden_columns) {
               if (this.hidden_columns.includes(index)) {
                  this.hidden_columns.splice(i, 1);
               }
            }
         }
      })
      
      this.pointers = new Position()
      this.line = new Rectangle({w: 1, h: height})

      this.element = new Rectangle({
         h: height,
         // color: 'red',
         children: [
            this.line,
            this.pointers,
         ]
      })

      canvas.addEventListener('mouseout', () => this.hideInfo())
      
      this.element.on('move', (input, element) => this.onMove(input));
      this.element.on('leave', (input, element) => this.hideInfo());
      this.createInfo();
   }

   get visible_columns() {
      var result = [];
      for (let i = 0; i < this.columns.length; i++) {
         if (!this.hidden_columns.includes(i)) {
            result.push(i);
         }
      }
      return result;
   }

   update({offset, scale, columns, dates_column, colors, names}) {
      this.element.x = offset.x - 10;
      this.offset = offset;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.dates = dates_column;
      this.colors = colors;
      this.names = names;

      this.updatePointers();
   }

   updatePointers() {
      if (!this.scale) {
         return;
      }

      this.pointers.children = this.getColumnsGroup();
      this.element.w = (this.columns[0].length-2)*this.scale.x + 10;
   }

   onMove(input) {
      if (!this.columns || (input.x == this.prev_input.x && input.y == this.prev_input.y)) {
         return;
      }

      this.prev_input.x = input.x;
      this.prev_input.y = input.y;

      this.line.x = -this.element.x + input.x
      this.line.alpha = 1;

      let closerLeft = [];
      let closerRight = [];

      for(let i in this.pointers.children) {
         let point = this.pointers.children[i];
         if (this.hidden_columns.includes(point.column_index)) {
            continue;
         }

         let x = this.element.x + point._x

         if (x < input.x && (!closerLeft[point.column_index] || closerLeft[point.column_index].x < x)) {
            closerLeft[point.column_index] = point;
         } else if (x > input.x && (!closerRight[point.column_index] || closerRight[point.column_index].x > x)) {
            closerRight[point.column_index] = point;
         }

         point.alpha = 0;
      }

      if (closerLeft[0] || closerRight[0]) {

         if (closerRight[0] && (!closerLeft[0] || input.x - closerLeft[0].x >= closerRight[0].x - input.x)) {
            this.showInfo(closerRight);
         } else {
            this.showInfo(closerLeft);
         }

         let y = this.canvas.offsetTop + input.y - 20;
         let x = input.event.x + 20;         
         
         if (x + this.div.offsetWidth > this.width) {
            x = input.event.x - 20 - this.div.offsetWidth
         }

         this.div.style.top = y + 'px';
         this.div.style.left = x + 'px';

      } else {
         this.hideInfo();
      }
   }

   createInfo() {
      this.div = document.createElement('div');
      this.div.setAttribute('class', 'chart-popup')

      this.date_text = document.createElement('div');
      this.date_text.setAttribute('class', 'chart-popup-date')

      this.div.appendChild(this.date_text);

      this.div_columns = document.createElement('div');
      this.div_columns.setAttribute('class', 'chart-popup-values')
      this.div.appendChild(this.div_columns);

      document.body.appendChild(this.div);
   }

   createColumnInfo(index, value) {
      index = (index) >> 0;
      if (this.hidden_columns.includes(index)) {
         return;
      }

      let div = document.createElement('div');
      div.setAttribute('class', 'chart-popup-value')

      let count = document.createElement('div');      
      count.style.color = this.colors[this.columns[index][0]];
      count.setAttribute('class', 'chart-popup-value-count')
      count.innerHTML = value;
      div.appendChild(count);

      let label = document.createElement('div');
      label.setAttribute('class', 'chart-popup-value-label')

      label.innerHTML = this.names[this.columns[index][0]];
      div.appendChild(label);

      this.div_columns.appendChild(div);
   }

   showInfo(data) {      
      this.div_columns.innerHTML = null;
      for(let i in data) {
         data[i].alpha = 1;
         let value = data[i].value;
         this.createColumnInfo(i, value);
      }
      this.date_text.innerHTML = this.getDateByIndex(data[0].index)
      this.div.style.display = 'block';
   }

   hideInfo() {
      this.line.alpha = 0;
      this.div.style.display = 'none';
      this.pointers.children.forEach(point => point.alpha = 0)
   }

   getDateByIndex(index) {
      let date = new Date(this.dates[index]);
      let day = this.locale.day[date.getDay()]
      let d = date.getDate()
      let m = this.locale.month[date.getMonth()];
      let y = date.getFullYear();

      return day + ', ' + d + ' ' + m + ' ' + y
   }

   getColumnsGroup() {
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];
         
         for (let i = 1; i < column.length; i++) {
            let rect = new Circle({
               alpha: 0,
               x: (i-1) * this.scale.x + 10,
               y: (this.height - column[i] * this.scale.y + this.offset.y) - this.padding_bottom,
               r: this.r,
               border: {w: this.r/2, color: this.colors[column[0]]},
               color: this.background
            });

            rect.column_index = c_i;
            rect.value = column[i];
            rect.index = i;

            children.push(rect);
         }
      }

      return children;
   }
}