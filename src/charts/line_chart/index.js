import { Scaffold } from 'core'
import { Position } from 'elements'
import Main from './main'
import YInformer from './y_informer'
import Dates from './dates'
import Map from './map'
import localization from './localization'

let locale_code = 'ru';

class LineChart {

   constructor(id, width, height) {

      // Размер миникарты
      var map_height = 50;
      // Размер линии дат
      var date_height = 40;
      // Максимальный отступ сверху для графика
      var main_padding_top = 40;
      // Размер графика
      var main_height = height - map_height - date_height;

      // Создаем миникарту
      this.map = new Map({width, map_height, main_height, main_padding_top});

      // Создаем индиктор дат
      this.dates = new Dates({font_size: 12.5, item_width: 70, animation_duration: 200, localization, locale_code});
      
      // Создаем график
      this.main = new Main({width, height: main_height});

      // Создаем индикатор оси Y
      this.y_informer = new YInformer({width, height: main_height});

      // Слушаем события миникарты и обновляем график и даты
      this.map.on('update', ({offset, scale}) => {
         this.main.offset = this.y_informer.offset = this.dates.offset = offset;
         this.main.scale = this.y_informer.scale = this.dates.scale = scale;
      })

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
      this.main.hideColumn(index);
      this.y_informer.hideColumn(index);
      this.map.hideColumn(index);
   }

   showColumn(index) {
      this.main.showColumn(index);
      this.y_informer.showColumn(index);
      this.map.showColumn(index);
   }

   setData(data) {
      var y = data.columns.splice(1, data.columns.length);
      
      this.main.setData({columns: y, colors: data.colors});
      this.y_informer.setData(y);
      this.dates.setData(data.columns[0]);
      this.map.setData({columns: y, colors: data.colors});
   }
}

export default LineChart;