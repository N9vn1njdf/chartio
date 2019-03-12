import { Rectangle } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height}) {
      super();
      
      var start_w = 300;
      var start_x = width-start_w;

      this.navigator = new Rectangle({x: start_x, w: start_w, h: height, draggable: {x: true}});
      
      this.navigator.on('dragging', (mouse) => {         
         left.w = this.offset;
         right.x = this.offset + this.width;
         this.emit('offset');
      });

      var left = new Rectangle({w: start_x, h: height, color: 'rgba(0, 0, 0, 0.1)'});
      var right = new Rectangle({x: this.offset + this.width, w: width, h: height, color: 'rgba(0, 0, 0, 0.1)'});
      
      this.element = new Rectangle({
         w: width,
         h: height,
         children: [
            left,
            this.navigator,
            right,
         ]
      });
   }

   get width() {      
      return this.navigator.w;
   }

   set width(value) {      
      this.navigator.w = value;
   }

   get offset() {
      return this.navigator.x;
   }

   set offset(value) {      
      this.navigator.x = value;
   }
}