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

   updateParentX(value) {
      if (this.parent) {
         this.parent.updateChildX()
      } else {
         this.globalX = value
      }
   }

   updateParentY(value) {
      if (this.parent) {
         this.parent.updateChildY()
      } else {
         this.globalY = value
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
      this.updateChildX()
   }

   get globalY() {
      return this._globalY
   }

   set globalY(value) {
      this._globalY = value
      this.updateChildY()
   }

   updateChildX() {
      if (this.child) {
         this._child.globalX = this._child.x + this.globalX
      }
   }

   updateChildY() {
      if (this.child) {
         this._child.globalY = this._child.y + this.globalY
      }
   }

   updateChild() {
      if (this.child) {
         this._child.globalX = this._child.x + this.globalX
         this._child.globalY = this._child.y + this.globalY
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

   render(ctx, input, time) {
      if (this._child) {
         this._child.render(ctx, input, time)
      }
   }
}