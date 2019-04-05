import Input from './input.js';

export default class Scaffold {

   constructor({canvas, width, height, background, children}) {
      this.canvas = canvas;
      this.canvas.width = this.width = width;
      this.canvas.height = this.height = height;
      this.canvas.style.background = background || '#fff';

      this._need_update = {};
      
      this.input = new Input(this);

      this.children = children || [];

      this.ctx = this.canvas.getContext('2d');
      this.ctx.textBaseline = 'top';
      this.ctx.width = this.width;
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

   get needUpdate() {
      for(let i in this._need_update) {
         if (this._need_update[i]) {
            return true;
         }
      }
   }

   setNeedUpdate(key, value, delay = null) {
      if (this._need_update[key] !== value) {
         if (delay) {
            this._need_update[key] = value;
            setTimeout(() => this._need_update[key] = !value, delay);
         } else {
            this._need_update[key] = value;
         }
      }
   }

   render(time) {
      let need_children_update = false;

      if (!this.needUpdate) {
         this.children.forEach((element) => {
            if (element.needUpdate) {
               need_children_update = true;
               return;
            }
         });
      }

      if (!this.needUpdate && !need_children_update) {
         requestAnimationFrame((time) => this.render(time));
         return;
      }
      
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.children.forEach((element) => {
         element.render(this.ctx, this.input, time);
      });

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