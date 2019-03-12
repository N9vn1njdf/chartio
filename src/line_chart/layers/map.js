import { Circle, Rectangle } from 'elements'
import Main from './main.js'
import Navigator from './navigator.js';
import { ChartDataObserver, NavigatorObserver } from '../observers'

export default class Map {

   static init({width, height, y}) {
      Map.width = width;
      Map.data = data;

      Navigator.init({width, height});

      Map._data_map = new Rectangle({w: width, h: height});
      Map.element = new Rectangle({
         y: y,
         w: width,
         h: height,
         color: "rgba(110, 110, 100, 0.1)",
         children: [
            Map._data_map,
            Navigator.element,
         ]
      });

      ChartDataObserver.subscribe((data) => {         
         Map.data = data;
         Map.update(data);
      })

      NavigatorObserver.subscribe(() => {

      });
   }

   static get scale() {
      let y = !Main.element ? 0 : Map.element.h/Main.element.h
      return {
         x: 50,
         y: y
      }
   }

   static update(data) {
      var children = [];
            
      for (let index = 0; index <= data.length; index++) {

         let rect = new Circle({
            x: index * Map.scale.x,
            y: (index%2 ? 55 : 170) * Map.scale.y,
            r: 5,
            color: 'rgba(0, 0, 0, 0.4)',
         });

         children.push(rect);
      }      
      
      Map._data_map.children = children;
   }
}

