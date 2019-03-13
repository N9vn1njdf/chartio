import { Circle, Rectangle } from 'elements'

export default class Main {

   constructor({height}) {
      this.data = [];
      this.height = height;
      this.element = new Rectangle({h: height, color: 'rgba(200, 100, 100, 0.5)'});
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

      if (this.data) {
         this.update(this.data);
      }
   }

   update(data) {
      var children = [];
      
      for (let index = 0; index <= data.length; index++) {

         let rect = new Circle({
            x: index * this.scale.x,
            y: index % 2 ? 10 : this.height-10,
            r: 10,
            color: 'rgba(0, 0, 0, 0.4)',
         });

         children.push(rect);
      }

      this.element.children = children;
      this.element.w = (this.element.children.length-1)*this.scale.x;
   }
}