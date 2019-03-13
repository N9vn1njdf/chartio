import { Rectangle, Draggable, Scalable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height}) {
      super();
      
      var start_w = 300;
      var start_x = width-start_w-20;

      this.navigator = new Draggable({
         axisX: true,
         child: new Scalable({
            axisX: true,
            child: new Rectangle({x: start_x, w: start_w, h: height, color: 'rgba(220, 220, 0, 0.9)'}),
         })
         // onDragging: () => this.onDragging()
      });
      
      this.background = [
         new Rectangle({w: start_x, h: height, color: 'rgba(0, 0, 0, 0.1)'}),
         new Rectangle({x: this.offset + this.width, w: width, h: height, color: 'rgba(0, 0, 0, 0.1)'})
      ];

      this.element = new Rectangle({
         w: width,
         h: height,
         children: [
            ...this.background,
            this.navigator,
         ]
      });
   }

   onDragging() {
      this.background[0].w = this.offset;
      this.background[1].x = this.offset + this.width;
      this.emit('offset');
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