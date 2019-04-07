
export default class Animation {

   constructor({child, duration, completed}) {
      this.child = child;      
      this.duration = duration || 300;

      this.running = false;
      this.completed = completed != null ? completed : false;
   }

   forward() {
      if (this.running || this.completed) {
         return;
      }

      this.start();
      this.start_time = performance.now();
      this.running = true;
      this.reversed = false;
   }

   reverse() {      
      if (this.running || !this.completed) {
         return;
      }

      this.reversed = true;
      this.start();
      this.start_time = performance.now();
      this.running = true;
   }

   start() {}

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

   // get x() {
   //    if (!this.parent) {
   //       return 0;
   //    }
   //    return this.parent.x
   // }

   // set x(value) {
   //    this.parent.x = value;
   // }

   // get y() {
   //    if (!this.parent) {
   //       return 0;
   //    }
   //    return this.parent.y;
   // }

   // set y(value) {
   //    this.parent.y = value;
   // }

   get x() {
      return this.child.x
   }

   set x(value) {
      this.child.x = value
   }

   get y() {
      return this.child.y
   }

   set y(value) {
      this.child.y = value
   }

   get x2() {
      return this.child.x2
   }

   set x2(value) {
      this.child.x2 = value
   }

   get y2() {
      return this.child.y2
   }

   set y2(value) {
      this.child.y2 = value
   }

   get w() {
      return this.parent.w;
   }

   get h() {
      return this.parent.h;
   }

   get color() {
      return this.parent.color
   }

   get needUpdate() {
      return this.running
   }

   render(ctx, input, time) {
      this.child.render(ctx, input, time);

      if (this.running) {
         
         let time_fraction = (time - this.start_time) / this.duration;
         if (time_fraction > 1) {
            time_fraction = 1;
         }
   
         let progress = this.reversed ? 1 - this.curve(1 - time_fraction) : this.curve(time_fraction);
         if (progress < 0) {
            progress = 0;
         }
         this.handle(progress, time_fraction);
   
         if (time_fraction == 1) {
            this.running = false;
            this.completed = !this.completed;
         }
      }
   }
}