import Element from './element.js'

export default class Position extends Element {

   render(ctx, input) {
      ctx.globalAlpha = this.alpha;
      super.render(ctx, input);
   }
}