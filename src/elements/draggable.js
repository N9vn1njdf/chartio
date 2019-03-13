import Element from './element.js'

export default class Draggable extends Element {

   constructor({child, axisX, axisY, onDragging}) {
      super({x: child.x, y: child.y, w: child.w, h: child.h, children: [child]});

      this.w = child.w;
      this.h = child.h;

      this.axisX = axisX || false;
      this.axisY = axisY || false;

      if (onDragging) {
         this.on('dragging', onDragging);
      }
   }

   isHover({x, y}) {
      return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;
   }

   handleDragging(input) {      
      if (!input.down) {
         this._drag = false;
         this._drag_offset = null;
         return;
      }

      if (!this._drag_offset) {
         this._drag_offset = {x: input.x - this._x, y: input.y - this._y};   
      }
      
      if (this.axisY) {
         this.y = input.y - this._drag_offset.y;
      }

      if (this.axisX) {
         this.x = input.x - this._drag_offset.x;
      }

      this.emit('dragging');
   }

   render(ctx, input) {

      if (this.isHover({x: input.x, y: input.y})) {         
         this.move = true;
         this.emit('move', input);

         if(input.down && !input.drag) {
            this._drag = true;
            input.drag = true;
         }

      } else {
         if(this.move) {
            this.move = false;
            this.emit('leave', input);
         }
      }
      
      if(this._drag) {
         this.handleDragging(input);
      }

      super.render(ctx, input);
   }
}