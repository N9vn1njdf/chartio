import ChartObject from './ChartObject.js'

export default class Rect extends ChartObject {

   constructor({x, y, w, h, color, draggable, children}) {
      super(children);
      
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color || "rgba(255, 255, 255, 1)";
      this.draggable = draggable || null;

      return this;
   }

   isHover({x, y}) {
      return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h);
   }

   render(ctx, {mouse}) {
      super.render(ctx, {mouse});
      
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
   }
}