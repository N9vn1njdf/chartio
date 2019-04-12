import { MouseElement } from 'core/elements'

export default class Rectangle extends MouseElement {

   constructor({w, h, clip, border}) {
      super(arguments[0])
      
      this.w = w
      this.h = h
      this.clip = clip || false
      this.border = border
   }

   /**
    * Простая проверка видимости, относительно ширины холста
    * 
    * @override
    */
   isVisible(canvas_width, canvas_height) {
      if (this.w == 0 || this.h == 0 || this.alpha == 0) {         
         return false
      }
      return this.globalX + this.w > 0 && this.globalX < canvas_width
   }

   fillRoundedRect(ctx, xx, yy, ww, hh, rad) {
      ctx.beginPath()
      ctx.moveTo(xx, yy)
      ctx.arcTo(xx + ww, yy, xx + ww, yy + hh, rad.tr)
      ctx.arcTo(xx + ww, yy + hh, xx, yy + hh, rad.br)
      ctx.arcTo(xx, yy + hh, xx, yy, rad.bl)
      ctx.arcTo(xx, yy, xx + ww, yy, rad.tl)
      ctx.fill()
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      if(this.clip) {
         // ctx.save()
         // ctx.rect(this.x, this.y, this.w, this.h)
         // ctx.clip()
      }      

      if (ctx.globalAlpha !== this.alpha) {
         ctx.globalAlpha = this.alpha
      }

      if (this.color) {
         if (ctx.fillStyle !== this.color) {
            ctx.fillStyle = this.color
         }
   
         if (this.border) {
            this.fillRoundedRect(ctx, this.globalX, this.globalY, this.w, this.h, this.border)
         } else {
            ctx.fillRect(this.globalX, this.globalY, this.w, this.h)
         }
      }

      super.render(ctx, input, time)

      if(this.clip) {
         // ctx.restore()
      }
   }
}