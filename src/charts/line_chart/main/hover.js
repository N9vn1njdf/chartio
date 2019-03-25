import { Rectangle, Position, Circle } from 'elements'

export default class Hover {

   constructor({canvas, width, height, localeObserver, themeObserver, hiddenColumnsObserver}) {
      this.canvas = canvas;
      this.width = width;
      this.height = height;
      this.prev_input = {};
      this.hidden_columns = [];
      this.r = 0;

      localeObserver.subscribe(locale => {         
         this.locale = locale;
         this.updatePointers();
      })

      this.padding_bottom = 0;

      themeObserver.subscribe(theme => {
         this.padding_bottom = theme.main_padding_bottom;
         this.background = theme.background;
         this.line.color = theme.line_color2;
         this.font_size = theme.text_size3;
         this.font_family = theme.font_family;

         this.updateDiv(this.div, {
            background: this.background,
         });
         
         this.updateDiv(this.date_text, {
            color: theme.text_color3,
            'font-size': this.font_size + 'px',
            'font-family': theme.font_family,
         });

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
      
      this.pointers = new Rectangle({h: height})
      this.line = new Rectangle({w: 1, h: height})

      this.element = new Rectangle({
         w: width,
         h: height,
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

   updateDiv(element, styles) {
      for(let name in styles) {
         element.style[name] = styles[name]
      }
   }

   update({offset, scale, columns, dates_column, colors, names}) {
      this.element.x = offset.x;
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
      this.r = 2+(this.scale.x/10);
      if (this.r > 5) {
         this.r = 5;
      }
      
      this.pointers.children = this.getColumnsGroup();
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }

   onMove(input) {
      if (input.x == this.prev_input.x && input.y == this.prev_input.y) {
         return;
      }
      this.prev_input.x = input.x;
      this.prev_input.y = input.y;

      let x = -this.element.x + input.x;
      this.line.x = x;
      this.line.alpha = 1;
      let new_visible = false;

      let values = [];
      let index;
      
      this.pointers.children.forEach(point => {         
         if (this.hidden_columns.includes(point.column_index)) {
            return;
         }

         let x = this.element.x + point._x;

         if (input.x > x - point.r && input.x < x + point.r) {            
            new_visible = true;
            point.alpha = 1;
            values[point.column_index] = point.value;
            index = point.index;

         } else {
            point.alpha = 0;
         }
      });

      if (this.visible !== new_visible) {
         this.visible = new_visible;

         if (new_visible) {
            this.showInfo(values, index);
         } else {
            this.hideInfo();
         }
      }

      if (this.visible) {
         let y = this.canvas.offsetTop + input.y;
         
         this.div.style.top = (y < 100 ? 0 : y - 100) + 'px';
         this.div.style.left = (this.canvas.offsetLeft + input.x + 220) + 'px';
      }
   }

   createInfo() {
      this.div = document.createElement('div');
      this.updateDiv(this.div, {
         position: 'absolute',
         'padding-bottom': '8px',
         background: this.background,
         'box-shadow': '0px 0px 2px rgba(0, 0, 0, 0.42)',
         'border-radius': '6px',
         'display': 'none'
      });

      this.date_text = document.createElement('div');
      this.div.appendChild(this.date_text);
      this.updateDiv(this.date_text, {
         'font-weight': 'bold',
         margin: '10px 14px',
      });

      this.div_columns = document.createElement('div');
      this.div.appendChild(this.div_columns);
      this.updateDiv(this.div_columns, {
         margin: '-4px 14px',
      });

      document.body.appendChild(this.div);
   }

   createColumnInfo(index, value) {
      index = (index) >> 0;
      if (this.hidden_columns.includes(index)) {
         return;
      }

      let name = this.names[this.columns[index][0]];
      let color = this.colors[this.columns[index][0]];

      let div = document.createElement('div');
      this.updateDiv(div, {
         color,
         float: index%2 ? 'right' : 'left',
         'font-size': (this.font_size-2) + 'px',
         'font-family': this.font_family,
         'margin-right': '10px'
      });
      
      let count = document.createElement('div');
      this.updateDiv(count, {
         'font-size': (this.font_size*1.25) + 'px',
         'font-family': this.font_family,
         'font-weight': 'bold',
      })
      count.innerHTML = value;
      div.appendChild(count);

      let label = document.createElement('div');
      this.updateDiv(count, {
         'font-family': this.font_family,
      })
      label.innerHTML = name;
      div.appendChild(label);

      this.div_columns.appendChild(div);
   }

   showInfo(data, index) {
      this.div_columns.innerHTML = null;

      for(let i in data) {
         let value = data[i];
         this.createColumnInfo(i, value);
      }
      this.date_text.innerHTML = this.getDateByIndex(index)
      this.div.style.display = 'table';
   }

   hideInfo() {
      this.div.style.display = 'none';
   }

   getDateByIndex(index) {
      let date = new Date(this.dates[index]);
      let day = this.locale.day[date.getDay()]
      let d = date.getDate()
      let m = this.locale.month[date.getMonth()];

      return `${day}, ${m} ${d}`
   }

   getColumnsGroup() {
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];
         
         for (let i = 1; i < column.length; i++) {
            let rect = new Circle({
               alpha: 0,
               x: (i-1) * this.scale.x + 1,
               y: (this.height - column[i] * this.scale.y + this.offset.y) - this.padding_bottom + 1,
               r: this.r,
               border: {w: this.r/2-.5, color: this.colors[column[0]]},
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