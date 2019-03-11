import { Circle, Rectangle } from 'elements'
import Navigator from './navigator.js'
import { NavigatorObserver } from '../observers'

var data_count = 35;

export default class Main {

   static init({height}) {
      Main.element = new Rectangle({
         x: Navigator.element.x*-3.569, 
         y: 66, 
         w: 0, 
         h: height,
         color: 'rgba(0, 255, 0, 0.2)',
         children: []
      });

      Main._handleEvents();
   }

   static _handleEvents() {
      NavigatorObserver.subscribe(navigator => {
         Main.element.x = navigator.x*-3.569;
      })
   }

   static update(data) {
      var children = [];

      for (let index = 0; index <= data.length; index++) {
         let rect = new Circle({
            x: index*55,
            y: (index%2 ? 55 : 170),
            r: 10,
            color: 'rgba(0, 0, 0, 0.4)',
         });         
         children.push(rect);
      }

      Main.element.children = children;
      Main.element.w = Main.element.children.length*60
   }
}