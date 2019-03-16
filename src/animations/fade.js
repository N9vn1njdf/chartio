import Animation from './animation.js'

export default class Fade extends Animation {
   
   constructor({}) {
      super(arguments[0]);
   }

   /**
    * 
    * @param {%} progress 
    */
   handle(progress) {      
      this.child.alpha = progress/100;

      if (this.child.alpha <= 0) {
         this.child.alpha = 0;
      }
   }
}