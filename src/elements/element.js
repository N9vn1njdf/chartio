import Mouse from '../core/mouse.js'

export default class Element {

   constructor({x, y, color, draggable, children}) {
      this.events = {};
      this.children = children || [];

      this.x = x || 0;
      this.y = y || 0;
      this.color = color || 'rgba(0, 255, 0, 0)';
      this.draggable = draggable || null;
   }

   $on(type, callback) {
      if (!this.events[type]) {
         this.events[type] = [];
      }
      this.events[type].push(callback);

      return this;
   }

   $emit(type, data) {
      for(let i in this.events[type]) {
         this.events[type][i](data);
      }
   }

   _handleDragging() {      
      if (!Mouse.down) {
         this._drag = false;
         this._drag_offset = null;
         return;
      }

      if (!this._drag_offset) {
         this._drag_offset = {x: Mouse.x - this._x, y: Mouse.y - this._y};   
      }
      
      if (this.draggable.y) {
         this.y = Mouse.y - this._drag_offset.y;
      }

      if (this.draggable.x) {
         this.x = Mouse.x - this._drag_offset.x;
      }

      this.$emit('dragging', Mouse);
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
   
   render(ctx) {

      if (this.isHover(Mouse)) {
         this.move = true;
         this.$emit('move', Mouse);

         if(this.draggable && Mouse.down) {
            this._drag = true;
         }

      } else {
         if(this.move) {
            this.move = false;
            this.$emit('leave', Mouse);
         }
      }
      
      // Обработка перетаскиваний
      if(this._drag) {
         this._handleDragging();
      }

      // Рендер дочерних объектов      
      for(let i in this.children) {
         this.children[i].render(ctx);
      }
   }
}