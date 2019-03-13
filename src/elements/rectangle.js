import Element from './element.js'

export default class Rectangle extends Element {

   constructor({x, y, w, h, color, draggable, children}) {
      super({x, y, w, h, color, draggable, children});
      
      this.w = w;
      this.h = h;
   }

   render(ctx, input) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);

      super.render(ctx, input);
   }
}