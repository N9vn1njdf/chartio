import Element from './element.js'

// Элемент должен быть помещен в LinesGroup для отрисовки
export default class Line extends Element {

   constructor({x, y, x2, y2}) {
      super(arguments[0]);
      
      this.x2 = x2 || 0;
      this.y2 = y2 || y;
   }

   get x2() {
      if (this.parent != null) {         
         return this._x2 + this.parent.x;
      }
      return this._x2;
   }

   set x2(value) {
      return this._x2 = value + .5
   }

   get y2() {
      if (this.parent != null) {
         return this._y2 + this.parent.y;
      }
      return this._y2;
   }

   set y2(value) {
      return this._y2 = value + .5
   }

   get x() {
      if (this.parent != null) {
         return this._x + this.parent.x;
      }
      return this._x;
   }

   set x(value) {
      return this._x = value + .5;
   }

   get y() {
      if (this.parent != null) {
         return this._y + this.parent.y;
      }
      return this._y;
   }

   set y(value) {
      return this._y = value + .5;
   }

   get color() {
      return this.parent.color
   }

   set color(value) {}

   // Простая проверка виден ли элемент. Чтобы не рисовать скрытые элементы
   isVisible(width) {
      if (!this.color || this.color == 'transparent') {
         return false;
      }
      
      return (this.x > 0 || this.x2 > 0) && this.x < width;
   }

   render(ctx, input, time) {
      if (!this.isVisible(ctx.width)) {
         return;
      }
      
      if (ctx.globalAlpha !== this.alpha) {
         ctx.globalAlpha = this.alpha;
      }

      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x2, this.y2);
   }
}