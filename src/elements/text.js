import Element from './element.js'

export default class Text extends Element {

   constructor({text, size, fontFamily, align}) {
      arguments[0].color = arguments[0].color || 'rgb(0, 0, 0)';

      super(arguments[0]);
      
      this.text = text;
      this.size = size || 14;
      this.fontFamily = fontFamily || 'Arial';
      this.align = align || 'left';
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
      ctx.font = `${this.size}px ${this.fontFamily}`;
      ctx.textBaseline = 'top';
      ctx.textAlign = this.align; 
      ctx.fillText(this.text, this.x, this.y);

      super.render(ctx, input);
   }
}