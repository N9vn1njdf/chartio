import { Rectangle } from 'elements'
import { NavigatorObserver } from '../observers'

export default class Navigator {

   static init({width, height}) {
      Navigator.width = 300;//window.map_width;
      
      var x = width-Navigator.width;

      var left = new Rectangle({w: x, h: height, color: 'rgba(0, 255, 0, 0.1)'});
      var right = new Rectangle({x: x+Navigator.width, w: width, h: height, color: 'rgba(0, 255, 0, 0.1)'});
      Navigator._navigator = new Rectangle({x: x, w: Navigator.width, h: height, draggable: {x: true, y: false}});
      
      Navigator._navigator.$on('dragging', (mouse) => {
         left.w = Navigator._navigator.x;
         right.x = Navigator._navigator.x + Navigator.width;

         NavigatorObserver.broadcast();
      });

      Navigator.element = new Rectangle({
         w: width,
         h: height,
         children: [
            left,
            Navigator._navigator,
            right,
         ]
      });
   }

   static get offset() {
      return Navigator._navigator.x;
   }
}