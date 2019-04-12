import { HasChildren } from 'core/elements';

export default class Position extends HasChildren {

   constructor({x, y, w, h, children} = {}) {
      super({x, y, children})
      
      this.w = w || 0
      this.h = h || 0
   }

   /**
    * @override
    */
   isVisible(canvas_width, canvas_height) {      
      return true
   }
}