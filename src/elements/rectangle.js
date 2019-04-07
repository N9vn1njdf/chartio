import Element from './element.js'

export default class Rectangle extends Element {

   constructor({w, h, clip, border}) {
      super(arguments[0])
      
      this.w = w
      this.h = h
      this.clip = clip || false
      this.border = border
   }

   fillRoundedRect(ctx, xx, yy, ww, hh, rad, fill, stroke) {
      ctx.beginPath()
      ctx.moveTo(xx, yy)
      ctx.arcTo(xx + ww, yy, xx + ww, yy + hh, rad.tr)
      ctx.arcTo(xx + ww, yy + hh, xx, yy + hh, rad.br)
      ctx.arcTo(xx, yy + hh, xx, yy, rad.bl)
      ctx.arcTo(xx, yy, xx + ww, yy, rad.tl)

      if (stroke) ctx.stroke()
      if (fill || typeof(fill) === "undefined") ctx.fill()
   }

   render(ctx, input, time) {
      if (!this.isVisible(ctx.width) && !this.clip) {
         super.render(ctx, input, time)
         return
      }

      if(this.clip) {
         // ctx.save()
         // ctx.rect(this.x, this.y, this.w, this.h)
         // ctx.clip()
      }

      if (ctx.globalAlpha !== this.alpha) {
         ctx.globalAlpha = this.alpha
      }

      if (ctx.fillStyle !== this.color) {
         ctx.fillStyle = this.color
      }

      if (this.border) {
         this.fillRoundedRect(ctx, this.globalX, this.globalY, this.w, this.h, this.border)
      } else {
         ctx.fillRect(this.globalX, this.globalY, this.w, this.h)
      }

      super.render(ctx, input, time)

      if(this.clip) {
         // ctx.restore()
      }
   }
}