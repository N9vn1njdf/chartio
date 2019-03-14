import { Rectangle, Draggable, Scalable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height}) {
      super();
      
      var start_w = 300;
      var start_x = width-start_w-20;

      this.navigator = new Draggable({
         axisX: true,
         onDragging: () => this.onDragging(),
         child: new Scalable({
            axisX: true,
            onScaling: () => this.onScaling(),
            child: new Rectangle({
               x: start_x,
               w: start_w,
               h: height,
               borderTop: {color: 'rgba(0, 0, 0, 0.12)', inside: true},
               borderBottom: {color: 'rgba(0, 0, 0, 0.12)', inside: true},
            }),
         })
      });
      
      this.background = [
         new Rectangle({w: start_x, h: height, color: 'rgba(255, 255, 255, 0.5)', inputIgnore: true}),
         new Rectangle({x: this.offset + this.width, w: width, h: height, color: 'rgba(255, 255, 255, 0.5)', inputIgnore: true})
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

   onScaling() {      
      this.background[0].w = this.offset;
      this.background[1].x = this.offset + this.width;
      this.emit('scaling');
   }

   onDragging() {
      this.background[0].w = this.offset;
      this.background[1].x = this.offset + this.width;
      this.emit('offset');
   }

   get width() {
      return this.navigator.child.w;
   }

   set width(value) {
      this.navigator.child.w = value;
   }

   get offset() {
      return this.navigator.child.x;
   }

   set offset(value) {
      this.navigator.child.x = value;
   }
}