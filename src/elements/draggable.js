import Element from './element.js'

export default class Draggable extends Element {

   constructor({child, axisX, axisY, onDragging}) {
      super({x: child.x, y: child.y, w: child.w, h: child.h, children: [child]});

      this.w = child.w;
      this.h = child.h;

      child.x = 0;
      child.y = 0;

      this.axisX = axisX || false;
      this.axisY = axisY || false;

      if (onDragging) {
         this.on('dragging', onDragging);
      }
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
         this.y = input.y - this._inputOffset.y;
      }

      if (this.axisX) {
         this.x = input.x - this._inputOffset.x;
      }

      this.emit('dragging');
   }

   render(ctx, input) {
      super.render(ctx, input);

      if(input.down && !input.drag) {
         this._drag = true;
         input.drag = true;
      }
      
      if(this._drag) {
         this.handleDragging(input);
      }
   }
}