import { Chart } from 'core'
import Main from './main'
import Dates from './dates.js'
import Map from './map.js'
import { Checkboxes } from 'components'
import YAxis from './y_axis.js';

export default class LineChart extends Chart {

   get defaultTheme() {
      return {
         name: 'default',
         background: '#fff',

         main_padding: 10,
         main_margin: 25,
         main_animation_duration: 220,

         map_height: 56,
         map_padding: 2,
         map_margin: 20,
         map_animation_duration: 220,

         dates_height: 46,
         dates_animation_duration: 80,
         dates_text_color: '#99a4ac',

         map_color1: '#c0d1e1',
         map_color2: 'rgba(215, 228, 237, 0.5)',
         map_navigator_edge_width: 14,
         map_navigator_min_width: 1,

         font_family: 'Arial',
         text_color1: '#99a4ac',
         text_size1: 14,
         text_size2: 14,
         line_color1: '#f2f4f5',
         line_color2: '#d2d2d2',
         lines_count: 6,
         animation_duration_1: 220,
         animation_duration_2: 220,
      }
   }

   get defaultLocale() {
      return {
         month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
   }

   static get ruLocale() {
      return {
         month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
         day: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      }
   }

   $onCreate(theme, locale) {
      // График
      this.main = new Main()

      // Индиктор дат
      this.dates = new Dates()

      // Текст и линии по вертикальной оси
      this.y_axis = new YAxis()

      // Миникарта
      this.map = new Map()
      this.map.on('update', (data) => {
         this.main.onMapUpdate(data)
         this.dates.onMapUpdate(data)
         this.y_axis.onMapUpdate(data)
      })

      // Чекбоксы
      this.checboxes = new Checkboxes()
   }

   $onCreated(theme, locale) {}

   get components() {
      return [
         this.main,
         this.y_axis,
         this.dates,
         this.map,
         this.checboxes,
      ]
   }
}