import Animation from './animation.js'

export default class Visible extends Animation {
   
   constructor({transition}) {
      super(arguments[0]);

      this.transition = transition;
   }

   /**
    * 
    * @param {%} progress 
    */
   handle(progress) {      
      this.child.alpha = progress/100;

      if (this.child.alpha <= 0) {
         this.child.alpha = 0;
         return true;
      }

      return false;
   }
}