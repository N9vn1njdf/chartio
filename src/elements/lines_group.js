
// Используется совместно и Line
export default class LinesGroup {

   constructor({x, y, lineWidth, color, children}) {
      this.x = x || 0;
      this.y = y || 0;
      this.lineWidth = lineWidth !== null ? lineWidth-.5 : 1.5;
      this.color = color
      this.children = children || [];
   }

   get children() {
      return this._children;
   }

   set children(value) {      
      for (let i in value) {
         value[i].parent = this;
      }
      
      return this._children = value;
   }

   get x() {
      if (this.parent != null) {
         return this._x + this.parent.x;
      }
      return this._x;
   }

   set x(value) {
      return this._x = value;
   }

   get y() {
      if (this.parent != null) {
         return this._y + this.parent.y;
      }
      return this._y;
   }

   set y(value) {
      return this._y = value;
   }

   get needUpdate() {      
      for(let i in this._children) {
         if (this._children[i].needUpdate) {
            return true;
         }
      }
      return false
   }

   render(ctx, input, time) {
      if (this.alpha == 0) {
         return;
      }

      if (ctx.strokeStyle !== this.color) {
         ctx.strokeStyle = this.color;
      }

      if (ctx.lineWidth !== this.lineWidth) {
         ctx.lineWidth = this.lineWidth;
      }

      ctx.beginPath();

      this._children.forEach((child) => child.render(ctx, input, time));

      ctx.closePath();
      ctx.stroke();
   }
}