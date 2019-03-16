import { Circle, Rectangle } from 'elements'

export default class Main {

   constructor({width, height}) {
      this.columns = [];
      this.hidden_columns = [];
      this.colors = {};

      this.width = width;
      this.height = height;
      this.element = new Rectangle({h: height,
         color: 'rgba(200, 100, 100, 0.3)'
      });
   }

   get offset() {
      return this.element.x;
   }

   set offset(value) {
      this.element.x = value;
   }

   get scale() {
      return this._scale;
   }

   set scale(value) {
      this._scale = value;
      this.update();
   }

   setData({columns, colors}) {
      this.columns = columns;
      this.colors = colors;
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
            });

            children.push(rect);
         }
      };

      this.element.children = children;
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }
}