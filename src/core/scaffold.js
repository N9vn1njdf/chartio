import Input from './input.js';

export default class Scaffold {

   constructor({canvas, width, height, background, children}) {
      this.canvas = canvas;
      this.canvas.width = this.width = width;
      this.canvas.height = this.height = height;
      
      this.canvas.style.background = background || '#fff';

      this.input = new Input(this.canvas);

      this.children = children || [];
      this.ctx = this.canvas.getContext('2d');
      this.ctx.textBaseline = 'top';
      this.ctx.width = this.width;
      
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
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.children.forEach((element) => element.render(this.ctx, this.input, time));

      if (this.input.down && !this.input.event_down) {
         this.input.event_down = true;
      }

      if (this.input.el) {
         if (this.input.el.cursor != this.cursor) {         
            this.canvas.style.cursor = this.cursor = this.input.el.cursor;
         }

      } else {
         this.canvas.style.cursor = this.cursor = 'default';
      }

      requestAnimationFrame((time) => this.render(time));
   }

   add(element) {
      this.children.push(element);
   }
}