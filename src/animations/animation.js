
export default class Animation {

   constructor({child, duration}) {
      this.child = child;      
      this.duration = duration || 300;

      this.running = false;
      this.completed = false;
   }

   forward() {
      if (this._timer || this.completed) {
         return;
      }
      console.log('forward');

      this.start = performance.now();

      this._run();
   }

   reverse() {      
      if (this._timer || !this.completed) {
         return;
      }

      console.log('reverse');

      this.start = performance.now();

      this._run(true);
   }

   _curve(time_fraction) {
      return time_fraction;
   }

   _run(reverse = false) {
      this.running = true;

      requestAnimationFrame((time) => {         
         let time_fraction = (time - this.start) / this.duration;
         if (time_fraction > 1) {
            time_fraction = 1;
         }

         let progress = reverse ? 1 - this._curve(1 - time_fraction) : this._curve(time_fraction);
         // if (progress < 0) {
         //    console.log(time , this.start,   this.duration);
         // }
         this.handle(progress, reverse);

         if (time_fraction == 1) {
            this.running = false;
            this.completed = !this.completed;
            return;
         }
         
         if (time_fraction < 1) {
           requestAnimationFrame(() => this._run(reverse));
         }
      });
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