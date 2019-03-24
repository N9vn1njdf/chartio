import Input from './input.js';

export default class Scaffold {

   constructor({canvas, width, height, background, children}) {
      this.canvas = canvas;
      this.canvas.width = this.width = width;
      this.canvas.height = this.height = height;
      this.canvas.style.background = background || '#fff';

      this.need_update = true;
      this.one_frame = false;
      
      this.input = new Input(this);

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

   update() {
      this.need_update = true;
      this.one_frame = true;
   }

   render(time) {
      this.children.forEach((element) => {         
         if (element.needUpdate) {
            this.need_update = true;
            return;
         }
      });

      if (!this.need_update) {
         requestAnimationFrame((time) => this.render(time));
         return;
      }

      if (this.one_frame) {
         this.need_update = false;
         this.one_frame = false;
      }
      
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.children.forEach((element) => {
         element.render(this.ctx, this.input, time);
      });

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