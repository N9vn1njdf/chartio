import { Scaffold } from 'core'
import { MainLayer, MapLayer, NavigatorLayer } from './layers'

class LineChart {

   constructor(id, width, height) {      
      LineChart.data = [];

      MapLayer.init({width, height: 50, y: height-50});
      MainLayer.init({height: 220});

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
      LineChart.data = data;
      MainLayer.update(LineChart.data);
      MapLayer.update(LineChart.data);
   }
}

export default LineChart;