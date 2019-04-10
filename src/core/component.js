import Event from './event.js'
import Scaffold from './scaffold.js'

export default class Component extends Event {
   
   constructor() {
      super()

      this.$is_component = true

      this.$dates_column = []
      this.$columns = []
      this.$colors = []
      this.$names = []

      this.$hidden_columns = []
      this.$visible_columns = []
      this.$canvas
      this.$scaffold

      this._animations = []
   }

   /**
    * Используется для ручного обновления холста
    */
   $update() {
      this.$scaffold.update()
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

   _onHideColumn(index) {
      this.$hidden_columns.push(index)
      this._calcVisibleColumns()
      this.$onHideColumn(index)
   }

   _onShowColumn(index) {
      for (let i = 0; i < this.$hidden_columns.length; i++) {      
         if (index == this.$hidden_columns[i]) {
            this.$hidden_columns.splice(i, 1)
         }
      }
      this._calcVisibleColumns()
      this.$onShowColumn(index)
   }

   _onData({columns, colors, names}) {
      columns = columns.slice()
      this.$dates = columns[0]
      this.$columns = columns.splice(1, columns.length)
      this.$colors = colors
      this.$names = names
      this._calcVisibleColumns()

      this.$onData({dates: this.$dates, columns: this.$columns, colors, names})
   }

   _calcVisibleColumns() {      
      var result = []
      for (let i = 0; i < this.$columns.length; i++) {
         if (!this.$hidden_columns.includes(i)) {            
            result.push(i)
         }
      }
      this.$visible_columns = result
   }

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

      for (let i = 0; i < this._animations.length; i++) {
         if (this._animations[i].running) {
            this._animations[i]._step(time)
         }
      }
   }
}