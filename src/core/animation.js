
export default class Animation {

   constructor({component, duration, curve, onStart, onEnd, handle}) {
      this.component = component
      this.duration = duration
      this.curve = curve
      this.onStart = onStart
      this.onEnd = onEnd
      this.handle = handle

      this.running = false

      component._animations.push(this)
   }

   /**
    * Запустить анимацию
    * 
    * @param {*} data - доп. данные, которые будут переданы в обработчики
    */
   run(data = null) {      
      this._data = data
      
      if (this.onStart) {
         this.onStart.call(this.component, data)
      }

      this.start_time = performance.now()
      this.running = true
      this.component.$update()
   }

   _step(time) {
      time = (time - this.start_time) / this.duration

      if (time > 1) {
         time = 1
      } else if (time < 0) {
         time = 0
      }

      this.handle.call(this.component, this.curve(time), this._data)

      if (time == 1) {
         this.running = false

         if (this.onEnd) {
            this.onEnd.call(this.component)
         }
      }

      this.component.$update()
   }
}