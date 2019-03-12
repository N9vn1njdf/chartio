import { Circle, Rectangle } from 'elements'
import Navigator from './navigator.js'
import { Event } from 'core'

export default class Map extends Event {

   constructor({width, height, ratio}) {
      super();

      this.width = width;
      this.height = height;
      this.ratio = ratio;
      this.map_items = [];

      this.navigator = new Navigator({width, height});
      this.navigator.on('offset', () => {
         this.emit('offset', this.main_offset);
      });

      this.data_element = new Rectangle({w: width, h: height, children: this.map_items});
      
      this.element = new Rectangle({
         w: width,
         h: height,
         color: 'rgba(110, 110, 100, 0.1)',
         children: [
            this.data_element,
            this.navigator.element,
         ]
      });
   }

   get main_offset() {
      var sx = this.scale.x * this.width / this.navigator.width;
      return -this.navigator.offset * (sx/this.scale.x)
   }

   get main_scale() {
      return {
         x: this.scale.x * this.width / this.navigator.width,
         y: 0
      };
   }

   get scale() {
      
      return {
         x: 50,
         y: this.ratio
      }
   }

   update(data) {
      var map_items = [];
            
      for (let index = 0; index <= data.length; index++) {

         let rect = new Circle({
            x: index * this.scale.x,
            y: (index%2 ? 5 : this.height-5), //  * this.scale.y
            r: 5,
            color: 'rgba(0, 0, 0, 0.4)',
         });

         map_items.push(rect);
      }      
      
      this.data_element.children = map_items;
   }
}

