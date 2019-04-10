
export default class Children {

   constructor({x, y, children}) {
      this.x = this._globalX = x || 0
      this.y = this._globalY = y || 0

      this.children = children || []
   }

   get x() {
      return this._x
   }

   set x(value) {
      this._x = value
      this.updateParent()
   }

   get y() {
      return this._y
   }

   set y(value) {
      this._y = value
      this.updateParent()
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

   updateParent() {
      if (this.parent) {
         this.parent.updateChild()
      }
   }

   updateChild() {
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
      this.updateChild()
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      this._children.forEach(child => child.render(ctx, input, time))
   }
}