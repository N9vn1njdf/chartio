import Input from './input.js'

export default class Scaffold {

   constructor({canvas, width, height, children}) {
      this.canvas = canvas
      this.canvas.width = this.width = width
      this.canvas.height = this.height = height

      this._need_update = {}
      
      this.input = new Input(this)

      this.children = children || []

      this.ctx = this.canvas.getContext('2d')
      this.ctx.textBaseline = 'top'
      this.ctx.width = this.width
      this.ctx.miterLimit = 1

      requestAnimationFrame((time) => this.render(time))
   }

   get needUpdate() {
      for(let i in this._need_update) {
         if (this._need_update[i]) return true
      }
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
      let need_update = this.needUpdate

      if (!need_update) {
         for(let i in this.children) {
            if (this.children[i].needUpdate) {
               need_update = true
               break
            }
         }
      }

      if (need_update) {
         this.ctx.clearRect(0, 0, this.width, this.height)
         this.children.forEach((element) => element.render(this.ctx, this.input, time))
      }

      requestAnimationFrame((time) => this.render(time))
   }
}