import Element from './element.js'

export default class Line extends Element {

   constructor({x, y, x2, y2, w, color}) {
      super(arguments[0]);
      
      this.x2 = x2 || 0;
      this.y2 = y2 || y;
      this.w = w || 1;
   }

   get x2() {
      if (this.parent != null) {         
         return this._x2 + this.parent.w;
      }
      return this._x2;
   }

   set x2(value) {
      return this._x2 = value;
   }

   render(ctx, input, time) {
      ctx.globalAlpha = this.alpha;

      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.w;
      
      ctx.beginPath();
      ctx.moveTo(this.x + 0.5, this.y + 0.5);
      ctx.lineTo(this.x2 + 0.5, this.y2 + 0.5);
      ctx.stroke();
      ctx.closePath();

      super.render(ctx, input, time);
   }
}