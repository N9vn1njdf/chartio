import Animation from './animation.js'

export default class FadeY extends Animation {
   
   constructor({offset}) {
      super(arguments[0]);

      this.offset = offset || 20;
      this.start_y = this.child.y - this.offset;
   }

   /**
    * 
    * @param {%} progress 
    */
   handle(progress) {      
      var y = this.offset * progress / 100      
      this.child.y = this.child.y2 = this.start_y + y;

      this.child.alpha = progress/100;

      if (this.child.alpha <= 0) {
         this.child.alpha = 0;
      }
   }
}