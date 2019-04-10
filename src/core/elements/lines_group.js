import Children from "./children";

// Используется совместно и Line
export default class LinesGroup extends Children {

   constructor({x, y, children, lineWidth, color, lineCap}) {
      super({x, y, children})

      this.lineWidth = lineWidth;
      this.color = color
      this.lineCap = lineCap || 'butt';
   }

   updateChild() {
      this.children.forEach(child => {
         child.globalX = child.x + this.globalX
         child.globalY = child.y + this.globalY
         child.globalX2 = child.x2 + this.globalX
         child.globalY2 = child.y2 + this.globalY
      })
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      if (this.alpha == 0) {
         return;
      }

      if (ctx.lineCap != this.lineCap) {
         ctx.lineCap = this.lineCap;
      }

      if (ctx.strokeStyle !== this.color) {
         ctx.strokeStyle = this.color;
      }

      if (ctx.lineWidth !== this.lineWidth) {
         ctx.lineWidth = this.lineWidth;
      }

      ctx.beginPath();

      super.render(ctx, input, time)

      // ctx.fillStyle = 'rgba(123, 234, 123, 0.5)'
      // ctx.fillRect(this.globalX, this.globalY, 600, 55);

      ctx.closePath();
      ctx.stroke();
   }
}