import Element from './element.js'

export default class Rectangle extends Element {

   constructor({w, h, borderTop, borderBottom, borderLeft, borderRight, clip} = {}) {
      super(arguments[0]);
      
      this.w = w;
      this.h = h;
      this.clip = clip || false;

      if (borderTop) {
         this.borderTop = {
            color: borderTop.color || 'rgba(0, 0, 0, 0.2)',
            width: borderTop.width || 1,
            inside: borderTop.inside || false
         };
      }

      if (borderBottom) {
         this.borderBottom = {
            color: borderBottom.color || 'rgba(0, 0, 0, 0.2)',
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

   renderBorder(ctx) {
      if (!this.borderTop && !this.borderBottom && !this.borderLeft && !this.borderRight) {
         return;
      }

      ctx.beginPath();

      // top border
      if (this.borderTop) {
         if (ctx.strokeStyle !== this.borderTop.color) {         
            ctx.strokeStyle = this.borderTop.color;
         }
         
         if (ctx.lineWidth !== this.borderTop.width) {
            ctx.lineWidth = this.borderTop.width;
         }

         var y = this.borderTop.inside ? this.y + this.borderTop.width/2 : this.y;
         
         ctx.moveTo(this.x, y);
         ctx.lineTo(this.x + this.w, y);
      }

      // bottom border
      if (this.borderBottom) {
         if (ctx.strokeStyle !== this.borderBottom.color) {         
            ctx.strokeStyle = this.borderBottom.color;
         }
         
         if (ctx.lineWidth !== this.borderBottom.width) {
            ctx.lineWidth = this.borderBottom.width;
         }

         var y = this.borderBottom.inside ? this.y + this.h - this.borderTop.width/2 : this.y + this.h;
         
         ctx.moveTo(this.x, y);
         ctx.lineTo(this.x + this.w, y);
      }

      ctx.stroke();
      ctx.closePath();
   }

   render(ctx, input, time) {
      if (!this.isVisible(ctx.width) && !this.clip) {
         this.renderBorder(ctx);
         super.render(ctx, input, time);
         return;
      }

      if(this.clip) {
         // ctx.save();
         // ctx.rect(this.x, this.y, this.w, this.h);
         // ctx.clip();
      }

      if (this.alpha > 0) {
         if (ctx.globalAlpha !== this.alpha) {
            ctx.globalAlpha = this.alpha;
         }

         if (ctx.fillStyle !== this.color) {
            ctx.fillStyle = this.color;
         }

         ctx.fillRect(this.x, this.y, this.w, this.h);

         this.renderBorder(ctx);
      }

      super.render(ctx, input, time);

      if(this.clip) {
         // ctx.restore();
      }
   }
}