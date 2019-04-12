import RenderElement from './render_element';

export default class HasChildren extends RenderElement {

   constructor({x, y, children}) {
      super({x, y})

      this.children = children || []
   }

   updateChild() {
      this.children.forEach(child => {
         child.globalX = child.x + this.globalX
         child.globalY = child.y + this.globalY
      })
   }

   get children() {
      return this._children || []
   }

   set children(children) {
      for (let i in children) {
         children[i].parent = this
      }
      this._children = children
      this.updateChild()
   }

   /**
    * Функция рендер. Вызывается при каждой отрисовке элемента
    * 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Input} input 
    * @param {Number} time 
    */
   render(ctx, input, time) {
      if (!this.isVisible(ctx.width, ctx.height)) {
         return
      }

      this._children.forEach(child => {
         if (child.$is_component || child.isVisible(ctx.width, ctx.height)) {
            child.render(ctx, input, time)
         }
      })
   }
}