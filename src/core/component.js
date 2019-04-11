import Event from './event.js'
import Scaffold from './scaffold.js'

export default class Component extends Event {
   
   constructor() {
      super()

      this.$is_component = true

      this.$theme
      this.$locale

      this.$dates = []
      this.$columns = []
      this.$colors = []
      this.$names = []

      this.$hidden_columns = []
      this.$visible_columns = []
      this.$canvas
      this.$scaffold

      this._animations = []
      this._mounted = false

      this.x = this._globalX = 0
      this.y = this._globalY = 0
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

   _onTheme(theme) {      
      this.$theme = theme
      this.$onTheme(theme)
   }

   _onLocale(locale) {
      this.$locale = locale
      this.$onLocale(theme)
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

   _init(scaffold) {      
      this.$scaffold = scaffold
      this.$canvas = scaffold.canvas
      
      if (this.$build) {
         this.$element = this.$build(scaffold.theme, scaffold.locale)

         if (this.$element) {
            this.$element.parent = this
            this.child = this.$element
         }
      }
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
      if (child) {
         child.parent = this
         this._child = child
         this.updateChild()
      }
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке компонента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {      
      if (this.$element && (this.$element.$is_component || this.$element.isVisible(ctx.width, ctx.height))) {         
         this.$element.render(ctx, input, time)
      }

      for (let i = 0; i < this._animations.length; i++) {
         if (this._animations[i].running) {
            this._animations[i]._step(time)
         }
      }
   }
}