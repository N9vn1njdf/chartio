import { Scaffold } from 'core'
import { MainLayer, MapLayer } from './layers'
import { ChartDataObserver } from './observers'

class LineChart {

   constructor(id, width, height) {      
      MapLayer.init({width, height: 50, y: height-50});
      MainLayer.init({width, height: 220});

      new Scaffold({
         id: id,
         width: width,
         height: height,
         children: [
            MainLayer.element,
            MapLayer.element,
         ]
      });
   }

   setData(data) {      
      ChartDataObserver.broadcast(data);
   }
}

export default LineChart;