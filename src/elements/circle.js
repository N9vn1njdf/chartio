import Element from './element.js'

export default class Circle extends Element {

   constructor({r, border} = {}) {
      super(arguments[0]);
      
      this.r = r;
      this.border = border;
   }

   get w() {
      return this.r;
   }

   set w(value) {
      this.r = value;
   }

   get h() {
      return this.r;
   }

   set h(value) {
      this.r = value;
   }

   isHover({x, y}) {
      if (this.r == 0) {
         return false;
      }
      return x < this.x + this.r && x > this.x - this.r && y < this.y + this.r && y > this.y - this.r;
   }

   render(ctx, input, time) {
      if (this.r > 0 && this.alpha > 0) {
         ctx.globalAlpha = this.alpha;

         ctx.beginPath();
         ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
         
         if (ctx.fillStyle !== this.color) {
            ctx.fillStyle = this.color;
         }

         ctx.fill();
         
         if (this.border) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
            ctx.strokeStyle = this.border.color;
            ctx.lineWidth = this.border.w;
            ctx.stroke();
         }
      }

      super.render(ctx, input, time);
   }
}