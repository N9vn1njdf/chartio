import { HasChildren } from 'core/elements';

export default class Position extends HasChildren {

   constructor({w, h, alpha} = {}) {
      super(arguments[0] || {})

      this.w = w || 0
      this.h = h || 0
      this.alpha = alpha
   }

   /**
    * @override
    */
   isVisible(canvas_width, canvas_height) {
      return this.alpha !== 0
   }
}