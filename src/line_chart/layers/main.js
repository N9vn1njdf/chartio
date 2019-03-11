import { Circle, Rectangle } from 'elements'
import Map from './map.js'
import { MapObserver } from '../observers'

export default class Main {

   static init({height}) {      
      Main.element = new Rectangle({x: Map.offset*-window.move_coef, y: 66, h: height});
      
      Main._handleEvents();
   }

   static _handleEvents() {
      MapObserver.subscribe(({offset}) => {
         Main.element.x = offset*-window.move_coef;
      })
   }

   static update(data) {
      var d = window.main_d;

      var children = [];
      for (let index = 0; index <= data.length; index++) {
         let rect = new Circle({
            x: index*d,
            y: (index%2 ? 55 : 170),
            r: 10,
            color: 'rgba(0, 0, 0, 0.4)',
         });         
         children.push(rect);
      }

      Main.element.children = children;
      Main.element.w = Main.element.children.length*93
   }
}