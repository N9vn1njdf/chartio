import Animation from './animation.js'

export default class FadeY extends Animation {
   
   constructor({offset}) {
      super(arguments[0]);

      this.offset = offset || 20;
   }

   get offset() {
      return this._offset;
   }

   set offset(value) {
      this._offset = value;
      this.start_y = this.child.y;
   }
   
   curve(time_fraction) {
      return Math.pow(time_fraction, 3);
   }

   handle(progress, reverse) {
      let y = progress * this._offset;

      if (reverse) {
         this.child.y = this.start_y + this._offset - y;
         this.child.alpha = progress*progress

      } else {
         this.child.y = this.start_y + y;
         this.child.alpha = 1 - progress/0.9;
      }

      if (this.child.y2) {
         this.child.y2 = this.child.y;
      }
   }
}