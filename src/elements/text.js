import Element from './element.js'

export default class Text extends Element {

   constructor({text, size}) {
      super(arguments[0]);
      
      this.text = text;
      this.size = size || 14;
   }

   get w() {
      return this.size * this.text.length;
   }

   set w(value) {
      this.size = value / this.text.length;
   }

   get h() {
      return this.size;
   }

   set h(value) {
      this.size = value;
   }

   isHover({x, y}) {
      return x < this.x + this.r && x > this.x - this.r && y < this.y + this.r && y > this.y - this.r;
   }

   render(ctx, input) {
      ctx.globalAlpha = this.alpha;

      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);

      ctx.font = "30px Arial";
      ctx.fillText("Hello World", this.x, this.y);

      super.render(ctx, input);
   }
}