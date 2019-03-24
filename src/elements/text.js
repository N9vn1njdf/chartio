import Element from './element.js'

export default class Text extends Element {

   constructor({text, size, fontFamily, align}) {
      super(arguments[0]);
      
      this.text = text+'' || '';
      this.size = size || 14;
      this.fontFamily = fontFamily || 'Arial';
      this.align = align || 'left';

      this.cached = false;
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
      return false;
   }

   isVisible(width) {
      if (this.w == 0 || this.h == 0) {
         return false;
      }

      if (this.alpha == 0 || !this.color || this.color == 'transparent') {
         return false;
      }
      
      return this.x + this.w >= 0 && this.x < width;
   }

   render(ctx, input, time) {
      if (!this.isVisible(ctx.width)) {
         return;
      }

      if (ctx.globalAlpha !== this.alpha) {
         ctx.globalAlpha = this.alpha;
      }

      if (ctx.fillStyle !== this.color) {
         ctx.fillStyle = this.color;
      }

      if (ctx.font !== `${this.size}px ${this.fontFamily}`) {
         ctx.font = `${this.size}px ${this.fontFamily}`;
      }

      if (ctx.textAlign !== this.align) {
         ctx.textAlign = this.align;
      }

      ctx.fillText(this.text, this.x, this.y);
   }
}