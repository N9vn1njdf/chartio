import { Scaffold } from 'core'
import { Position } from 'elements'
import Main from './main'
import YInformer from './y_informer'
import Dates from './dates'
import Map from './map'
import localization from './localization'


// Текущий язык
let locale_code = 'ru';
// Размер миникарты
var map_height = 50;
// Размер линии дат
var date_height = 40;
// Максимальный отступ сверху для графика
var main_padding_top = 40;


class LineChart {

   constructor(id, width, height) {

      // Вычисляем размер графика
      var main_height = height - map_height - date_height;

      // Создаем миникарту
      this.map = new Map({width, map_height, main_height, main_padding_top, localization, locale_code});

      // Создаем индиктор дат
      this.dates = new Dates({font_size: 12.5, item_width: 70, animation_duration: 150});
      
      // Создаем график
      this.main = new Main({width, height: main_height});

      // Создаем индикатор оси Y
      this.y_informer = new YInformer({width, height: main_height});

      // Слушаем события миникарты и обновляем график и даты
      this.map.on('update', (data) => this.main.update(data))
      this.map.on('update', (data) => this.y_informer.update(data))
      this.map.on('update', (data) => this.dates.update(data))

      new Scaffold({
         id: id,
         width: width,
         height: height,
         children: [
            new Position({
               children: [
                  this.y_informer.element,
                  this.main.element
               ]
            }),
            new Position({
               y: this.main.element.h + date_height/4,
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

   hideColumn(index) {
      this.map.hideColumn(index);
   }

   showColumn(index) {
      this.map.showColumn(index);
   }

   setData(data) {
      this.map.setData({columns: data.columns, colors: data.colors});
   }
}

export default LineChart;