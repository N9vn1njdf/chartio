import ChartObject from './ChartObject.js'

export default class Rect extends ChartObject {

   constructor(x, y, w, h, {color}) {
      super(x, y);
      
      this.w = w;
      this.h = h;
      this.color = color || null;
   }

   isMove({x, y}) {
      if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {
         return true;
      }
      return false;
   }

   render(ctx) {
      if (this.color) {
         ctx.fillStyle = this.color;
      }
      ctx.fillRect(this.x, this.y, this.w, this.h);
   }
}