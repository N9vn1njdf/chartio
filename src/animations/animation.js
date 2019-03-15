
export default class Animation {

   constructor({child, duration}) {
      this.child = child;
      this.duration = duration;  // продолжительность в милисекундах

      this.running = false;
      this.completed = false;
   }

   run() {
      if (this._timer || this.completed) {
         return;
      }

      this.running = true;
      this._left = this.duration;

      this._timer = setInterval(() => {
         this._left -= 10;

         if (this._left <= 0) {
            clearInterval(this._timer);
            this._timer = null;
            this.running = false;
            this.completed = !this.completed;
         }
         
         this.handle(100/this.duration*this._left);

      }, 10);
   }

   reverse() {
      if (this._timer || !this.completed) {
         return;
      }

      this.running = true;
      this._left = this.duration;

      this._timer = setInterval(() => {
         this._left -= 10;

         if (this._left <= 0) {
            clearInterval(this._timer);
            this._timer = null;
            this.running = false;
            this.completed = !this.completed;
         }
         
         this.handle(100-100/this.duration*this._left);
         
      }, 10);
   }

   progress() {
      // логика анимации
   }

   get child() {
      return this._child;
   }

   set child(value) {
      value.parent = this;
      return this._child = value;
   }

   get x() {
      if (!this.parent) {
         return 0;
      }
      return this.parent.x
   }

   set x(value) {      
      this.parent.x = value;
   }

   get y() {
      if (!this.parent) {
         return 0;
      }
      return this.parent.y;
   }

   set y(value) {
      this.parent.y = value;
   }

   render(ctx, input) {
      this.child.render(ctx, input);
   }
}