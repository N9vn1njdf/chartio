import { Component, Animation, Curves } from 'core'
import { LinesGroup, Line, Rectangle, Position } from 'elements'
import { Navigator } from 'components'

export default class Map extends Component {
   
   /**
    * @override
    */
   $onTheme(theme) {
      this.padding = theme.map_padding
      this.animation.duration = theme.map_animation_duration

      this.map_height = theme.map_height
      this.map_width = this.$canvas.width - this.$theme.map_margin * 2

      this.main_height = this.$canvas.height - theme.map_height - theme.dates_height - theme.main_padding
      this.main_width = this.$canvas.width - this.$theme.main_margin * 2
   }

   /**
    * @override
    */
   $onData({dates, columns, colors, names}) {
      this.calcMapYScale()
      this.calcMapVerticalOffset()
      this.columns.children = this.createColumns()

      if (this.needMainUpdate) {
         this.calcMainYScale()
      }
   }

   /**
    * @override
    */
   $onHideColumn(index) {
      this.prev_update_data = null
      this.calcMapYScale()
      this.calcMapVerticalOffset()

      if (this.needMainUpdate) {
         this.calcMainYScale()
      }
      this.animation.run([true, index])
   }

   /**
    * @override
    */
   $onShowColumn(index) {
      this.prev_update_data = null
      this.calcMapYScale()
      this.calcMapVerticalOffset()

      if (this.needMainUpdate) {
         this.calcMainYScale()
      }
      this.animation.run([false, index])
   }

   /**
    * @override
    */
   $build(theme, locale) {
      this.animation = new Animation({
         component: this,
         duration: theme.map_animation_duration,
         curve: Curves.easeOutCubic,
         onStart: this.startAnimate,
         handle: this.animate
      })
      
      this.navigator = new Navigator()
      this.navigator.on('update', () => {
         if (this.needMainUpdate) {
            this.calcMainYScale()
         }
      })

      this.columns = new Position()
      this.$onTheme(theme)
      
      return new Rectangle({
         // clip: true,
         x: theme.map_margin,
         y: this.$canvas.height - theme.map_height,
         w: this.$canvas.width,
         h: this.map_height,
         child: new Position({
            children: [
               this.columns,
               this.navigator,
            ]
         }),
      })
   }

   get update_data() {
      let main_scale_x = this.scale.x * this.main_width / this.navigator.scale      
      return {
         offset: {
            x: -this.navigator.offset * (main_scale_x / this.scale.x),
            y: this.main_offset_y || 0
         },
         scale: {
            x: main_scale_x,
            y: this.main_scale_y,
            is_full: this.navigator.scale == this.map_width
         },
      }
   }

   get scale() {
      return {
         x: this.$columns[0] ? this.map_width / (this.$columns[0].length-2) : 0,
         y: this.map_scale_y
      }
   }
   
   get needMainUpdate() {
      // Если не было фактических обновлений, то не пересчитывать данные
      if (
         this.prev_update_data
         && this.prev_update_data.offset.x == this.update_data.offset.x
         && this.prev_update_data.offset.y == this.update_data.offset.y
         && this.prev_update_data.scale.x == this.update_data.scale.x
         && this.prev_update_data.scale.y == this.update_data.scale.y
         && this.prev_map_scale.y == this.scale.y
      ) {
         return false
      }

      this.prev_update_data = this.update_data
      this.prev_map_scale = this.scale

      return true
   }

   getMinMaxY(items) {
      let min = items.length == 0 ? 0 : items[items.length-1]
      let max = 0

      items.forEach(element => {
         max = element > max ? element : max
         min = element < min ? element : min
      })

      return {min, max}
   }

   calcMapVerticalOffset() {
      this.vertical_offset = this.$theme.map_height + this.min_y * this.scale.y - this.padding
   }

   startAnimate([hide, column_index]) {}

   /**
    * Переход к новому состоянию 
    */
   animate(progress, [hide, column_index]) {}

   /**
    * Создает содержимое миникарты
    */
   createColumns() {}

   calcMapYScale() {}

   calcMainYScale() {}
}