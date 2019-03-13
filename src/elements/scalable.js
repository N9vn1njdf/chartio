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
         this.on('dragging', onScaling);
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
      
      this.left = new Rectangle({x: 0, w: 4, h: this.h, color: 'rgba(120, 160, 60, 0.5)'});
      this.left.on('down', (input) => this.left._scaling = true);

      this.right = new Rectangle({x: this.w, w: 4, h: this.h, color: 'rgba(120, 160, 60, 0.5)'});
      this.right.on('down', (input) => this.right._scaling = true);

      var edgesX = this.axisX ? [this.left, this.right] : [];

      // Тут ось Y...
      var edgesY = this.axisY ? [] : [];
      // ~~~~~~~~~~~~

      return [this.child, ...edgesX, ...edgesY];
   }

   _slaleLeftX(input) {
      if (!this.left._inputOffset) {         
         this.left._inputOffset = {x: input.x - this._x, y: input.y - this._y};   
      }
      
      let newX = input.x - this.left._inputOffset.x;

      this.w += this.x - newX;
      this.right.x = this.w;
      this.x = newX;

      this.emit('dragging')
   }
   
   _slaleRightX(input) {
      if (!this.right._inputOffset) {
         this.right._inputOffset = {x: input.x - this._x, y: input.y - this._y};   
      }
      
      let newX = input.x - this.right._inputOffset.x;
      console.log(this.w, newX);
      
      // this.w = input.x;
      // this.left.x = this.w;
      // this.x = newX;

      this.emit('dragging')
   }

   render(ctx, input) {
      if (this.left._scaling) {
         this._slaleLeftX(input);
      }

      if (this.right._scaling) {
         this._slaleRightX(input);
      }

      if (!input.down) {
         this.left._scaling = false;
         this.left._inputOffset = false;

         this.right._scaling = false;
         this.right._inputOffset = false;
      }

      super.render(ctx, input);
   }
}