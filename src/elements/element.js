import { Event } from 'core'

export default class Element extends Event {

   constructor({x, y, color, children}) {
      super();

      this.x = x || 0;
      this.y = y || 0;
      this.color = color || 'rgba(0, 255, 0, 0)';
      this.children = children || [];

      this._mouse_down = false;
   }

   get children() {
      return this._children;
   }

   set children(s) {
      for (let i in s) {
         s[i].parent = this;
      }
      return this._children = s;
   }

   get x() {
      if (this.parent != null) {
         return this._x + this.parent.x;
      }
      return this._x;
   }

   set x(s) {
      return this._x = s;
   }

   get y() {
      if (this.parent != null) {
         return this._y + this.parent.y;
      }
      return this._y;
   }

   set y(s) {
      return this._y = s;
   }
   
   isHover({x, y}) {      
      return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
   }
   
   render(ctx, input) {
      if (this.isHover({x: input.x, y: input.y})) {         
         this.move = true;
         this.emit('move', input);

         if (input.down) {
            this._mouse_down = true;
            this.emit('down', input);
         } else if (this._mouse_down) {
            this._mouse_down = false;
            this.emit('up', input);
         }

      } else if(this.move) {
         this.move = false;
         this.emit('leave', input);
      }
      
      for(let i in this.children) {
         this.children[i].render(ctx, input);
      }
   }
}