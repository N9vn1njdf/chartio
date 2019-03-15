
export default class Animation {

   constructor({child, duration}) {
      this.child = child;
      this.duration = duration;  // продолжительность в милисекундах

      this.running = false;
      this.completed = false;
   }

   forward() {
      if (this._timer || this.completed) {
         return;
      }
      
      this._run();
   }

   reverse() {
      if (this._timer || !this.completed) {
         return;
      }

      this._run(true);
   }

   _run(reverse = false) {
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

         var progress = reverse ? 100-100/this.duration*this._left : 100/this.duration*this._left;
         this.handle(progress);

      }, 10);
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