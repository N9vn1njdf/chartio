import Event from './event.js'
import Scaffold from './scaffold.js'

export default class Component extends Event {
   
   constructor() {
      super()

      this.$scaffold
      this.$is_component = true
   }

   /**
    * Нужно ли перерисовать компонент
    */
   get $need_update() {
      return false
   }

   /**
    * Используется для ручного обновления холста
    */
   $update() {
      this.$scaffold.setNeedUpdate('component', true)
   }

   /**
    * @param {Object} theme
    */
   $onTheme(theme) {}

   /**
    * @param {object} locale
    */
   $onLocale(locale) {}

   /**
    * @param {object} data
    */
   $onData(data) {}

   /**
    * @param {number} index
    */
   $showColumn(index) {
      this.$scaffold.show_column_observer.broadcast(index)
   }

   /**
    * @param {number} index
    */
   $onShowColumn(index) {}

   /**
    * @param {number} index
    */
   $hideColumn(index) {
      this.$scaffold.hide_column_observer.broadcast(index)
   }
   
   /**
    * @param {number} index
    */
   $onHideColumn(index) {}

   get $element() {
      if (!this._$element && this.$build) {
         this._$element = this.$build(Scaffold.theme, Scaffold.$locale)
         this.child = this._$element
         this.y = this._$element.y
         this.x = this._$element.x
      }

      return this._$element
   }

   set parent(parent) {
      if (this.$element) {
         this.$element.parent = parent

         if (parent.$element) {
            this.$element.globalY = parent.$element.globalY
            this.$element.globalX = parent.$element.globalX
         }
      }
   }

   get globalX() {
      return this.$element ? this.$element._globalX : null
   }

   set globalX(value) {
      this.$element._globalX = value
      this.$element.updateChild()
   }

   get globalY() {
      return this.$element ? this.$element._globalY : null
   }

   set globalY(value) {
      this.$element._globalY = value
      this.$element.updateChild()
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке компонента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      if (this._$element) {
         this._$element.render(ctx, input, time)
      }
   }
}