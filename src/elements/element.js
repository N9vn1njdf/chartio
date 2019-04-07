import { Event } from 'core'

export default class Element extends Event {

   constructor({x, y, color, alpha, children, inputIgnore} = {}) {
      super();
      
      this.x = x || 0;
      this.y = y || 0;
      this.color = color || 'transparent';
      this.alpha = alpha != null ? alpha : 1;
      this.children = children || [];
      this.inputIgnore = inputIgnore || false;

      this._mouse_down = false;
   }

   get children() {
      return this._children;
   }

   set children(value) {
      for (let i in value) {
         value[i].parent = this;
      }
      this._children = value;
   }

   get x() {
      if (this.parent != null) {
         return this._x + this.parent.x;
      }
      return this._x;
   }

   set x(value) {
      this._x = value;
   }

   get y() {
      if (this.parent != null) {
         return this._y + this.parent.y;
      }
      return this._y;
   }

   set y(value) {
      this._y = value;
   }

   get alpha() {
      let result = this._alpha;

      if (this.parent != null && this.parent.alpha != null) {
         result = this._alpha * this.parent.alpha;
      }

      return result < 0 ? 0 : result;
   }

   set alpha(value) {
      return this._alpha = value;
   }

   get needUpdate() {
      for(let i in this._children) {
         if (this._children[i].needUpdate) {
            return true;
         }
      }
      return false
   }
   
   isHover({x, y}) {
      return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
   }

   isVisible(width) {
      if (this.w == 0 || this.h == 0) {
         return false;
      }

      if (this.alpha == 0 || !this.color || this.color == 'transparent') {
         return false;
      }

      return this.x + this.w > 0 && this.x < width;
   }
   
   onDown(input) {
      if (this.isHover(input) && !input.event_down) {
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

   render(renderer, input, time) {
      this._children.forEach((child) => child.render(renderer, input, time));
      
      if (this.isHover(input)) {
         if(!input.el && this.color != 'transparent' && !this.inputIgnore) {
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