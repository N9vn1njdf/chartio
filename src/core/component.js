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
    * Вызывает после того как компонент создан. Доступна переменная $scaffold
    */
   $created() {}

   /**
    * Вызывает после инициализации или изменении темы
    * 
    * @param {Object} theme
    */
   $themeUpdated(theme) {}

   get $element() {
      if (!this._$element) {         
         this._$element = this.$build(Scaffold.theme, this.$locale)
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
      return this.$element._globalX
   }

   set globalX(value) {      
      this.$element._globalX = value
      this.$element.updateChild()
   }

   get globalY() {
      return this.$element._globalY
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
      this.$element.render(ctx, input, time)
   }
}