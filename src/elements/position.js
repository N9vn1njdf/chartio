import Element from './element.js'

export default class Position extends Element {

   constructor({x, y, children} = {}) {      
      super({x, y, children});
   }

   isHover({x, y}) {
      return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
   }

   render(ctx, input) {
      super.render(ctx, input);
   }
}