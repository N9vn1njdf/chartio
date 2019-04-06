import Element from './element.js'

export default class Rectangle extends Element {

   constructor({w, h, clip} = {}) {
      super(arguments[0]);
      
      this.w = w;
      this.h = h;
      this.clip = clip || false;
   }

   render(ctx, input, time) {
      if (!this.isVisible(ctx.width) && !this.clip) {
         super.render(ctx, input, time);
         return;
      }

      if(this.clip) {
         // ctx.save();
         // ctx.rect(this.x, this.y, this.w, this.h);
         // ctx.clip();
      }

      if (this.alpha > 0) {
         if (ctx.globalAlpha !== this.alpha) {
            ctx.globalAlpha = this.alpha;
         }

         if (ctx.fillStyle !== this.color) {
            ctx.fillStyle = this.color;
         }

         ctx.fillRect(this.x, this.y, this.w, this.h);
      }

      super.render(ctx, input, time);

      if(this.clip) {
         // ctx.restore();
      }
   }
}