import Input from './input.js';

export default class Scaffold {

   constructor({canvas, width, height, background, children}) {
      this.canvas = canvas;
      this.canvas.width = this.width = width;
      this.canvas.height = this.height = height;
      this.canvas.style.background = background || '#fff';

      this._need_update = [];
      this.need_update = false;
      
      this.input = new Input(this);

      this.children = children || [];
      this.ctx = this.canvas.getContext('2d');
      this.ctx.textBaseline = 'top';
      this.ctx.width = this.width;
      this.ctx.lineCap = 'round';
      this.ctx.miterLimit = 1;

      requestAnimationFrame((time) => this.render(time));
   }

   get background() {
      return this._background;
   }

   set background(value) {
      this._background = value;
      this.canvas.style.background = value;
   }

   get need_update() {
      return this._need_update.length > 0;
   }

   set need_update(value) {
      if (value) {
         this._need_update.push(true)
      } else if (this._need_update.length > 0) {
         this._need_update.splice(0, 1);
      }
   }

   update(delay = 100) {
      this.need_update = true;
      setTimeout(() => this.need_update = false, delay);
   }

   render(time) {
      if (!this.need_update) {
         this.children.forEach((element) => {         
            if (element.needUpdate) {
               this.need_update = true;
               return;
            }
         });   
      }

      if (!this.need_update) {
         requestAnimationFrame((time) => this.render(time));
         return;
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