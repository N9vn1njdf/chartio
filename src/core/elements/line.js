
// Элемент должен быть помещен в LinesGroup для отрисовки
export default class Line {

   constructor({x, y, x2, y2}) {
      this.x = x
      this.y = y
      this.x2 = x2
      this.y2 = y2      

      this.alpha = 1
   }

   get x() {
      return this._x
   }

   set x(value) {
      this._x = value
      this.updateParentX(value)
   }

   get y() {
      return this._y
   }

   set y(value) {      
      this._y = value
      this.updateParentY(value)
   }
   
   get x2() {
      return this._x2
   }

   set x2(value) {
      this._x2 = value
      this.updateParentX(value)
   }

   get y2() {
      return this._y2
   }

   set y2(value) {      
      this._y2 = value
      this.updateParentY(value)
   }

   // get globalX() {
   //    return this._globalX
   // }

   // set globalX(value) {
   //    this._globalX = value
   //    // this.globalX2 = value + this.x2 - this.x
   // }

   // get globalY() {
   //    return this._globalY
   // }

   // set globalY(value) {
   //    this._globalY = value
   //    // this.globalY2 = value + this.y2 - this.y      
   // }

   updateParentX() {
      if (this.parent) {
         this.parent.updateChild()
      }
   }

   updateParentY() {
      if (this.parent) {
         this.parent.updateChild()
      }
   }

   isVisible(width) {
      return (this.globalX > 0 || this.globalX2 > 0) && this.globalX < width
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
         return
      }

      if (ctx.globalAlpha !== this.alpha) {
         ctx.globalAlpha = this.alpha
      }

      ctx.moveTo(this.globalX, this.globalY)
      ctx.lineTo(this.globalX2, this.globalY2)
   }
}