import Animation from './animation.js'

export default class Fade extends Animation {
   
   constructor({}) {
      super(arguments[0]);
   }

   start() {}

   handle(progress, time_fraction) {      
      this.child.alpha = this.reversed ? progress : 1-progress;
   }
}