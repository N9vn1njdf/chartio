import { Circle, Position, Text, Rectangle } from 'elements'
import { Visible } from 'animations'

export default class MainDates {

   constructor({}) {
      this.data = [];

      this.element = new Position();
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
      if (this.element.children.length > 0) {
         this.animate();
         return;
      }

      var children = [];
      
      for (let i = 0; i <= this.data.length; i++) {
         let rect = new Rectangle({
            x: (i * this.scale.x) - 40,
            w: 80,
            h: 8,
            color: 'rgb(0,0,0)',
         });

         let child = new Visible({child: rect, duration: 290});

         children.push(child);
      }

      this.element.children = children;
   }

   animate() {
      for(let i in this.element.children) {
         this.element.children[i].child.x = (i * this.scale.x) - 40;
         
         if (i%2) {            
            !this.element.children[i].completed ? this.element.children[i].run() : this.element.children[i].reverse();
         }

         // // Анимируем появление скрытие
         // if (this.scale.x < 90) {
         //    if (i%2) {            
         //       this.element.children[i].run();
         //    }
         // } else {
         //    if (i%2) {            
         //       this.element.children[i].reverse();
         //    }
         // }
      }
   }
}