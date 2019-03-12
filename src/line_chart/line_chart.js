import { Scaffold } from 'core'
import { MainLayer, MapLayer } from './layers'
import { Position } from 'elements'

class LineChart {

   constructor(id, width, height) {

      var map_height = 80;                // размер миникарты
      var main_height = 200;              // размер графика
      var ratio = map_height/main_height; // соотношение

      // Создаем миникарту  
      this.map = new MapLayer({width, height: map_height, ratio});

      // Получаем данные для начального позиционирования графика
      var offset = this.map.main_offset;
      var scale = this.map.main_scale;

      // Создаем график
      this.main = new MainLayer({height: main_height, offset, scale});

      // Слушаем события миникарты и обновляем график
      this.map.on('offset', value => this.main.offset = value)

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
      this.map.update(data);
      this.main.update(data);
   }
}

export default LineChart;