import { RenderElement } from 'core/elements';

export default class HorizontalLine extends RenderElement {

   constructor({w, lineWidth, color, lineCap}) {
      super(arguments[0])

      this.w = w
      this.lineWidth = lineWidth
      this.color = color
      this.lineCap = lineCap || 'butt'
   }

   /**
    * @override
    */
   isVisible(canvas_width, canvas_height) {
      return (this.globalX > 0 || this.globalX2 > 0) && this.globalX < canvas_width
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
         ctx.globalAlpha = this.alpha
      }

      if (ctx.lineCap != this.lineCap) {
         ctx.lineCap = this.lineCap
      }

      if (ctx.strokeStyle !== this.color) {
         ctx.strokeStyle = this.color
      }

      if (ctx.lineWidth !== this.lineWidth) {
         ctx.lineWidth = this.lineWidth
      }

      ctx.beginPath()

      ctx.moveTo(this.globalX, this.globalY)
      ctx.lineTo(this.globalX + this.w, this.globalY)

      ctx.closePath()
      ctx.stroke()
   }
}