import { Event } from 'core'

export default class Child extends Event {

   constructor({x, y, child}) {
      super()

      this.x = this._globalX = x || 0
      this.y = this._globalY = y || 0

      if (child) {         
         this.child = child
      }
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

   get globalX() {
      return this._globalX
   }

   set globalX(value) {
      this._globalX = value
      this.updateChild()
   }

   get globalY() {
      return this._globalY
   }

   set globalY(value) {
      this._globalY = value
      this.updateChild()
   }

   updateParentX(value) {
      if (this.parent) {
         this.parent.updateChild()
      } else {
         this.globalX = value
      }
   }

   updateParentY(value) {
      if (this.parent) {
         this.parent.updateChild()
      } else {
         this.globalY = value
      }
   }

   updateChild() {      
      if (this.child) {         
         this.child.globalY = this.child.y + this.globalY
         this.child.globalX = this.child.x + this.globalX
      }
   }

   get child() {
      return this._child
   }

   set child(child) {
      child.parent = this
      this._child = child      
      this.updateChild()
   }
   
   get needUpdate() {
      return this.child.needUpdate
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      if (this._child) {
         this._child.render(ctx, input, time)
      }
   }
}