import Event from './event.js'

class Sub extends Event {
   
   get x() {
      return this._x
   }

   set x(value) {
      this._x = value
      this.updateParent(value)
   }

   get y() {
      return this._y
   }

   set y(value) {
      this._y = value
      this.updateParent(value)
   }

   get globalX() {      
      return this._globalX
   }

   set globalX(value) {
      console.trace(value);

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

   updateParent(value) {
      if (this.parent) {
         console.log(this.parent);
         
         this.parent.updateChild()
      } else {
         this.globalY = value
         this.globalX = value
      }
   }

   updateChild() {
      if (this._child && this._child.$is_mounted) {
         if (this._child.$element) {
            this._child.$element.globalY = this._child.$element.y + this.globalY
            this._child.$element.globalX = this._child.$element.x + this.globalX
         } else {
            this._child.globalY = this._child.y + this.globalY
            this._child.globalX = this._child.x + this.globalX
         }
      }
   }
}

export default class Component extends Sub {
   
   constructor() {
      super()

      this.$scaffold
   }

   /**
    * Нужно ли перерисовать компонент
    */
   get $need_update() {
      return false
   }

   /**
    * Вызывает после того как компонент создан. Доступна переменная $scaffold
    */
   $created() {}

   /**
    * Вызывает после инициализации или изменении темы
    * 
    * @param {Object} theme
    */
   $theme(theme) {}

   get $element() {
      this.$is_mounted = true
      if (!this._$element) {
         console.log(123);
         
         // this.updateParent()
         this._$element = this.$build()
      }
      
      return this._$element
   }

   // set $element(value) {
   //    this._$element = value
   //    this.$is_mounted = true
   //    this.updateParent()
   // }

   /**
    * Функция рендер. Вызывается при каждой отрисовке компонента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      // if (!this.$element) {
      //    this.$element = this.$build()
      // }

      this.$element.render(ctx, input, time)
   }
}