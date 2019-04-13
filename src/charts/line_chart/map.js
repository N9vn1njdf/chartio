import { Component, Animation } from 'core'
import { LinesGroup, Line, Rectangle, Position } from 'elements'
import { Navigator } from 'components'

export default class Map extends Component {
   
   /**
    * @override
    */
   $onTheme(theme) {
      this.padding = theme.map_padding
      this.animation.duration = theme.animation_duration_4
   }

   /**
    * @override
    */
   $onData({dates, columns, colors, names}) {
      this.calcMapYScale()
      this.calcMapVerticalOffset()
      this.createLines()
      this.calcMainYScale()
   }

   /**
    * @override
    */
   $onHideColumn(index) {
      this.calcMapYScale()
      this.calcMainYScale()
      this.calcMapVerticalOffset()
      this.animation.run([0, index])
   }

   /**
    * @override
    */
   $onShowColumn(index) {
      this.calcMapYScale()
      this.calcMainYScale()
      this.calcMapVerticalOffset()
      this.animation.run([1, index])
   }

   /**
    * @override
    */
   $build(theme, locale) {
      this.animation = new Animation({
         component: this,
         duration: theme.animation_duration_4,
         curve: (time_fraction) => Math.pow(time_fraction, 1),
         onStart: this.startAnimate,
         handle: this.animate
      })

      this.map_height = theme.map_height
      this.padding = theme.map_padding

      this.main_height = this.$canvas.height - theme.map_height - theme.date_height - theme.main_padding
      
      this.navigator = new Navigator()
      this.navigator.on('update', () => this.calcMainYScale())

      this.lines_groups = new Position()
      this.$onTheme(theme)
      
      return new Rectangle({
         // clip: true,
         x: theme.map_margin,
         y: this.$canvas.height - theme.map_height,
         w: this.$canvas.width,
         h: this.map_height,
         child: new Position({
            children: [
               this.lines_groups,
               this.navigator,
            ]
         }),
      })
   }

   startAnimate([type, column_index]) {
      this.lines_groups.children.forEach(lines_group => {
         for (let i = 0; i < lines_group.children.length; i++) {
            let line = lines_group.children[i]
            let line2 = lines_group.children[i+1]

            line.old_y = line.y
            line.new_y = this.vertical_offset - line.column_value * this.scale.y
            line.offset_y = line.new_y - line.y
           
            if (line2) {
               line.old_y2 = line.y2
               line.new_y2 =  this.vertical_offset - line2.column_value * this.scale.y
               line.offset_y2 = line.new_y2 - line.y2
            }
         }
      })
   }

   // type: 1 - показать, 0 скрыть
   animate(progress, [type, column_index]) {
      this.lines_groups.children.forEach(lines_group => {
         
         for (let i = 0; i < lines_group.children.length; i++) {
            let line = lines_group.children[i]

            if (line.column_index == column_index) {
               line.alpha = type == 0 ? 1 - progress : progress
            }

            line.y = line.offset_y * progress + line.old_y

            if (line.offset_y2) {
               line.y2 = line.offset_y2 * progress + line.old_y2
            }
         }
      })
   }

   get update_data() {
      let main_scale_x = this.scale.x * (this.$canvas.width-this.$theme.main_margin*2) / this.navigator.scale

      return {
         offset: {
            x: -this.navigator.offset * (main_scale_x / this.scale.x),
            y: this.main_offset_y || 0
         },
         scale: {
            x: main_scale_x,
            y: this.main_scale_y,
         },
      }
   }

   get scale() {
      return {
         x: this.$columns[0] ? (this.$canvas.width-this.$theme.map_margin*2) / (this.$columns[0].length-2) : 0,
         y: this.map_scale_y
      }
   }

   createLines() {
      var children = []

      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i]

         let group = new LinesGroup({lineWidth: 1.5, color: this.$colors[column[0]]})
         let lines = []

         for (let i = 1; i < column.length; i++) {
            if (!column[i+1]) {
               break;
            }

            let y = column[i] * this.scale.y
            let y2 = column[i+1] ? column[i+1] * this.scale.y : y
            
            let child =  new Line({
               x: (i-1) * this.scale.x,
               y: this.vertical_offset - y,
               x2: i * this.scale.x,
               y2: this.vertical_offset - y2,
            })

            child.column_index = c_i
            child.column_value = column[i]

            lines.push(child)
         }
         
         group.children = lines
         children.push(group)
      }
      
      this.lines_groups.children = children
   }

   calcMapVerticalOffset() {
      this.vertical_offset = this.$theme.map_height + this.min_y * this.scale.y - this.padding
   }

   calcMapYScale() {
      let items = []

      for (let i in this.$visible_columns) {
         this.$columns[this.$visible_columns[i]].forEach(item => items.push(item))
      }
      
      if (items.length > 0) {
         let min_max = this.getMinMaxY(items)
         this.min_y = min_max.min
         this.map_scale_y = (this.$theme.map_height-this.padding*2)/(min_max.max - min_max.min)
         
      } else {
         this.map_scale_y = 0
      }
   }

   calcMainYScale() {
      var visible_items = []
      let s = this.scale.x * 2
      
      for (let c = 0; c < this.$columns.length; c++) {
         if (this.$hidden_columns.includes(c)) {
            continue
         }
         
         for (let i = 1; i < this.$columns[c].length; i++) {
            let item_x = (i-1) * this.scale.x
            
            if (this.navigator.offset < item_x + s && this.navigator.offset + this.navigator.scale > item_x - s) {
               visible_items.push(this.$columns[c][i])
            }
         }
      }

      if (visible_items.length > 0) {
         let min_max = this.getMinMaxY(visible_items)
         this.main_scale_y = this.main_height/(min_max.max - min_max.min)
         this.main_offset_y = this.main_scale_y * min_max.min    
      } else {
         this.main_scale_y = 0
      }
      
      this.emit('update', this.update_data)
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
}