import Element from './element.js'

export default class Position extends Element {

   constructor({x, y, children} = {}) {
      super({x, y, children});
   }

   render(ctx, input) {
      super.render(ctx, input);
   }
}