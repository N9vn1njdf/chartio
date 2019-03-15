import { Scaffold } from 'core'
import { Position } from 'elements'
import Main from './main'
import Dates from './dates'
import Map from './map'

class LineChart {

   constructor(id, width, height) {

      var map_height = 50;                // размер миникарты
      var main_height = 200;              // размер графика
      var ratio = map_height/main_height; // соотношение

      // Создаем миникарту  
      this.map = new Map({width, height: map_height, ratio});

      // Создаем индиктор дат  
      this.dates = new Dates({width, height: map_height, ratio});
      
      // Создаем график
      this.main = new Main({height: main_height});

      // Слушаем события миникарты и обновляем график и даты
      this.map.on('update', ({offset, scale}) => {         
         this.main.offset = this.dates.offset = offset;
         this.main.scale = this.dates.scale = scale;
      })

      new Scaffold({
         id: id,
         width: width,
         height: height,
         children: [
            new Position({
               y: 20,
               children: [
                  this.main.element
               ]
            }),
            new Position({
               y: this.main.element.h + 30,
               children: [
                  this.dates.element
               ]
            }),
            new Position({
               y: height-map_height,
               children: [
                  this.map.element
               ]
            }),
         ]
      });
   }

   setData(data) {
      this.main.data = data;
      this.dates.data = data;
      this.map.data = data;
   }
}

export default LineChart;