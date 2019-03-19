import { Scaffold, Observer } from 'core'
import { Position } from 'elements'
import Main from './main'
import Dates from './dates'
import Map from './map'
import localization from './localization'

// Язык
let locale_code = 'ru';
// Размер миникарты
var map_height = 50;
// Размер линии дат
var date_height = 35;
// Максимальный отступ сверху для графика
var main_padding_top = 40;

var defaultTheme = {
   background: '#fff',
   map_color1: 'rgba(205, 211, 236, 0.4)',
   map_color2: 'rgba(212, 220, 244, 0.28)',
   map_edge_width: 4,
   text_color1: '#99a4ac',
   text_size1: 12.5,
   text_color2: '#99a4ac',
   text_size2: 12,
   line_color: '#f2f4f5',
   lines_count: 5,
   animation_duration_1: 260,
   animation_duration_2: 260,
   animation_duration_3: 200,
   animation_duration_4: 220,
}

class LineChart {

   constructor(id, width, height, theme) {

      var themeObserver = this.themeObserver = new Observer();
      var hiddenColumnsObserver = this.hiddenColumnsObserver = new Observer();

      // Вычисляем размер графика
      var main_height = height - map_height - date_height;

      // Создаем миникарту
      this.map = new Map({width, map_height, main_height, main_padding_top, localization, locale_code, themeObserver, hiddenColumnsObserver});

      // Создаем индиктор дат
      this.dates = new Dates({animation_duration: 280, themeObserver});
      
      // Создаем график
      this.main = new Main({width, height: main_height, themeObserver, hiddenColumnsObserver});

      // Слушаем события миникарты и обновляем график и даты
      this.map.on('update', (data) => this.main.update(data))
      this.map.on('update', (data) => this.dates.update(data))

      this.scaffold = new Scaffold({
         id: id,
         width: width,
         height: height,
         background: theme.background,
         children: [
            new Position({
               children: [
                  this.main.element
               ]
            }),
            new Position({
               y: main_height + date_height/4,
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

      this.setTheme(theme || defaultTheme)
   }

   hideColumn(index) {
      this.hiddenColumnsObserver.broadcast(['hide', index]);
   }

   showColumn(index) {
      this.hiddenColumnsObserver.broadcast(['show', index]);
   }

   setData(data) {
      this.map.setData({columns: data.columns, colors: data.colors});
   }

   setTheme(theme) {
      for(let key in defaultTheme) {
         if (!theme[key]) {
            theme[key] = defaultTheme[key];
         }
      }
      
      this.scaffold.background = theme.background;
      this.themeObserver.broadcast(theme)
   }
}

export default LineChart;