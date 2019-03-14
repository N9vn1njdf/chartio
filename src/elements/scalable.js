import Element from './element.js'
import Rectangle from './rectangle.js'

// Note: масштабирование по оси Y не реализовано

export default class Scalable extends Element {

   constructor({child, axisX, axisY, onScaling} = {}) {
      super({x: child.x, y: child.y, w: child.w, h: child.h});

      child.x = 0;
      child.y = 0;
      this.child = child;

      this.axisX = axisX || false;
      this.axisY = axisY || false;

      if (onScaling) {
         this.on('scaling', onScaling);
      }

      this.children = this._getChildren();
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

   _getChildren() {
      
      this.left = new Rectangle({x: -6, w: 6, h: this.h, cursor: 'col-resize', color: 'rgba(0, 0, 0, 0.12)'});
      this.left.on('down', (input) => this.left._scaling = true);

      this.right = new Rectangle({x: this.w, w: 6, h: this.h, cursor: 'col-resize', color: 'rgba(0, 0, 0, 0.12)'});
      this.right.on('down', (input) => this.right._scaling = true);

      var edgesX = this.axisX ? [this.left, this.right] : [];

      // Тут ось Y...
      var edgesY = this.axisY ? [] : [];
      // ~~~~~~~~~~~~

      return [...edgesX, ...edgesY, this.child];
   }

   _slaleLeftX(input) {
      if (!input.down) {
         this.left._scaling = false;
         this.left._inputOffset = null;
         return;
      }

      if (!this.left._inputOffset) {
         this.left._inputOffset = {x: input.x - this._x, y: input.y - this._y, w: this.w + this._x};
      }

      let newX = input.x - this.left._inputOffset.x;
      
      this.w = this.left._inputOffset.w - newX;
      this.right.x = this.w;
      
      this.x = newX;

      this.emit('scaling');
   }
   
   _slaleRightX(input) {
      if (!input.down) {
         this.right._scaling = false;
         this.right._inputOffset = null;
         return;
      }

      if (!this.right._inputOffset) {
         this.right._inputOffset = {x: input.x - this.w, y: input.y - this._y, w: this.w + this._x};
      }
      
      this.w = input.x - this.right._inputOffset.x;
      this.right.x = this.w;

      this.emit('scaling');
   }

   render(ctx, input) {
      if (this.left._scaling) {
         this._slaleLeftX(input);
      }

      if (this.right._scaling) {
         this._slaleRightX(input);
      }

      super.render(ctx, input);
   }
}