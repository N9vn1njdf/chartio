
export default class EventObserver {

   constructor () {
     this.observers = []
   }
 
   subscribe (callback) {
     this.observers.push(callback)
   }
 
   unsubscribe (callback) {
     this.observers = this.observers.filter(subscriber => subscriber !== callback)
   }
 
   broadcast (data) {
     this.observers.forEach(subscriber => subscriber(data))
   }
}