
export default class ChartObject {

   constructor(children) {
      this.events = {};
      
      this.children = children || [];

      for (let i in this.children) {
         this.children[i]._x = this.children[i].x;
         this.children[i]._y = this.children[i].y;
      }
   }

   $on(type, callback) {
      if (!this.events[type]) {
         this.events[type] = [];
      }
      this.events[type].push(callback);

      return this;
   }

   $emit(type, data) {
      for(let i in this.events[type]) {
         this.events[type][i].call({'asd': 12}, data);
      }
   }

   _handleDragging(mouse) {      
      if (!mouse.down) {
         this._drag = false;
         this._drag_offset = null;
         return;
      }

      if (!this._drag_offset) {
         this._drag_offset = {x: mouse.x - this.x, y: mouse.y - this.y};   
      }
      
      if (this.draggable.y) {
         this.y = mouse.y - this._drag_offset.y;
      }

      if (this.draggable.x) {
         this.x = mouse.x - this._drag_offset.x;
      }

      this.$emit('dragging', mouse);

   }
   
   render(ctx, {mouse}) {

      if (this.isHover(mouse)) {
         this.move = true;
         this.$emit('move', mouse);

         if(this.draggable && mouse.down) {
            this._drag = true;
         }

      } else {
         if(this.move) {
            this.move = false;
            this.$emit('leave', mouse);
         }
      }
      
      // Обработка перетаскиваний
      if(this._drag) {
         this._handleDragging(mouse);
      }


      // Рендер дочерних объектов
      let self = this;
      
      for(let i in self.children) {
         let object = self.children[i];

         object.x = self.x + object._x;
         object.y = self.y + object._y;

         object.render(ctx, {mouse: mouse});
      }
   }
}