import Mouse from './mouse.js';

export default class Scaffold {

   constructor({id, width, height, children}) {
      var canvas = document.getElementById(id);
      var ctx = canvas.getContext("2d");

      this.width = canvas.width = width;
      this.height = canvas.height = height;
      this.children = children;

      Mouse.init(canvas);
      this.render(ctx);
   }

   render(ctx) {
      ctx.clearRect(0, 0, this.width, this.height);
      let self = this;

      for(let i in self.children) {
         self.children[i].render(ctx);
      }

      requestAnimationFrame(() => self.render(ctx));
   }

   add(element) {
      this.children.push(element);
   }
}