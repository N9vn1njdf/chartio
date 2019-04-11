import RenderElement from './render_element';

export default class HasChild extends RenderElement {

   constructor({x, y, child}) {
      super({x, y})

      this.child = child
   }

   updateChild() {
      if (this.child) {
         this.child.globalY = this.child.y + this.globalY
         this.child.globalX = this.child.x + this.globalX
      }
   }

   get child() {
      return this._child
   }

   set child(child) {
      if (child) {
         child.parent = this
         this._child = child
         this.updateChild()
      }
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      if (this._child) {
         this._child.render(ctx, input, time)
      }
   }
}