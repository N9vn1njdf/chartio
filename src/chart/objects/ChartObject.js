
export default class ChartObject {

   constructor(x, y) {
      this.events = {};
      this.x = x;
      this.y = y;
   }

   $on(type, callback) {
      if (!this.events[type]) {
         this.events[type] = [];
      }
      this.events[type].push(callback);
   }

   $emit(type, data) {
      for(let i in this.events[type]) {
         this.events[type][i](data);
      }
   }

   isMove({x, y}) {}

   render(ctx) {}
}