
export default class Event {

   constructor() {
      this.listeners = {};
   }

   on(event, callback = null) {      
      if (!this.listeners[event]) {
         this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
   }

   emit(event, data) {
      if (this.listeners[event]) {
         this.listeners[event].forEach(callback => callback((data)));
      }
   }
}