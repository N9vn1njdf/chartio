import { Component, Animation } from 'core'
import { LinesGroup, Line, Rectangle, Position } from 'elements'
import { Navigator } from 'components'

export default class Map extends Component {

   constructor({map_height, main_height}) {
      super()

      this.map_height = map_height
      this.padding = 0

      this.main_height = main_height
      this.main_padding_top = 0
      this.main_padding_bottom = 0

      this.main_scale_y = 1
      this.map_scale_y = 1

      this.animation = new Animation({
         component: this,
         duration: 200,
         curve: (time_fraction) => Math.pow(time_fraction, 1),
         onStart: this.startAnimate,
         handle: this.animate
      })
   }
   
   /**
    * @override
    */
   $onTheme(theme) {      
      this.main_padding_top = theme.main_padding_top
      this.main_padding_bottom = theme.main_padding_bottom

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
      // this.caclMainYScale()
   }

   /**
    * @override
    */
   $onHideColumn(index) {            
      this.calcMapYScale()
      this.calcMapVerticalOffset()
      this.animation.run([0, index])
   }

   /**
    * @override
    */
   $onShowColumn(index) {      
      this.calcMapYScale()
      this.calcMapVerticalOffset()
      this.animation.run([1, index])
   }

   /**
    * @override
    */
   $build(theme, locale) {
      this.navigator = new Navigator(this.map_height)
      this.navigator.on('update', () => this.caclMainYScale())

      this.lines_groups = new Position()
      this.$onTheme(theme)
      
      return new Rectangle({
         // clip: true,
         y: this.$canvas.height - this.map_height,
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

   get main_offset() {
      return {
         x: -this.navigator.offset * ((this.scale.x * this.$canvas.width / this.navigator.scale) / this.scale.x),
         y: this.main_offset_y || 0
      }
   }

   get main_scale() {
      return {
         x: this.scale.x * (this.$canvas.width-5) / this.navigator.scale,
         y: this.main_scale_y,
      }
   }

   get update_data() {
      return {
         offset: this.main_offset,
         scale: this.main_scale,
      }
   }

   get scale() {      
      return {
         x: this.data_count > 0 ? this.$canvas.width/this.data_count : 0,
         y: this.map_scale_y
      }
   }

   get data_count() {
      return this.$columns[0] ? this.$columns[0].length-2 : 0
   }

   createLines() {
      var children = []

      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i]

         let group = new LinesGroup({lineWidth: 1.5, color: this.$colors[column[0]]})
         let lines = []

         for (let i = 1; i < column.length; i++) {
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
      this.vertical_offset = this.map_height + this.min_y * this.scale.y - this.padding
   }

   calcMapYScale() {
      let items = []

      for (let i in this.$visible_columns) {         
         this.$columns[this.$visible_columns[i]].forEach(item => items.push(item))
      }
      
      if (items.length > 0) {         
         let min_max = this.getMinMaxY(items)
         this.min_y = min_max.min
         this.map_scale_y = (this.map_height-this.padding*2)/(min_max.max - min_max.min)
         
      } else {
         this.map_scale_y = 0         
      }
   }

   caclMainYScale() {
      if (!this.scale) {
         return
      }

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

      let min_max = this.getMinMaxY(visible_items)

      this.main_scale_y = (this.main_height-this.main_padding_top-this.main_padding_bottom)/(min_max.max - min_max.min)
      this.main_offset_y = this.main_scale_y * min_max.min

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