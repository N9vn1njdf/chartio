import { Text, Circle, Rectangle } from 'elements'

export default class Main {

   constructor({width, height}) {
      this.width = width;
      this.height = height;

      this.element = new Rectangle({h: height,
         color: 'rgba(200, 100, 100, 0.3)'
      });
   }
   
   update({offset, scale, dates_column, columns, hidden_columns, colors, locale}) {
      this.element.x = offset;
      this.scale = scale;
      this.columns = columns;
      this.hidden_columns = hidden_columns;
      this.colors = colors;

      this.updateColumns();
   }

   updateColumns() {
      if (this.columns.length == 0) {
         return;
      }

      var children = [];
      
      for (let i = 0; i < this.columns.length; i++) {
         if (this.hidden_columns.includes(i)) {
            continue;
         }

         let column = this.columns[i];
         
         for (let i = 1; i < column.length; i++) {
            let rect = new Circle({
               x: (i-1) * this.scale.x,
               y: this.height - column[i] * this.scale.y,
               r: 5,
               color: this.colors[column[0]],
               children: [
                  new Text({text: column[i], size: 10})
               ]
            });

            children.push(rect);
         }
      };

      this.element.children = children;
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }
}