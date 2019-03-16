import { Text, Line, Rectangle, Circle } from 'elements'

export default class YInformer {

   constructor({width, height}) {
      this.width = width;
      this.height = height;
      this.lines_count = 5;

      this.hidden_columns = [];

      this.element = new Rectangle({h: height});      
   }

   get offset() {
      return this._offset;
   }

   set offset(value) {
      this._offset = value;
      this.element.x = 0;
   }

   get scale() {
      return this._scale;
   }

   set scale(value) {      
      this._scale = value;
      this.update();
   }

   setData(columns) {
      this.columns = columns;
   }

   hideColumn(index) {
      this.hidden_columns.push(index);
      this.update();
   }

   showColumn(index) {
      for(let i in this.hidden_columns) {         
         if (this.hidden_columns[i] == index) {
            this.hidden_columns.splice(i, 1);
         }
      }      
      this.update();
   }

   update() {
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

      this.checkVisible();
   }





   checkVisible() {
      var visible_items = [];
      
      for (let i = 0; i < this.columns.length; i++) {
         if (this.hidden_columns.includes(i)) {
            continue;
         }

         let column = this.columns[i];

         for (let i = 1; i < column.length; i++) {
            let x = (i-1) * this.scale.x;

            if (x > -this.offset && x < -this.offset + this.width) {
               visible_items.push({x: x, y: this.height - column[i] * this.scale.y});
            }
         }
      }
   }

   getMinMaxY(items) {
      let min = items[items.length-1].y;
      let max = 0;

      items.forEach(element => {
         max = element.y > max ? element.y : max;
         min = element.y < min ? element.y : min;
      });

      return {
         min,
         max
      }
   }
}