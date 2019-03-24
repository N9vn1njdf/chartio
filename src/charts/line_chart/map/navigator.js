import { Rectangle, Draggable, Scalable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height, themeObserver}) {
      super();
      
      var navigator_width = 100;

      themeObserver.subscribe(theme => {
         if (this.scalable) {
            this.offset = width-navigator_width-theme.map_edge_width
            this.scalable.edgeWidth = theme.map_edge_width;
            this.background[0].w = this.offset;
            this.background[1].x = this.offset + this.width;

            this.scalable.edgeColor = this.scalable.child.borderTop.color = this.scalable.child.borderBottom.color = theme.map_color1;
            this.background[0].color = this.background[1].color = theme.map_color2;
         }
      })

      this.scalable = new Scalable({
         axisX: true,
         width: width,
         onScaling: () => this.onScaling(),
         child: new Rectangle({
            w: navigator_width,
            h: height,
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
         new Rectangle({h: height, inputIgnore: true}),
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
      if (child.x - child._x - x > 0) {         
         if (x + child._x < this.scalable.edgeWidth) {
            return this.scalable.edgeWidth - child._x;
         }
      }

      if (child.x - child._x - x < 0) {
         if (x + child.w + child._x > this.element.w - this.scalable.edgeWidth) {
            return this.element.w - child.w - this.scalable.edgeWidth - child._x;
         }
      }
      return x;
   }

   onDragging() {
      this.background[0].w = this.offset;
      this.background[1].x = this.offset + this.width;
      this.emit('offset');
   }

   get width() {
      return this.navigator.child.w + this.scalable.edgeWidth*2;
   }

   set width(value) {
      this.navigator.child.w = value;
   }

   get offset() {
      return this.navigator.child.x - this.scalable.edgeWidth;
   }

   set offset(value) {
      this.navigator.child.x = value;
   }
}