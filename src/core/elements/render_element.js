import Event from '../event'

export default class RenderElement extends Event {
   constructor({x, y}) {
      super()

      this.x = this._globalX = x || 0
      this.y = this._globalY = y || 0
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

   get x2() {
      return this._x2
   }

   set x2(value) {
      this._x2 = value
      this.updateParent()
   }

   get y2() {
      return this._y2
   }

   set y2(value) {      
      this._y2 = value
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
      if (this.parent && !this.parent.$is_component) {
         this.parent.updateChild()
      }
   }

   /**
    * Обновить координаты дочерних элементов, относительно родительского
    */
   updateChild() {}

   /**
    * Виден ли элемент. Если функция вернет false, объект не будет отрисовываться.
    * Используется фреймворком, в целях оптимизации
    * 
    * @param {number} canvas_width 
    * @param {number} canvas_height 
    */
   isVisible(canvas_width, canvas_height) {
      return false
   }
}
