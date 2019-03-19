import Animation from './animation.js'

export default class FadeY extends Animation {
   
   constructor({offset, alpha}) {
      super(arguments[0]);

      this.offset = offset || 20;
      this.alpha = alpha || 1;
   }

   get offset() {
      return this._offset;
   }

   set offset(value) {
      this._offset = value;
      this.start_y = this.child.y;
   }
   
   get alpha() {
      return this._alpha;
   }

   set alpha(value) {
      this._alpha = value;
   }  

   curve(time_fraction) {
      return Math.pow(time_fraction, 0.8)
   }

   start() {      
      if (this.reversed) {
         this.start_y = this.start_y + this.offset;
      }
   }

   handle(progress, time_fraction) {
      let y = progress * this.offset;

      if (this.reversed) {
         this.child.y = this.start_y - y;

      } else {
         this.child.y = this.start_y + y;
      }

      if (this.child.y2) {
         this.child.y2 = this.child.y;
      }

      this.child.alpha = time_fraction * this.alpha;
   }
}