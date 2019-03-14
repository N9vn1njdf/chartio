import Input from './input.js';

export default class Scaffold {

   constructor({id, width, height, children}) {
      this.canvas = document.getElementById(id);
      this.canvas.width = width;
      this.canvas.height = height;

      this.input = new Input(this.canvas);

      this.children = children || [];
      this.render();
   }

   render() {
      var ctx = this.canvas.getContext('2d');
      
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.children.forEach((element) => element.render(ctx, this.input));
      
      if (this.input.down && !this.input.event_down) {
         this.input.event_down = true;
      }

      if (this.input.el) {         
         this.canvas.style.cursor = this.input.el.cursor;
      } else {
         this.canvas.style.cursor = 'default';
      }

      requestAnimationFrame(() => this.render());
   }

   add(element) {
      this.children.push(element);
   }
}