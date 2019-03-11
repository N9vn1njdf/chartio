import { Rectangle } from 'elements'
import { MapObserver } from '../observers'

export default class Navigator {

   static init({width, height, x}) {
      Navigator.element_width = window.map_width;
      
      var left = new Rectangle({w: x, h: height, color: 'rgba(0, 255, 0, 0.1)'});
      var right = new Rectangle({x: x+Navigator.element_width, w: width, h: height, color: 'rgba(0, 255, 0, 0.1)'});
      let element = new Rectangle({x: x, w: Navigator.element_width, h: height, draggable: {x: true, y: false}});
      
      element.$on('dragging', (mouse) => {
         left.w = element.x;
         right.x = element.x + Navigator.element_width;
         MapObserver.broadcast({offset: element.x});
      });

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