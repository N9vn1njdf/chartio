import { Circle, Rectangle } from 'elements'

export default class Main {

   constructor({height}) {
      this.data = [];
      this.height = height;
      this.element = new Rectangle({h: height, borderBottom: {color: 'rgba(0, 0, 0, 0.8)', width: 0.5}, color: 'rgba(200, 100, 100, 0.3)'});
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
         this.update();
      }
   }

   update() {
      var children = [];
      
      for (let index = 0; index <= this.data.length; index++) {

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