import { Scaffold, Observer } from 'core'
import { Position, Rectangle } from 'elements'
import Main from './main'
import Dates from './dates.js'
import Map from './map'
import Checkboxes from './ckeckboxes.js'

// Размер миникарты
var map_height = 56;
// Размер линии дат
var date_height = 40;

var defaultTheme = {
   name: 'default',
   main_padding_top: 20,
   main_padding_bottom: 40,
   background: '#fff',
   map_color1: '#c0d1e1',
   map_color2: 'rgba(215, 228, 237, 0.5)',
   map_navigator_edge_width: 14,
   map_navigator_min_width: 20,
   map_padding_top: 5,
   map_padding_bottom: 5,
   font_family: 'Arial',
   text_color1: '#99a4ac',
   text_size1: 14,
   text_color2: '#99a4ac',
   text_size2: 14,
   line_color1: '#f2f4f5',
   line_color2: '#d2d2d2',
   lines_count: 6,
   animation_duration_1: 260,
   animation_duration_2: 260,
   animation_duration_3: 260,
   animation_duration_4: 260,
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
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      canvas.style.background = theme ? theme.background : defaultTheme.background

      width = width/100*120;
      height = height/100*120;

      let div = document.getElementById(id, hiddenColumnsObserver);
      div.appendChild(canvas);

      var localeObserver = this.localeObserver = new Observer();
      var themeObserver = this.themeObserver = new Observer();
      var hiddenColumnsObserver = this.hiddenColumnsObserver = new Observer();

      // Вычисляем размер графика
      var main_height = height - map_height - date_height;

      // Создаем миникарту
      this.map = new Map({y: height-map_height, width, map_height, main_height, localeObserver, themeObserver, hiddenColumnsObserver});

      // Создаем индиктор дат
      // this.dates = new Dates({y: main_height + date_height/4, animation_duration: 280, localeObserver, themeObserver});
      
      // Создаем график
      this.main = new Main({canvas, width, height: main_height, localeObserver, themeObserver, hiddenColumnsObserver});

      // Чекбоксы
      this.checboxes = new Checkboxes(id, hiddenColumnsObserver)

      this.scaffold = new Scaffold({
         canvas,
         width,
         height,
         children: [
            // this.element2 = new Rectangle({
            //    color: 'rgba(234, 123, 123, 0.5)',
            //    y: 100,
            //    w: 500,
            //    h: 100,
            //    child: new Position({
            //       children: [
            //          this.element3 = new Rectangle({
            //             color: 'rgba(134, 223, 123, 0.5)',
            //             w: 300,
            //             h: 30,
            //             x: 0,
            //             y: 10
            //          })
            //       ]
            //    })
            // }),
            // this.main.element,
            // this.dates.element,
            this.map.element
         ]
      });

      // setInterval(() => {
      //    console.log('timer');
         
      //    this.element2.x += 3
      //    this.element3.x += 5
      //    this.scaffold.setNeedUpdate('init', true, 100);
      // }, 1000);

      this.map.on('update', (data) => {
         if (!this.init) {         
            this.init = true;
            this.scaffold.setNeedUpdate('init', true, 100);
         }

         this.main.update(data)
         // this.dates.update(data)
      })

      this.main.columns.on('ready', () => {         
         this.scaffold.setNeedUpdate('columns_ready', true, 100);
      })

      this.setTheme(theme || defaultTheme)
      this.setLocale(locale || LineChart.en)
   }

   setData(data) {      
      this.map.setData({columns: data.columns, colors: data.colors, names: data.names});
      this.checboxes.setData({columns: data.columns, colors: data.colors, names: data.names});
      this.scaffold.setNeedUpdate('set_data', true, 100);
   }

   setTheme(theme) {
      for(let key in defaultTheme) {
         if (!theme[key]) {
            theme[key] = defaultTheme[key];
         }
      }
      
      this.themeObserver.broadcast(theme)
      this.scaffold.setNeedUpdate('theme', true, 100);
      this.scaffold.canvas.style.background = theme.background;
   }

   setLocale(locale) {      
      this.localeObserver.broadcast(locale)
      this.scaffold.setNeedUpdate('locale', true, 100)
   }
}

export default LineChart;