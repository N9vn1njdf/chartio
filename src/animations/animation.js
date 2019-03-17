
export default class Animation {

   constructor({child, duration}) {
      this.child = child;      
      this.duration = duration || 300;

      this.running = false;
      this.completed = false;
   }

   forward() {
      if (this.running || this.completed) {
         return;
      }

      this.start = performance.now();
      this.running = true;
      this.reversed = false;
   }

   reverse() {      
      if (this.running || !this.completed) {
         return;
      }

      this.start = performance.now();
      this.running = true;
      this.reversed = true;
   }

   curve(time_fraction) {
      return time_fraction;
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

   render(ctx, input, time) {
      this.child.render(ctx, input, time);

      if (this.running) {
         
         let time_fraction = (time - this.start) / this.duration;
         if (time_fraction > 1) {
            time_fraction = 1;
         }
   
         let progress = this.reversed ? 1 - this.curve(1 - time_fraction) : this.curve(time_fraction);
         if (progress < 0) {
            progress = 0;
         }
         this.handle(progress, this.reversed);
   
         if (time_fraction == 1) {            
            this.running = false;
            this.completed = !this.completed;
         }
      }
   }
}