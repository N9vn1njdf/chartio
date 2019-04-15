import { Component, Animation, Curves } from 'core'
import { LinesGroup, Line, Rectangle, Position } from 'elements'
import { Map } from 'components'

export default class BarMap extends Map {
 
   startAnimate([type, column_index]) {
      this.columns.children.forEach(lines_group => {
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
      this.columns.children.forEach(lines_group => {
         
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

   createColumns() {
      let children = []
      let column_h = []

      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i]

         let group = new Position()
         let lines = []

         for (let i = 1; i < column.length; i++) {
            if (!column[i+1]) {
               break;
            }

            let x = (i-1) * this.scale.x
            // let prev_h = column_h[c_i-1] ? column_h[c_i-1][i] : 0
            
            let y =  this.vertical_offset - column[i] * this.scale.y
            let h = this.map_height - y

            let bar = new Rectangle({
               alpha: 0.5,
               color: this.$colors[column[0]],
               x,
               w: i * this.scale.x - x,
               y: y,
               h: h
            })

            // if (!column_h[c_i]) {
            //    column_h[c_i] = []
            // }
            // column_h[c_i][i] = h

            bar.column_index = c_i
            bar.column_value = column[i]

            lines.push(bar)
         }
         
         group.children = lines
         children.push(group)
      }
      
      return children
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
      let s = 10
      
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
         this.main_scale_y = (this.main_height-50)/(min_max.max - min_max.min)
         this.main_offset_y = this.main_scale_y * min_max.min - 10
      } else {
         this.main_scale_y = 0
      }
      
      this.emit('update', this.update_data)
   }
}