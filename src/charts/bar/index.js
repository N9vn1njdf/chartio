import { Chart } from 'core'
import { Checkboxes, Hover, YAxis, Lines, Dates } from 'components'
import BarColumns from './bar_columns.js'
import BarMap from './bar_map.js'

export default class BarChart extends Chart {

   get darkTheme() {
      return {
         name: 'dark',
         background: '#242f3e',

         main_padding: 20,
         main_margin: 25,
         main_animation_duration: 340,

         map_height: 56,
         map_padding: 2,
         map_margin: 20,
         map_animation_duration: 340,

         dates_height: 46,
         dates_animation_duration: 80,
         dates_text_color: '#99a4ac',

         map_color1: '#56626D',
         map_color2: 'rgba(48, 66, 89, 0.6)',
         map_navigator_edge_width: 14,
         map_navigator_min_width: 2,

         font_family: 'Arial',
         text_color1: '#99a4ac',
         text_size1: 14,
         text_size2: 14,

         lines_color: 'rgba(255, 255, 255, 0.1)',
         lines_count: 6,
         lines_animation_duration: 340,
      }
   }

   get defaultTheme() {
      return {
         name: 'default',
         background: '#fff',

         main_padding: 20,
         main_margin: 25,
         main_animation_duration: 340,

         map_height: 56,
         map_padding: 2,
         map_margin: 20,
         map_animation_duration: 340,

         dates_height: 46,
         dates_animation_duration: 80,
         dates_text_color: '#99a4ac',

         map_color1: '#C0D1E1',
         map_color2: 'rgba(226, 238, 249, 0.6)',
         map_navigator_edge_width: 14,
         map_navigator_min_width: 2,

         font_family: 'Arial',
         text_color1: '#99a4ac',
         text_size1: 14,
         text_size2: 14,

         lines_color: 'rgba(24, 45, 59, 0.1)',
         lines_count: 6,
         lines_animation_duration: 340,
      }
   }

   get defaultLocale() {
      return {
         month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
         day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
   }

   get ruLocale() {
      return {
         month: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
         day: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      }
   }

   $onCreate(theme, locale) {
      this.columns = new BarColumns()
      
      this.hover = new Hover({showCircles: false})
      this.hover.on('move', (index) => this.columns.onMove(index))
      this.hover.on('leave', () => this.columns.onLeave())

      // Индиктор дат
      this.dates = new Dates()

      // Текст по вертикальной оси
      this.y_axis = new YAxis()

      // Горизонтальный линии
      this.lines = new Lines()

      // Миникарта
      this.map = new BarMap()
      this.map.on('update', (data) => {
         this.columns.onMapUpdate(data)
         this.hover.onMapUpdate(data)
         this.lines.onMapUpdate(data);
         this.dates.onMapUpdate(data)
         this.y_axis.onMapUpdate(data)
      })

      // Чекбоксы
      this.checkboxes = new Checkboxes()
   }

   $onCreated(theme, locale) {}

   get components() {
      return [
         this.lines,
         this.columns,
         this.hover,
         this.y_axis,
         this.dates,
         this.map,
         this.checkboxes
      ]
   }
}