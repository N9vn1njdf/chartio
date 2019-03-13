import { Event } from 'core'

export default class Element extends Event {

   constructor({x, y, color, draggable, children}) {
      super();

      this.x = x || 0;
      this.y = y || 0;
      this.color = color || 'rgba(0, 255, 0, 0)';
      this.draggable = draggable || null;
      this.children = children || [];
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
   
   render(ctx, input) {
      for(let i in this.children) {
         this.children[i].render(ctx, input);
      }
   }
}