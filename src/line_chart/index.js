import { Scaffold } from 'core'
import { Position } from 'elements'
import Main from './main'
import MiniMap from './map'

class LineChart {

   constructor(id, width, height) {

      var map_height = 60;                // размер миникарты
      var main_height = 200;              // размер графика
      var ratio = map_height/main_height; // соотношение

      // Создаем миникарту  
      this.map = new MiniMap({width, height: map_height, ratio});

      // Создаем график
      this.main = new Main({height: main_height});

      // Слушаем события миникарты и обновляем график
      this.map.on('offset', value => this.main.offset = value)
      this.map.on('scaling', ({offset, scale}) => {         
         this.main.offset = offset;
         this.main.scale = scale;
      })

      new Scaffold({
         id: id,
         width: width,
         height: height,
         children: [
            new Position({
               y: 54,
               children: [
                  this.main.element
               ]
            }),
            new Position({
               y: height-map_height,
               children: [
                  this.map.element
               ]
            })
         ]
      });
   }

   setData(data) {
      this.main.data = data;
      this.map.data = data;
   }
}

export default LineChart;