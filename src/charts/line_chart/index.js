import { Chart } from 'core'
import { Position, Rectangle } from 'elements'
import Main from './main'
import Dates from './dates.js'
import Map from './map.js'
import Checkboxes from './ckeckboxes.js'

// Размер миникарты
var map_height = 56;
// Размер линии дат
var date_height = 40;

export default class LineChart extends Chart {

   get defaultTheme() {
      return {
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
   }

   constructor(id, width, height, {locale, theme}) {
      super(id, width, height, locale, theme)

      // Создаем индиктор дат
      // this.dates = new Dates({y: main_height + date_height/4, animation_duration: 280, localeObserver, themeObserver});
      
      // Создаем график
      // this.main = new Main({canvas, width, height: main_height, localeObserver, themeObserver, hiddenColumnsObserver});



      // this.map.on('update', (data) => {
      //    if (!this.init) {         
      //       this.init = true;
      //       this.scaffold.setNeedUpdate('init', true, 100);
      //    }

      //    // this.main.update(data)
      //    // this.dates.update(data)
      // })

      // this.main.columns.on('ready', () => {         
      //    this.scaffold.setNeedUpdate('columns_ready', true, 100);
      // })


   }

   $create(scaffold, theme, locale) {
      // Вычисляем размер графика
      var main_height = scaffold.height - map_height - date_height

      // Создаем миникарту
      this.map = new Map({map_height, main_height})

      // Чекбоксы
      this.checboxes = new Checkboxes(scaffold.id)
   }

   $created(theme, locale) {
      // this.scaffold.initComponent(this.checboxes)
   }

   get components() {
      return [
         // this.main.element,
         // this.dates.element,
         this.map,
         this.checboxes,
      ]
   }
}