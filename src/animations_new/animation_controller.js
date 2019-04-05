
export default class AnimationController {

   constructor({duration, onProgress}) {
      this.duration = duration;
      this.onProgress = onProgress;
   }

   forward() {
      if (this.running || this.completed) {
         return;
      }

      this.reversed = false;
      this.start_time = performance.now();
      this.running = true;
   }

   reverse() {      
      if (this.running || !this.completed) {
         return;
      }

      this.reversed = true;
      this.start_time = performance.now();
      this.running = true;
   }

   get needUpdate() {
      return this.running
   }

   curve(time_fraction) {
      return time_fraction;
   }

   render(ctx, input, time) {
      if (!this.running) {
         return;
      }

      let time_fraction = (time - this.start_time) / this.duration;
      if (time_fraction > 1) {
         time_fraction = 1;
      }

      let progress = this.reversed ? 1 - this.curve(1 - time_fraction) : this.curve(time_fraction);
      if (progress < 0) {
         progress = 0;
      }
      
      this.onProgress(progress, time_fraction);

      if (time_fraction == 1) {
         this.running = false;
         this.completed = !this.completed;
      }
   }
}