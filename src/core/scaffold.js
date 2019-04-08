import Input from './input.js'

/**
 * 
 * Базовый компонент, с которого начинается рендеринг.
 * Проверяет необходимость обновления, и перерисовывает холст при необходимости
 * 
 */
export default class Scaffold {

   constructor({id, width, height, theme, components}) {
      let canvas = document.createElement('canvas')
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.style.background = theme.background
      document.getElementById(id).appendChild(canvas)

      this._theme = theme

      this.canvas = canvas
      this.canvas.width = this.width = width/100*120
      this.canvas.height = this.height = height/100*120

      this.ctx = this.canvas.getContext('2d')
      this.ctx.textBaseline = 'top'
      this.ctx.width = this.width
      this.ctx.miterLimit = 1
      
      this.input = new Input(this)
      this.components = components || []

      this._need_update = {}

      requestAnimationFrame((time) => this.render(time))
   }

   get theme() {
      return this._theme
   }

   set theme(theme) {
      this._theme = theme
      this._components.forEach(component => component.$theme(theme))
   }

   get components() {
      return this._components
   }

   set components(components) {
      components.forEach(component => {
         component.$scaffold = this         
         component.$created(this.theme)
      })
      this._components = components
   }

   get needUpdate() {
      for(let i in this._need_update) {
         if (this._need_update[i]) {
            return true
         }
      }

      for(let i in this.components) {
         if (this.components[i].$need_update) {
            return true
         }
      }

      return false
   }

   setNeedUpdate(key, value, delay = null) {
      if (this._need_update[key] !== value) {
         this._need_update[key] = value
         if (delay) {
            setTimeout(() => this._need_update[key] = !value, delay)
         }
      }
   }

   render(time) {
      if (this.needUpdate) {
         this.ctx.clearRect(0, 0, this.width, this.height)
         this.components.forEach(component => component.render(this.ctx, this.input, time))
      }

      requestAnimationFrame((time) => this.render(time))
   }
}