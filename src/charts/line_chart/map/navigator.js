import { Rectangle, Draggable, Scalable } from 'elements'
import { Event } from 'core'

export default class Navigator extends Event {

   constructor({width, height, themeObserver}) {
      super();
      
      this.map_width = width;
      var navigator_width = 100;

      themeObserver.subscribe(theme => {
         if (this.scalable) {
            this.offset = width-navigator_width-theme.map_navigator_edge_width
            this.scalable.edgeWidth = theme.map_navigator_edge_width;
            this.scalable.minWidth = theme.map_navigator_min_width >>> 0;
            this.update(false)

            this.scalable.edgeColor = this.border[0].color = this.border[1].color = theme.map_color1;
            this.background[0].color = this.background[1].color = theme.map_color2;
         }
      })

      this.scalable = new Scalable({
         axisX: true,
         maxWidth: width,
         onScaling: () => this.update(),
         child: new Rectangle({w: navigator_width, h: height}),
      });

      this.navigator = new Draggable({
         axisX: true,
         canDragX: (e) => this.canDragX(e),
         onDragging: () => this.update(),
         child: this.scalable
      });
      
      this.background = [
         new Rectangle({h: height, inputIgnore: true}),
         new Rectangle({h: height, inputIgnore: true})
      ]

      this.border = [
         new Rectangle({h: 2}),
         new Rectangle({h: 2, y: height-2}),
      ]

      this.element = new Rectangle({
         w: width,
         h: height,
         children: [
            ...this.background,
            ...this.border,
            this.navigator,
         ]
      });
   }

   update(event = true) {      
      this.background[0].w = this.offset;
      this.background[1].w = this.map_width - this.offset;
      this.background[1].x = this.offset + this.width;
      this.border[0].w = this.border[1].w = this.navigator.child.w;
      this.border[0].x = this.border[1].x = this.navigator.child.x;
      if (event) {
         this.emit('update')
      }
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