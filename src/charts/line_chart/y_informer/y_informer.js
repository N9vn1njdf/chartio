import { Text, Line, Rectangle, Circle } from 'elements'

export default class YInformer {

   constructor({width, height}) {
      this.width = width;
      this.height = height;
      this.lines_count = 5;

      this.element = new Rectangle({h: height});      
   }

   update({offset, scale, dates_column, columns, hidden_columns, colors, locale}) {
      this.element.x = 0;
      this.scale = scale;
      this.columns = columns;
      this.hidden_columns = hidden_columns;

      this.updateColumns();
   }

   updateColumns() {
      if (this.columns.length == 0) {
         return;
      }

      var children = [];
      
      for (let i = 0; i <= this.lines_count; i++) {
         let line = new Line({
            x: 0,
            y: this.height-(i*(this.height-30)/this.lines_count),
            color: '#c7c7c7',
            children: [
               new Text({y: -15, text: 'test', size: 12.5})
            ]
         });
         children.push(line);
      }

      this.element.children = children;
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }
}