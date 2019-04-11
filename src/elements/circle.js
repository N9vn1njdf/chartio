import { RenderElement } from 'core/elements'

export default class Circle extends RenderElement {

   constructor({r, border}) {
      super(arguments[0]);
      
      this.r = r;
      this.border = border;
   }

   /**
    * @override
    */
   isVisible(width) {
      if (this.r == 0 || this.alpha == 0 || !this.color || this.color == 'transparent') {
         return false;
      }
      return this.x + this.r/2 > 0 && this.x - this.r/2 < width;
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
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

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fill();
      
      if (this.border) {
         // ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
         if (ctx.strokeStyle !== this.border.color) {
            ctx.strokeStyle = this.border.color;
         }
   
         if (ctx.lineWidth !== this.border.w) {
            ctx.lineWidth = this.border.w;
         }
         ctx.stroke();
      }
   }
}