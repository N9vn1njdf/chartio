import HasChild from "./has_child";

export default class MouseElement extends HasChild {

   constructor({x, y, child, color, alpha, ignoreInput} = {}) {
      super({x, y, child})

      this.color = color
      this.alpha = alpha != null ? alpha : 1
      this.ignoreInput = ignoreInput || false
   }

   isHover(x, y) {
      return x > this.globalX && x < this.globalX + this.w && y > this.globalY && y < this.globalY + this.h;
   }
   
   onDown(input) {
      if (this.color == '#c0d1e1') {
         console.log(!input.event_down , this.isHover(input.x+140, input.y));
      }
      if (!input.event_down && this.isHover(input.x-20, input.y) && this.color && this.alpha > 0 && !this.ignoreInput) {
         if (this.color == '#c0d1e1') {
            console.log('122121');
         }
         input.event_down = true;
         this._mouse_down = true;
         this.emit('down', input, this);
      }
   }

   onUp(input) {
      this._move = false;
      if (this._mouse_down) {
         this._mouse_down = false;
         this.emit('up', input, this);
      }
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      super.render(ctx, input, time)
      
      if (this.isHover(input.x, input.y)) {
         if(!input.el && !this.ignoreInput) {
            input.el = this;
         }         

         this._move = true;
         this.emit('move', input, this);

         if (!this._has_input_event) {
            this._has_input_event = true;
            input.on('down', (input) => this.onDown(input));
            input.on('up', (input) => this.onUp(input));
         }

      } else if(this._move) {
         this._move = false;
         this.emit('leave', input, this);
      }
   }
}