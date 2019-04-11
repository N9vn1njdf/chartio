import { HasChildren } from 'core/elements';

export default class Position extends HasChildren {

   constructor({x, y, w, h, children} = {}) {
      super({x, y, children})
      
      this.w = w || 0
      this.h = h || 0
   }

   /**
    * Простая проверка видимости, относительно ширины холста
    * 
    * @override
    */
   isVisible(canvas_width, canvas_height) {
      return this.globalX + this.w > 0 && this.globalX < canvas_width
   }
}