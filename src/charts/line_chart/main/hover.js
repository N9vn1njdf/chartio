import { Rectangle, Position, Circle } from 'elements'

export default class Hover {

   constructor({width, height, themeObserver, hiddenColumnsObserver}) {
      this.width = width;
      this.height = height;
      this.prev_input = {};

      themeObserver.subscribe(theme => {
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

         if (this.scale) {
            this.updatePointers();
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
      
      this.element.on('move', (input, element) => this.onMove(input, element));

      this.createInfo();
   }

   updateDiv(element, styles) {
      for(let name in styles) {
         element.style[name] = styles[name]
      }
   }

   update({offset, scale, columns, colors, names}) {
      this.element.x = offset;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.colors = colors;
      this.names = names;

      this.updatePointers();
   }

   updatePointers() {
      this.pointers.children = this.getColumnsGroup();
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }

   onMove(input, element) {
      if (input.x == this.prev_input.x && input.y == this.prev_input.y) {
         return;
      }
      this.prev_input.x = input.x;
      this.prev_input.y = input.y;

      let x = -this.element.x + input.x;
      this.line.x = x;
      let new_visible = false;

      let values = [];

      this.pointers.children.forEach(point => {
         point.alpha = 0;
         
         if (input.x > point.x - point.r && input.x < point.x + point.r) {
            new_visible = true;
            point.alpha = 1;            
            values[point.column_index] = point.value;
         }
      });

      if (this.visible !== new_visible) {
         this.visible = new_visible;

         if (new_visible) {
            this.showInfo(values);
         } else {
            this.hideInfo();
         }
      }

      if (this.visible) {
         this.div.style.top = (input.y < 100 ? 0 : input.y - 100) + 'px';
         this.div.style.left = (input.x + 20) + 'px';
      }
   }

   createInfo() {
      this.div = document.createElement('div');
      this.updateDiv(this.div, {
         position: 'absolute',
         width: '120px',
         'padding-bottom': '8px',
         background: this.background,
         'box-shadow': '0px 0px 2px rgba(0, 0, 0, 0.42)',
         'border-radius': '6px',
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
         margin: '10px 14px',
      });

      document.body.appendChild(this.div);
   }

   createColumnInfo(index, value) {
      let name = this.names[this.columns[index][0]];
      let color = this.colors[this.columns[index][0]];

      let div = document.createElement('div');
      this.updateDiv(div, {
         color,
         float: 'left',
         'font-size': (this.font_size-2) + 'px',
         'font-family': this.font_family,
         'margin-right': index%2 ? 0 : '10px'
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

   showInfo(data) {
      this.div_columns.innerHTML = null;

      for(let i in data) {
         let value = data[i];
         this.createColumnInfo(i, value);
      }
      this.date_text.innerHTML = 'Sat, Feb 24'
      this.div.style.display = 'block';
   }

   hideInfo() {
      this.date_text.innerHTML = '213'
      this.div.style.display = 'none';
   }

   getColumnsGroup() {
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];
         
         for (let i = 1; i < column.length; i++) {
            let rect = new Circle({
               alpha: 0,
               x: (i-1) * this.scale.x,
               y: this.height - column[i] * this.scale.y,
               r: 5,
               border: {w: 2.5, color: this.colors[column[0]]},
               color: this.background
            });

            rect.column_index = c_i;
            rect.value = column[i];

            children.push(rect);
         }
      }

      return children;
   }
}