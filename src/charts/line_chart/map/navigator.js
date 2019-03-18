import { Rectangle, Draggable, Scalable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height, themeObserver}) {
      super();
      
      themeObserver.subscribe(theme => {
         if (this.scalable) {
            this.scalable.edgeWidth = theme.map_edge_width;
            this.scalable.edgeColor = this.scalable.child.borderTop.color = this.scalable.child.borderBottom.color = theme.map_color1;
            this.background[0].color = this.background[1].color = theme.map_color2;
         }
      })

      var start_w = 100;
      var start_x = width-start_w-20;

      this.scalable = new Scalable({
         axisX: true,
         onScaling: () => this.onScaling(),
         child: new Rectangle({
            x: start_x,
            w: start_w,
            h: height,
            color: 'red',
            borderTop: {inside: true, width: 2},
            borderBottom: {inside: true, width: 2},
         }),
      });

      this.navigator = new Draggable({
         axisX: true,
         canDragX: (e) => this.canDragX(e),
         onDragging: () => this.onDragging(),
         child: this.scalable
      });
      
      this.background = [
         new Rectangle({w: start_x, h: height, inputIgnore: true}),
         new Rectangle({x: this.offset + this.width, w: width, h: height, inputIgnore: true})
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

   canDragX({child, x}) {
      if (child.x-x < x) {
         // console.log(x, child.w);

      }
      
      if (child.x-x > 0 && x < this.scalable.edgeWidth) {
         return this.scalable.edgeWidth;
      }
      if (child.x-x < x && x+child.w > this.element.w - this.scalable.edgeWidth) {
         return this.element.w - child.w - this.scalable.edgeWidth;
      }
      return x;
   }

   onDragging() {
      this.background[0].w = this.offset;
      this.background[1].x = this.offset + this.width;
      this.emit('offset');
   }

   get width() {
      return this.navigator.child.w + this.scalable.edgeWidth;
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