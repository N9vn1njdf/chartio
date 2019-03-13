import { Rectangle, Draggable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height}) {
      super();
      
      var start_w = 300;
      var start_x = width-start_w;

      this.navigator = new Draggable({
         axisX: true,
         child: new Rectangle({x: start_x, w: start_w, h: height}),
         onDragging: () => this.onDragging()
      });
      
      this.background = [
         new Rectangle({w: start_x, h: height, color: 'rgba(0, 0, 0, 0.1)'}),
         new Rectangle({x: this.offset + this.width, w: width, h: height, color: 'rgba(0, 0, 0, 0.1)'})
      ];
      
      // var edges = [
      //    new Rectangle({x: this.offset, w: this.width, w: 4, h: height, color: 'rgba(120, 160, 60, 0.5)'}),
      // ];

      this.element = new Rectangle({
         w: width,
         h: height,
         children: [
            ...this.background,
            this.navigator,
            // ...edges,
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