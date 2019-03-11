import { Circle, Rectangle } from 'elements'
import Main from './main.js'
import { NavigatorObserver } from '../observers'
import NavigatorLayer from './navigator.js';

export default class Map {

   static init({width, height, y}) {
      NavigatorLayer.init({width, height, x: 100});

      Map._wrap = new Rectangle({
         x: 0,
         y: 0,
         w: width,
         h: height,
         children: []
      });
      

      Map.element = new Rectangle({
         x: 0,
         y: y,
         w: width,
         h: height,
         color: "rgba(110, 110, 100, 0.1)",
         children: [
            Map._wrap,
            NavigatorLayer.element,
         ]
      });

      Map._handleEvents();
   }

   static _handleEvents() {
      NavigatorObserver.subscribe(navigator => {
         Main.element.x = navigator.x*-3.569;
      })
   }

   static update(data) {
      var children = [];
      var d = 1;
      
      var coef_y = Map.element.h/Main.element.h;
      
      for (let index = 0; index < data.length; index++) {
         let rect = new Circle({
            x: (index*55)*d,
            y: (index%2 ? 55 : 170)*coef_y,
            r: 5,
            color: 'rgba(0, 0, 0, 0.4)',
         });
         children.push(rect);
      }      
      
      Map._wrap.children = children;
   }
}

