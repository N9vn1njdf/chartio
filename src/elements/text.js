import { RenderElement } from 'core/elements'

export default class Text extends RenderElement {

   constructor({text, size, fontFamily, align, color, alpha}) {
      super(arguments[0]);
      
      this.color = color
      this.alpha = alpha != null ? alpha : 1

      this.text = text+'' || '';
      this.size = size || 14;
      this.fontFamily = fontFamily || 'Arial';
      this.align = align || 'left';

      this.cached = false;
   }

   /**
    * @override
    */
   isVisible(width) {      
      if (this.alpha == 0 || this.size == 0 || this.text.length == 0 || !this.color || this.color == 'transparent') {
         return false
      }
      return this.x + this.size * this.text.length >= 0 && this.x < width
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
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
      
      ctx.fillText(this.text, this.globalX, this.globalY);
   }
}