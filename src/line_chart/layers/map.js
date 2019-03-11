import { Circle, Rectangle } from 'elements'
import Main from './main.js'
import NavigatorLayer from './navigator.js';

export default class Map {

   static init({width, height, y}) {
      Map.offset = width-window.map_width;
      
      NavigatorLayer.init({width, height, x: Map.offset});
      Map._handleEvents();

      Map._data_map = new Rectangle({w: width, h: height});

      Map.element = new Rectangle({
         y: y,
         w: width,
         h: height,
         color: "rgba(110, 110, 100, 0.1)",
         children: [
            Map._data_map,
            NavigatorLayer.element,
         ]
      });
   }

   static _handleEvents() {

   }

   static update(data) {
      var children = [];

      var d = window.map_d;
      
      var coef_y = Map.element.h/Main.element.h;
      
      for (let index = 0; index <= data.length; index++) {
         let rect = new Circle({
            x: index*d,
            y: (index%2 ? 55 : 170)*coef_y,
            r: 5,
            color: 'rgba(0, 0, 0, 0.4)',
         });
         children.push(rect);
      }      
      
      Map._data_map.children = children;
   }
}

