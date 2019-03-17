import { Rectangle, Draggable, Scalable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height, theme}) {
      super();
      
      var start_w = 100;
      var start_x = width-start_w;

      this.navigator = new Draggable({
         axisX: true,
         onDragging: () => this.onDragging(),
         child: new Scalable({
            axisX: true,
            onScaling: () => this.onScaling(),
            edgeColor: theme.navigator_color1,
            child: new Rectangle({
               x: start_x,
               w: start_w,
               h: height,
               borderTop: {color: theme.navigator_color1, inside: true, width: 2},
               borderBottom: {color: theme.navigator_color1, inside: true, width: 2},
            }),
         })
      });
      
      this.background = [
         new Rectangle({w: start_x, h: height, color: theme.navigator_color2, inputIgnore: true}),
         new Rectangle({x: this.offset + this.width, w: width, h: height, color: theme.navigator_color2, inputIgnore: true})
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