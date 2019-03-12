import { Circle, Rectangle } from 'elements'
import Map from './map.js'
import Navigator from './navigator.js'
import { ChartDataObserver, NavigatorObserver } from '../observers'

export default class Main {

   static init({width, height}) {
      Main.data = [];

      Main.element = new Rectangle({x: Main.offset, y: 66, h: height});

      Main._handleEvents();
   }

   static _handleEvents() {
      ChartDataObserver.subscribe((data) => {
         Main.data = data;
         Main.update(data);
      })

      NavigatorObserver.subscribe(() => {
         Main.element.x = Main.offset;
      })
   }

   static get offset() {
      return Navigator.offset * -(Main.scale.x/Map.scale.x);
   }

   static get scale() {
      return {
         x: Map.scale.x * Map.width / Navigator.width,
         y: 1
      }
   }

   static update(data) {
      var children = [];
      
      for (let index = 0; index <= data.length; index++) {

         let rect = new Circle({
            x: index * Main.scale.x,
            y: index % 2 ? 55 : 170,
            r: 10,
            color: 'rgba(0, 0, 0, 0.4)',
         });

         children.push(rect);
      }

      Main.element.children = children;
      Main.element.w = Main.element.children.length*100;
      Main.element.x = Main.offset;
   }
}