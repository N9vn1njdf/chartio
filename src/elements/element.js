import { Event } from 'core'

export default class Element extends Event {

   constructor({x, y, color, children, cursor, inputIgnore}) {
      super();
      
      this.x = x || 0;
      this.y = y || 0;
      this.color = color || 'rgba(0, 0, 0, 0)';
      this.children = children || [];
      this.cursor = cursor || 'default';
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
      return this._children = value;
   }

   get x() {
      if (this.parent != null) {
         return this._x + this.parent.x;
      }
      return this._x;
   }

   set x(value) {
      return this._x = value;
   }

   get y() {
      if (this.parent != null) {
         return this._y + this.parent.y;
      }
      return this._y;
   }

   set y(value) {
      return this._y = value;
   }
   
   isHover({x, y}) {
      return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
   }
   
   render(ctx, input) {
      for(let i in this.children) {
         this.children[i].render(ctx, input);
      }

      if (this.isHover(input)) {

         if(!input.el && this.color != 'rgba(0, 0, 0, 0)' && !this.inputIgnore) {
            input.el = this;
         }

         this._move = true;
         this.emit('move', input);

         if (input.down && !input.event_down) {
            this._mouse_down = true;
            this.emit('down', input);

         } else if (this._mouse_down) {
            this._mouse_down = false;
            this.emit('up', input);
         }

      } else if(this._move) {
         this._move = false;
         this.emit('leave', input);
      }
   }
}