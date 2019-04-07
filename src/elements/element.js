import Child from './child';

export default class Element extends Child {

   constructor({x, y, child, color, alpha, inputIgnore} = {}) {
      super({x, y, child})

      this.color = color
      this.alpha = alpha != null ? alpha : 1
      this.inputIgnore = inputIgnore || false
   }

   // get alpha() {
   //    let result = this._alpha;

   //    if (this.parent != null && this.parent.alpha != null) {
   //       result = this.parent.alpha - this._alpha;
   //    }

   //    return result < 0 ? 0 : result;
   // }

   // set alpha(value) {
   //    return this._alpha = value;
   // }

   get needUpdate() {
      for(let i in this._children) {
         if (this._children[i].needUpdate) {
            return true;
         }
      }
      return false
   }
   
   isHover({x, y}) {
      return x > this.globalX && x < this.globalX + this.w && y > this.globalY && y < this.globalY + this.h;
   }

   isVisible(width) {
      if (this.w == 0 || this.h == 0 || this.alpha == 0 || !this.color) {
         return false;
      }
      return this.globalX + this.w > 0 && this.globalX < width;
   }
   
   onDown(input) {
      if (!input.event_down && this.isHover(input) && this.color && this.alpha > 0 && !this.inputIgnore) {
         input.event_down = true;
         this._mouse_down = true;
         this.emit('down', input, this);
      }
   }

   onUp(input) {
      if (this._mouse_down) {
         this._mouse_down = false;
         this.emit('up', input, this);          
      }
   }

   render(ctx, input, time) {
      super.render(ctx, input, time)
      
      if (this.isHover(input)) {         
         if(!input.el && !this.inputIgnore) {
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