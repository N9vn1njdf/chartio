import Element from './element.js'

export default class Position extends Element {

   constructor({x, y, children} = {}) {      
      super({x, y, children});
   }

   isHover({x, y}) {
      return false;
   }

   render(ctx, input) {
      super.render(ctx, input);
   }
}