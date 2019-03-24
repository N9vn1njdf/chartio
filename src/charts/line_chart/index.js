import { Scaffold, Observer } from 'core'
import { Position } from 'elements'
import Main from './main'
import Dates from './dates.js'
import Map from './map'
import Checkboxes from './ckeckboxes.js'

// Размер миникарты
var map_height = 50;
// Размер линии дат
var date_height = 35;

var defaultTheme = {
   main_padding_top: 40,
   main_padding_bottom: 40,
   background: '#fff',
   map_color1: 'rgba(205, 211, 236, 0.4)',
   map_color2: 'rgba(212, 220, 244, 0.28)',
   map_edge_width: 4,
   map_padding_top: 5,
   map_padding_bottom: 5,
   font_family: 'Arial',
   text_color1: '#99a4ac',
   text_size1: 12.5,
   text_color2: '#99a4ac',
   text_size2: 12,
   text_color3: '#000',
   text_size3: 14,
   line_color1: '#f2f4f5',
   line_color2: '#d2d2d2',
   lines_count: 6,
   animation_duration_1: 260,
   animation_duration_2: 260,
   animation_duration_3: 200,
   animation_duration_4: 220,
}

class LineChart {

   static get ru() {
      return {
         month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
         day: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      }
   }

   static get en() {
      return {
         month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
   }

   constructor(id, width, height, {locale, theme}) {
      let canvas = document.createElement('canvas');
      let div = document.getElementById(id, hiddenColumnsObserver);
      div.appendChild(canvas);

      var localeObserver = this.localeObserver = new Observer();
      var themeObserver = this.themeObserver = new Observer();
      var hiddenColumnsObserver = this.hiddenColumnsObserver = new Observer();

      // Вычисляем размер графика
      var main_height = height - map_height - date_height;

      // Создаем миникарту
      this.map = new Map({width, map_height, main_height, localeObserver, themeObserver, hiddenColumnsObserver});

      // Создаем индиктор дат
      this.dates = new Dates({animation_duration: 280, localeObserver, themeObserver});
      
      // Создаем график
      this.main = new Main({canvas, width, height: main_height, localeObserver, themeObserver, hiddenColumnsObserver});

      // Слушаем события миникарты и обновляем график и даты
      this.map.on('update', (data) => this.main.update(data))
      this.map.on('update', (data) => this.dates.update(data))

      this.checboxes = new Checkboxes(id, themeObserver, hiddenColumnsObserver)

      let map_y = height-map_height;
      let dates_y = main_height + date_height/4;

      this.scaffold = new Scaffold({
         canvas,
         width,
         height,
         background: theme ? theme.background : defaultTheme.background,
         children: [
            new Position({
               children: [
                  this.main.element
               ]
            }),
            new Position({
               y: dates_y,
               children: [
                  this.dates.element
               ]
            }),
            new Position({
               y: map_y,
               children: [
                  this.map.element
               ]
            }),
         ]
      });

      this.map.on('update', () => {
         if (!this.init) {         
            this.init = true;
            this.scaffold.update(100);
         }
      })

      this.main.columns.on('ready', () => {         
         this.scaffold.update(100);
      })

      this.setTheme(theme || defaultTheme)
      this.setLocale(locale || LineChart.en)
   }

   setData(data) {      
      this.map.setData({columns: data.columns, colors: data.colors, names: data.names});
      this.checboxes.setData({columns: data.columns, colors: data.colors, names: data.names});
      this.scaffold.update(100);
   }

   setTheme(theme) {
      for(let key in defaultTheme) {
         if (!theme[key]) {
            theme[key] = defaultTheme[key];
         }
      }
      
      this.themeObserver.broadcast(theme)
      this.scaffold.update(100);
      this.scaffold.background = theme.background;
   }

   setLocale(locale) {      
      this.localeObserver.broadcast(locale)
      this.scaffold.update(100);
   }
}

export default LineChart;