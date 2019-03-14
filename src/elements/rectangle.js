import Element from './element.js'

export default class Rectangle extends Element {

   constructor({w, h, borderTop, borderBottom, borderLeft, borderRight}) {
      super(arguments[0]);
      
      this.w = w;
      this.h = h;

      if (borderTop) {
         this.borderTop = {
            color: borderTop.color || 'rgb(0, 0, 0)',
            width: borderTop.width || 1,
            inside: borderTop.inside || false
         };
      }

      if (borderBottom) {
         this.borderBottom = {
            color: borderBottom.color || 'rgb(0, 0, 0)',
            width: borderBottom.width || 1,
            inside: borderBottom.inside || false
         };
      }

      if (borderLeft) {
         // ..
      }

      if (borderRight) {
         // ..
      }
   }

   render(ctx, input) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);

      if (this.borderTop) {
         ctx.strokeStyle = this.borderTop.color;
         ctx.lineWidth = this.borderTop.width;

         var y = this.borderTop.inside ? this.y + this.borderTop.width/2 : this.y;
         
         ctx.beginPath();
         ctx.moveTo(this.x, y);
         ctx.lineTo(this.x + this.w, y);
         ctx.stroke();
         ctx.closePath();

      }

      if (this.borderBottom) {
         ctx.strokeStyle = this.borderBottom.color;
         ctx.lineWidth = this.borderBottom.width;

         var y = this.borderBottom.inside ? this.y + this.h - this.borderTop.width/2 : this.y + this.h;
         
         ctx.beginPath();
         ctx.moveTo(this.x, y);
         ctx.lineTo(this.x + this.w, y);
         ctx.stroke();
      }

      super.render(ctx, input);
   }
}