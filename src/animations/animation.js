
export default class Animation {

   constructor({child, duration, completed}) {
      this.child = child;      
      this.duration = duration || 300;

      this.running = false;
      this.completed = completed || false;

      if (completed) {         
         this.handle(0);
      }
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

   get w() {
      return this.parent.w;
   }

   get h() {
      return this.parent.h;
   }

   render(ctx, input) {
      this.child.render(ctx, input);
   }
}