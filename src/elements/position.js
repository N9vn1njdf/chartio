import Element from './element.js'

export default class Position extends Element {

   constructor({w, h} = {}) {
      super(arguments[0]);

      this.w = w || 0;
      this.h = h || 0;
   }

   render(ctx, input, time) {
      ctx.globalAlpha = this.alpha;
      super.render(ctx, input, time);
   }
}