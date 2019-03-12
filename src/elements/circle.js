import Element from './element.js'

export default class Circle extends Element {

   constructor({x, y, r, color, draggable, children}) {
      super({x, y, color, draggable, children});
      
      this.r = r;

      return this;
   }

   isHover({x, y}) {
      return x < this.x + this.r && x > this.x - this.r && y < this.y + this.r && y > this.y - this.r;
   }

   render(ctx, input) {      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();

      super.render(ctx, input);
   }
}