import Animation from './animation.js'

export default class Fade extends Animation {
   
   constructor({}) {
      super(arguments[0]);
   }

   /**
    * 
    * @param {%} progress 
    */
   handle(progress, reverse) {
      // console.log(progress.toFixed(2));
      
      this.child.alpha = reverse ? progress : 1-progress;
   }
}