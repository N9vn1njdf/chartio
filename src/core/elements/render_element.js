import Event from '../event'

export default class RenderElement extends Event {
   constructor({x, y, alpha}) {
      super()

      this.alpha = alpha != null ? alpha : 1

      this.x = this._globalX = x || 0
      this.y = this._globalY = y || 0
   }

   get x() {
      return this._x
   }

   set x(value) {
      if (this._x != value) {
         this._x = value

         if (this.parent) {
            this._globalX = value + this.parent._globalX
         }
         this.updateChild()
      }
   }

   get y() {
      return this._y
   }

   set y(value) {
      if (this._y != value) {
         this._y = value

         if (this.parent) {
            this._globalY = value + this.parent._globalY
         }
         this.updateChild()
      }
   }

   get x2() {
      return this._x2
   }

   set x2(value) {
      if (this._x2 != value) {
         this._x2 = value

         if (this.parent) {
            this.globalX2 = value + this.parent.globalX
         }
         this.updateChild()
      }
   }

   get y2() {
      return this._y2
   }

   set y2(value) {
      if (this._y2 != value) {
         this._y2 = value

         if (this.parent) {
            this.globalY2 = value + this.parent.globalY
         }
         this.updateChild()
      }
   }

   get globalX() {
      return this._globalX
   }

   set globalX(value) {
      if (this._globalX != value) {
         this._globalX = value
         this.updateChild()
      }
   }

   get globalY() {
      return this._globalY
   }

   set globalY(value) {
      if (this._globalY != value) {
         this._globalY = value
         this.updateChild()
      }
   }

   // updateParent() {
   //    if (this.parent) {
   //       this.parent.updateChild()
   //    }
   // }

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
