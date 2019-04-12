import Input from './input.js'
import Observer from './observer.js';

export default class Scaffold {

   constructor({id, width, height, theme, locale, components}) {
      this.id = id

      let canvas = document.createElement('canvas')
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.style.background = theme.background
      document.getElementById(id).appendChild(canvas)

      this.theme = theme
      this.locale = locale
      
      this.canvas = canvas
      this.canvas.width = this.width = width/100*120
      this.canvas.height = this.height = height/100*120

      this.ctx = this.canvas.getContext('2d')
      this.ctx.textBaseline = 'top'
      this.ctx.width = this.width
      this.ctx.height = this.height
      this.ctx.miterLimit = 1
      
      this.input = new Input(this)

      this.show_column_observer = new Observer()
      this.hide_column_observer = new Observer()
   
      this.components = components || []

      this.need_update = false

      requestAnimationFrame((time) => this._render(time))
   }

   setData(data) {
      this.data = data
      this._eachComponent(component => component._onData(this.data))
      this.update()
   }

   setTheme(theme) {
      this.theme = theme
      this.canvas.style.background = theme.background
      this._eachComponent(component => component._onTheme(this.theme))
   }

   setLocale(locale) {
      this.locale = locale
      this._eachComponent(component => component._onLocale(this.locale))
   }

   get components() {
      return this._components
   }

   set components(components) {      
      this._components = components
      this._eachComponent(this._initComponent)
   }

   // Вызывает callback для каждого компонента
   _eachComponent(callback) {
      this._findComponentInChildren(this.components, callback)
   }

   // Рекурсивный поиск компонентов
   _findComponentInChildren(children, callback) {      
      children.forEach(child => {
         if (child.$is_component) {
            callback.call(this, child)
            child = child.$element ? child.$element : child
         }

         if (child.children) {
            this._findComponentInChildren(child.children, callback)
         } else if (child.child) {
            this._findComponentInChildren([child.child], callback)
         }
      })
   }

   _initComponent(component) {
      component._init(this)
      this.show_column_observer.subscribe((e) => component._onShowColumn(e))
      this.hide_column_observer.subscribe((e) => component._onHideColumn(e))
   }

   update() {
      this.need_update = true
   }

   _render(time) {
      if (this.need_update) {
         this.need_update = false
         this.ctx.clearRect(0, 0, this.width, this.height)
         this.components.forEach(component => component.render(this.ctx, this.input, time))
      }

      requestAnimationFrame((time) => this._render(time))
   }
}