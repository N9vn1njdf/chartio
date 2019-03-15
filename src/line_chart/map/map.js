import { Event } from 'core'
import { Circle, Rectangle } from 'elements'
import Navigator from './navigator.js'

export default class Map extends Event {

   constructor({width, height, ratio}) {
      super();

      this.width = width;
      this.height = height;
      this.ratio = ratio;

      this.navigator = new Navigator({width, height});
      this.navigator.on('offset', () => {
         this.emit('update', this.main_update_data);
      });
      this.navigator.on('scaling', () => {
         this.emit('update', this.main_update_data);
      });

      this.data_element = new Rectangle({w: width, h: height});
      
      this.element = new Rectangle({
         w: width,
         h: height,
         children: [
            this.data_element,
            this.navigator.element,
         ]
      });
   }

   get main_offset() {
      return -this.navigator.offset * ((this.scale.x * this.width / this.navigator.width) / this.scale.x)
   }

   get main_scale() {
      return {
         x: this.scale.x * this.width / this.navigator.width,
         y: 0
      };
   }
   
   get main_update_data() {
      return {
         offset: this.main_offset,
         scale: this.main_scale
      };
   }

   get scale() {
      return {
         x: this.data.length > 0 ? this.width/this.data.length : 0,
         y: this.ratio
      }
   }

   get data() {
      return this._data;
   }

   set data(value) {
      this._data = value;
      this.update(value);
   }

   update(data) {
      var children = [];

      for (let index = 0; index <= data.length; index++) {
         let rect = new Circle({
            x: index * this.scale.x,
            y: (index%2 ? 5 : this.height-5), //  * this.scale.y
            r: 5,
            color: 'rgba(0, 0, 0, 0.4)',
         });

         children.push(rect);
      }
      
      this.data_element.children = children;
      this.emit('update', this.main_update_data);
   }
}

