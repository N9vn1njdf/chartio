import Input from './input.js'
import Observer from './observer.js';

export default class Scaffold {

   static get theme() {
      return this._theme
   }

   static set theme(theme) {
      this._theme = theme
      // this._components.forEach(component => component.$theme(theme))
   }

   constructor({id, width, height, theme, components}) {
      this.id = id

      let canvas = document.createElement('canvas')
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.style.background = theme.background
      document.getElementById(id).appendChild(canvas)

      Scaffold.theme = theme

      this.canvas = canvas
      this.canvas.width = this.width = width/100*120
      this.canvas.height = this.height = height/100*120

      this.ctx = this.canvas.getContext('2d')
      this.ctx.textBaseline = 'top'
      this.ctx.width = this.width
      this.ctx.miterLimit = 1
      
      this.input = new Input(this)

      this.theme_observer = new Observer()
      this.locale_observer = new Observer()
      this.data_observer = new Observer()
      this.show_column_observer = new Observer()
      this.hide_column_observer = new Observer()
   
      this.components = components || []

      this.need_update = false

      requestAnimationFrame((time) => this.render(time))
   }

   setData(data) {
      this.data_observer.broadcast(data)
      this.update()
   }

   get components() {
      return this._components
   }

   set components(components) {      
      this.buildComponents(components)
      this._components = components
   }

   buildComponents(children) {
      children.forEach(child => {

         if (child.$is_component) {
            this.initComponent(child)
            child = child.$element ? child.$element : child
         }

         if (child.children) {
            this.buildComponents(child.children)
         } else if (child.child) {
            this.buildComponents([child.child])
         }
      })
   }

   initComponent(component) {
      component.$scaffold = this
      component.$canvas = this.canvas

      this.theme_observer.subscribe((e) => component.$onTheme(e))
      this.locale_observer.subscribe((e) => component.$onLocale(e))
      this.data_observer.subscribe((e) => component._onData(e))
      this.show_column_observer.subscribe((e) => component._onShowColumn(e))
      this.hide_column_observer.subscribe((e) => component._onHideColumn(e))
   }

   update() {
      this.need_update = true
   }

   render(time) {
      if (this.need_update) {
         this.need_update = false
         this.ctx.clearRect(0, 0, this.width, this.height)
         this.components.forEach(component => component.render(this.ctx, this.input, time))
      }

      requestAnimationFrame((time) => this.render(time))
   }
}