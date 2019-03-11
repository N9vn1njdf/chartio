import { Rectangle } from 'elements'
import { NavigatorObserver } from '../observers'

export default class Navigator {

   static init({width, height, x}) {
      Navigator.element_width = 180;


      var left = new Rectangle({
         w: x,
         h: height,
         color: 'rgba(0, 255, 0, 0.1)',
         children: []
      });
      var right = new Rectangle({
         x: x+Navigator.element_width,
         w: width,
         h: height,
         color: 'rgba(0, 255, 0, 0.1)',
         children: []
      });


      let element = new Rectangle({
         x: x,
         w: Navigator.element_width,
         h: height,
         draggable: {x: true, y: false},
         
      }).$on('dragging', (mouse) => {
         left.w = element.x;
         right.x = element.x + Navigator.element_width;
         NavigatorObserver.broadcast(element);
      })


      Navigator.element = new Rectangle({
         w: width,
         h: height,
         children: [
            left,
            element,
            right,
         ]
      });
   }
}