import { Rectangle, Position } from 'elements'
import { Map } from 'components'

export default class BarMap extends Map {

   startAnimate([hide, column_index]) {
      
      this.columns.children.forEach(group => {
         for (let i = 0; i < group.children.length; i++) {
            let bar = group.children[i]

            let new_y = this.vertical_offset - bar.column_value * this.scale.y

            if (hide == true && bar.column_index == column_index) {               
               bar.old_y = bar.y
               bar.new_y = bar.y
               bar.offset_y = bar.new_y - bar.old_y

               bar.old_h = bar.h
               bar.new_h = bar.h
               bar.offset_h = bar.new_h - bar.old_h
               
            } else {
               let column_height = this.getColumnHeight(bar.column_index, bar.index)

               bar.old_y = bar.y
               bar.new_y = new_y - column_height
               bar.offset_y = bar.new_y - bar.old_y

               bar.old_h = bar.h
               bar.new_h = this.map_height - new_y
               bar.offset_h = bar.new_h - bar.old_h
            }
         }
      })

   }

   animate(progress, [hide, column_index]) {
      this.columns.children.forEach(group => {
         
         for (let i = 0; i < group.children.length; i++) {
            let bar = group.children[i]

            if (bar.column_index == column_index) {
               bar.alpha = hide ? 1 - progress : progress
            }

            bar.y = bar.offset_y * progress + bar.old_y
            bar.h = bar.offset_h * progress + bar.old_h
         }
      })
   }

   createColumns() {
      let children = []

      for (let c = 0; c < this.$columns.length; c++) {
         let column = this.$columns[c]

         let group = new Position()
         let lines = []

         for (let i = 1; i < column.length; i++) {
            let x = (i-1) * this.scale.x
            let w = i * this.scale.x - x
            
            let y =  this.vertical_offset - column[i] * this.scale.y
            let h = this.map_height - y
            let column_height = this.getColumnHeight(c, i-1)

            let bar = new Rectangle({
               color: this.$colors[column[0]],
               x: x - w/2,
               w,
               y: y - column_height,
               h: h
            })

            bar.column_index = c
            bar.column_value = column[i]
            bar.index = i-1

            lines.push(bar)
         }
         
         group.children = lines
         children.push(group)
      }
      
      return children
   }

   getColumnHeight(column_index, value_index) {
      let result = 0

      for (let c = 0; c < column_index; c++) {
         if (this.$hidden_columns.includes(c)) {
            continue
         }
         result += this.$columns[c][value_index+1]
      }

      return result * this.scale.y
   }

   calcMapYScale() {
      let items = []

      for (let n in this.$visible_columns) {
         let c = this.$visible_columns[n]

         for (let i = 0; i < this.$columns[c].length; i++) {
            if (items[i] == null) {
               items[i] = 0
            }
            items[i] += this.$columns[c][i]
         }
      }

      this.min_y = 0

      if (items.length > 0) {
         let min_max = this.getMinMaxY(items)
         this.map_scale_y = (this.map_height-this.padding*2)/min_max.max
      } else {
         this.map_scale_y = 0
      }
   }

   calcMainYScale() {
      var visible_items = []
      let s = 10
      
      for (let c = 0; c < this.$columns.length; c++) {
         if (this.$hidden_columns.includes(c)) {
            continue
         }
         
         for (let i = 1; i < this.$columns[c].length; i++) {
            let item_x = (i-1) * this.scale.x

            if (this.navigator.offset < item_x + s && this.navigator.offset + this.navigator.scale > item_x - s) {
               if (visible_items[i] == null) {
                  visible_items[i] = 0
               }
               visible_items[i] += this.$columns[c][i]
            }
         }
      }

      this.main_offset_y = 0

      if (visible_items.length > 0) {
         let min_max = this.getMinMaxY(visible_items)
         this.main_scale_y = (this.main_height)/min_max.max
      } else {
         this.main_scale_y = 0
      }
      
      this.emit('update', this.update_data)
   }
}