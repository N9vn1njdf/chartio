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
      this.child.alpha = progress/100;

      var y = this.offset * progress / 100      
      this.child.y = this.child.y2 = this.start_y + y;

      if (this.child.alpha <= 0) {
         this.child.alpha = 0;
      }
   }
}