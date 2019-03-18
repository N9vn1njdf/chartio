import Element from './element.js'

export default class Draggable extends Element {

   constructor({child, axisX, axisY, canDragX, canDragY, onDragging}) {
      super({x: child.x, y: child.y, w: child.w, h: child.h, children: [child]});

      child.x = 0;
      child.y = 0;
      this.child = child;

      this.axisX = axisX || false;
      this.axisY = axisY || false;

      this.canDragX = canDragX;
      this.canDragY = canDragY;

      if (onDragging) {
         this.on('dragging', onDragging);
      }
   }

   get w() {      
      return this.child.w;
   }
   
   set w(value) {      
      return this.child.w = value;
   }

   get h() {
      return this.child.h;
   }

   set h(value) {
      return this.child.h = value;
   }

   get childX() {
      return this.child.x;
   }

   get childY() {
      return this.child.y;
   }

   isHover({x, y}) {
      return x > this.childX && x < this.childX + this.w && y > this.childY && y < this.childY + this.h;
   }

   handleDragging(input) {      
      if (!input.down) {
         this._drag = false;
         this._inputOffset = null;
         return;
      }

      if (!this._inputOffset) {
         this._inputOffset = {x: input.x - this._x, y: input.y - this._y};   
      }

      if (this.axisY) {
         let y = input.y - this._inputOffset.y;
         this.y = this.canDragY({child: this.child, y});
      }

      if (this.axisX) {
         let x = input.x - this._inputOffset.x;
         this.x = this.canDragX({child: this.child, x});
      }

      this.emit('dragging');
   }

   render(ctx, input) {
      super.render(ctx, input);

      if(this._mouse_down) {
         this._drag = true;
      }

      if(this._drag) {
         this.handleDragging(input);
      }
   }
}