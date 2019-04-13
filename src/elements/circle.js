import { RenderElement } from 'core/elements'

export default class Circle extends RenderElement {

   constructor({r, color, border}) {
      super(arguments[0])
      
      this.r = r
      this.color = color
      this.border = border

      this._endAngle = 2*Math.PI
   }

   /**
    * @override
    */
   isVisible(canvas_width, canvas_height) {      
      if (this.r == 0 || this.alpha == 0 || !this.color || this.color == 'transparent') {
         return false
      }
      return this.globalX + this.r/2 > 0 && this.globalX - this.r/2 < canvas_width
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

      if (ctx.fillStyle !== this.color) {
         ctx.fillStyle = this.color
      }
      
      ctx.beginPath()
      ctx.arc(this.globalX, this.globalY, this.r, 0, this._endAngle)
      ctx.fill()
      
      if (this.border) {
         if (ctx.strokeStyle !== this.border.color) {
            ctx.strokeStyle = this.border.color
         }
   
         if (ctx.lineWidth !== this.border.w) {
            ctx.lineWidth = this.border.w
         }
         ctx.stroke()
      }
   }
}