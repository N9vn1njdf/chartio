import Rectangle from './rectangle.js'
import { HasChildren } from 'core/elements'

export default class DragScaling extends HasChildren {

   constructor({x, y, w, h, axisX, minWidth, onUpdate, edgeColor, edgeWidth}) {
      super({x, y})

      this.w = w
      this.h = h
      this.axisX = axisX
      this.minWidth = minWidth || 10  // минимальная ширина
      this.onUpdate = onUpdate
      this.edgeColor = edgeColor || 'rgba(0, 0, 0, 0.2)'
      this.edgeWidth = edgeWidth || 5
   }

   get edgeColor() {
      return this._edgeColor
   }

   set edgeColor(value) {
      this._edgeColor = value
      this._updateChildren()
   }

   get edgeWidth() {
      return this._edgeWidth
   }

   set edgeWidth(value) {
      this._edgeWidth = (value) >> 0
      this._updateChildren()
   }

   _updateChildren() {
      this.left = new Rectangle({
         x: -this.edgeWidth,
         w: this.edgeWidth,
         h: this.h,
         color: this.edgeColor,
         border: {tr: 0, tl: 8, br: 0, bl: 8},
         child: new Rectangle({
            x: this.edgeWidth/2 - 1.5,
            y: this.h/2 - 6,
            w: 3,
            h: 12,
            color: '#fff'
         })
      })
      this.left.on('down', () => this.left._scaling = true)
      this.left.on('up', () => this._stop())
      
      this.right = new Rectangle({
         x: this.w,
         w: this.edgeWidth,
         h: this.h,
         color: this.edgeColor,
         border: {tr: 8, tl: 0, br: 8, bl: 0},
         child: new Rectangle({
            x: this.edgeWidth/2 - 1.5,
            y: this.h/2 - 7,
            w: 3,
            h: 14,
            color: '#fff'
         })
      })
      this.right.on('down', () => this.right._scaling = true)
      this.right.on('up', () => this._stop())


      this.center = new Rectangle({
         x: 0,
         w: this.w,
         h: this.h,
         color: 'transparent',
      })
      this.center.on('down', () => this._dragging = true)
      this.center.on('up', () => this._stop())

      this.children = [this.left, this.center, this.right]
   }

   _stop() {
      this._dragging = false
      this.left._scaling = false
      this.right._scaling = false
      this._inputOffset = null
   }

   _scaleLeft(input) {      
      if (!this._inputOffset) {
         this._inputOffset = {x: input.x - this.x, w: this.w + this.x}
      }

      let newX = input.x - this._inputOffset.x

      if (newX - this.edgeWidth < this.axisX.min) {
         newX = this.axisX.min + this.edgeWidth
      }

      if (this._inputOffset.w - newX < this.minWidth) {
         newX = newX - (this.minWidth - (this._inputOffset.w - newX))
      }
      
      this.w = this.right.x = this._inputOffset.w - newX
      this.x = newX
   }
   
   _scaleRight(input) {
      if (!this._inputOffset) {
         this._inputOffset = {x: input.x - this.w, w: this.w + this._x}
      }
      
      let newW = input.x - this._inputOffset.x

      if (this.x + newW + this.edgeWidth >= this.axisX.max) {
         newW = this.axisX.max - this.x - this.edgeWidth
      }

      if (newW < this.minWidth) {         
         newW = this.minWidth
      }

      this.w = this.right.x = newW
   }

   _drag(input) {
      if (!this._inputOffset) {
         this._inputOffset = {x: input.x - this.x, w: this.w + this.x}
      }

      let newX = input.x - this._inputOffset.x

      if (newX - this.edgeWidth < this.axisX.min) {
         newX = this.axisX.min + this.edgeWidth
      }
      
      if (newX + this.w + this.edgeWidth > this.axisX.max) {
         newX = this.axisX.max - this.w - this.edgeWidth
      }
      
      this.x = newX
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      super.render(ctx, input, time)

      if (this._dragging) {
         this._drag(input)
      }

      if (this.left._scaling) {
         this._scaleLeft(input)
         this.center.w = this.w
      }

      if (this.right._scaling) {
         this._scaleRight(input)
         this.center.w = this.w
      }

      if (this.left._scaling || this.right._scaling || this._dragging) {
         this.onUpdate()
      }
   }
}