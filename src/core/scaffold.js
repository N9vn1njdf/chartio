import Input from './input.js';

export default class Scaffold {

   constructor({canvas, width, height, background, children}) {
      this.canvas = canvas;
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.background = background || '#fff';

      this.input = new Input(this.canvas);

      this.children = children || [];
      requestAnimationFrame((time) => this.render(time));
   }

   get background() {
      return this._background;
   }

   set background(value) {
      this._background = value;
      this.canvas.style.background = value;
   }

   render(time) {
      var ctx = this.canvas.getContext('2d');
      
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.children.forEach((element) => element.render(ctx, this.input, time));
      
      if (this.input.down && !this.input.event_down) {
         this.input.event_down = true;
      }

      if (this.input.el) {         
         this.canvas.style.cursor = this.input.el.cursor;
      } else {
         this.canvas.style.cursor = 'default';
      }

      requestAnimationFrame((time) => this.render(time));
   }

   add(element) {
      this.children.push(element);
   }
}