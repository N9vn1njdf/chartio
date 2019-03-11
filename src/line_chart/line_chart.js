import { Scaffold } from 'core'
import { MainLayer, MapLayer } from './layers'

// изначальные
window.map_d = 50;

// var main_w = 1120; //вся ширина данных

// задает юзер
window.map_width = 300; // 200

// вычисляем
window.main_d = 100;  // 140
window.move_coef = 2; // 2.8

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