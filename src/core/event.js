
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

   emit(event, data, data2 = null) {
      if (this.listeners[event]) {
         this.listeners[event].forEach(callback => callback(data, data2));
      }
   }
}