import Children from "./children";

export default class Position extends Children {

   constructor({x, y, w, h, children} = {}) {
      super({x, y, children})
      
      // this.w = w || 0
      // this.h = h || 0
   }
}