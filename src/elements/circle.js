import Element from './element.js'

export default class Circle extends Element {

   constructor({r} = {}) {
      super(arguments[0]);
      
      this.r = r;
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
      return x < this.x + this.r && x > this.x - this.r && y < this.y + this.r && y > this.y - this.r;
   }

   render(ctx, input, time) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();

      super.render(ctx, input, time);
   }
}