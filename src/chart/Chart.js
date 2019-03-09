import Core from './Core.js'
import { Rect } from './objects'

class Chart {

   constructor(id, width, height) {
      var chart = new Core(id, {width: width, height: height});
      

      var rect2 = new Rect(150, 150, 200, 200, {
         color: "rgba(0, 255, 0, 0.2)"
      });
      chart.add(rect2);


      var rect = new Rect(100, 100, 200, 200, {
         color: "rgba(255, 0, 0, 0.2)",
      });
      rect.$on('move', (mouse) => {
         rect.color = 'rgba(255, 0, 0, 0.4)';         
         if (mouse.down) {
            rect.color = 'rgba(255, 0, 0, 1)';
         }
      });
      rect.$on('leave', (mouse) => {
         rect.color = 'rgba(255, 0, 0, 0.2)';
      });
      chart.add(rect);


      var rect3 = new Rect(200, 50, 200, 200, {
         color: "rgba(0, 0, 255, 0.2)"
      });
      chart.add(rect3);


      return chart;
   }
}

export default Chart