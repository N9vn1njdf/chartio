
export default class Children {

   constructor({x, y, children}) {
      this.x = this._globalX = x || 0
      this.y = this._globalY = y || 0

      this.children = children || []
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
      this.children.forEach(child => child.globalX = child.x + this.globalX)
   }

   updateChildY() {
      this.children.forEach(child => child.globalY = child.y + this.globalY)
   }

   updateChildren() {
      this.children.forEach(child => {
         child.globalX = child.x + this.globalX
         child.globalY = child.y + this.globalY
      })
   }

   get children() {
      return this._children || []
   }

   set children(children) {      
      for (let i in children) {
         children[i].parent = this
      }
      this._children = children
      this.updateChildren()
   }
   
   get needUpdate() {
      for(let i in this.children) {
         if (this.children[i].needUpdate) {
            return true
         }
      }
      return false
   }

   render(ctx, input, time) {
      this._children.forEach(child => child.render(ctx, input, time))
   }
}