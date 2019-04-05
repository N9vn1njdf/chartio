import Element from './element.js'
import Rectangle from './rectangle.js'

// Note: масштабирование по оси Y не реализовано

export default class Scalable extends Element {

   constructor({child, axisX, axisY, maxWidth, minWidth, onScaling, edgeColor, edgeWidth}) {
      super({x: child.x, y: child.y, w: child.w, h: child.h});

      child.x = 0;
      child.y = 0;
      this.child = child;

      this.axisX = axisX || false;
      this.axisY = axisY || false;

      this.width = maxWidth;  // максимальная ширина по которой возможно масштабирование
      this.minWidth = minWidth || 10;  // минимальная ширина

      if (onScaling) {
         this.on('scaling', onScaling);
      }

      this.edgeColor = edgeColor || 'rgba(0, 0, 0, 0.2)';
      this.edgeWidth = edgeWidth || 5;
   }

   get edgeColor() {
      return this._edgeColor;
   }

   set edgeColor(value) {
      this._edgeColor = value;
      this.children = this._getChildren();
   }

   get edgeWidth() {
      return this._edgeWidth;
   }

   set edgeWidth(value) {
      this._edgeWidth = (value) >> 0;
      this.children = this._getChildren();
   }
   
   get child() {
      return this._child;
   }

   set child(value) {
      this._child = value;
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
      
      this.left = new Rectangle({x: -this.edgeWidth, w: this.edgeWidth, h: this.h, cursor: 'col-resize', color: this.edgeColor});
      this.left.on('down', () => this.left._scaling = true);
      this.left.on('up', () => this._stopScale());

      this.right = new Rectangle({x: this.w, w: this.edgeWidth, h: this.h, cursor: 'col-resize', color: this.edgeColor});
      this.right.on('down', () => this.right._scaling = true);
      this.right.on('up', () => this._stopScale());

      var edgesX = this.axisX ? [this.left, this.right] : [];

      // Тут ось Y...
      var edgesY = this.axisY ? [] : [];
      // ~~~~~~~~~~~~

      return [...edgesX, ...edgesY, this.child];
   }

   _stopScale() {
      this.left._scaling = false;
      this.left._inputOffset = null;
      this.right._scaling = false;
      this.right._inputOffset = null;
   }

   _slaleLeftX(input) {
      if (!this.left._inputOffset) {
         this.left._inputOffset = {x: input.x - this._x, y: input.y - this._y, w: this.w + this._x};
      }

      let newX = input.x - this.left._inputOffset.x;
      
      if (newX-(this.width - this.right.x) < 0) {
         newX = this.width - this.right.x;
      }

      if (this.left._inputOffset.w - newX < this.minWidth) {
         newX = newX - (this.minWidth - (this.left._inputOffset.w - newX))
      }
      
      this.w = this.left._inputOffset.w - newX;
      this.right.x = this.w;
      this.x = newX;
      
      this.emit('scaling');
   }
   
   _slaleRightX(input) {
      if (!this.right._inputOffset) {
         this.right._inputOffset = {x: input.x - this.w, y: input.y - this._y, w: this.w + this._x};
      }
      
      let newW = input.x - this.right._inputOffset.x;

      if (this.x + newW + this.edgeWidth >= this.width) {
         newW = this.width - this.x - this.edgeWidth;
      }

      if (newW < this.minWidth) {         
         newW = this.minWidth;
      }

      this.w = newW;
      this.right.x = this.w;
      
      this.emit('scaling');
   }

   render(ctx, input, time) {
      if (this.left._scaling) {
         this._slaleLeftX(input);
      }

      if (this.right._scaling) {
         this._slaleRightX(input);
      }

      super.render(ctx, input, time);
   }
}