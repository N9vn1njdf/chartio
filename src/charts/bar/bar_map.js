import { Component, Animation, Curves } from 'core'
import { Rectangle, Position } from 'elements'
import { Map } from 'components'

export default class BarMap extends Map {
 
   startAnimate([type, column_index]) {
      this.columns.children.forEach(group => {
         for (let i = 0; i < group.children.length; i++) {
            let bar = group.children[i]

            let new_y = this.vertical_offset - bar.column_value * this.scale.y
            let column_height = bar.column_index > 0 ? this.columns.children[bar.column_index-1].children[bar.index].new_h : 0
            
            if (this.$hidden_columns.includes(bar.column_index-1)) {
               column_height = 0
            }

            bar.old_y = bar.y
            bar.new_y = new_y - column_height
            bar.offset_y = bar.new_y - bar.old_y

            bar.old_h = bar.h
            bar.new_h = this.map_height - new_y
            bar.offset_h = bar.new_h - bar.old_h
         }
      })
   }

   // type: 1 - показать, 0 скрыть
   animate(progress, [type, column_index]) {
      this.columns.children.forEach(group => {
         
         for (let i = 0; i < group.children.length; i++) {
            let bar = group.children[i]

            if (bar.column_index == column_index) {
               bar.alpha = type == 0 ? 1 - progress : progress
            }

            bar.y = bar.offset_y * progress + bar.old_y
            bar.h = bar.offset_h * progress + bar.old_h
         }
      })
   }

   createColumns() {
      let children = []

      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i]

         let group = new Position()
         let lines = []

         for (let i = 1; i < column.length; i++) {
            if (!column[i+1]) {
               break;
            }

            let x = (i-1) * this.scale.x
            
            let y =  this.vertical_offset - column[i] * this.scale.y
            let h = this.map_height - y
            let column_height = children[c_i-1] ? children[c_i-1].children[i-1].h : 0

            let bar = new Rectangle({
               color: this.$colors[column[0]],
               x,
               w: i * this.scale.x - x,
               y: y - column_height,
               h: h
            })

            bar.column_index = c_i
            bar.column_value = column[i]
            bar.index = i-1

            lines.push(bar)
         }
         
         group.children = lines
         children.push(group)
      }
      
      return children
   }

   calcMapYScale() {
      let items = []

      for (let n in this.$visible_columns) {
         let c_i = this.$visible_columns[n]

         for (let i = 0; i < this.$columns[c_i].length; i++) {
            if (items[i] == null) {
               items[i] = 0
            }
            items[i] += this.$columns[c_i][i]
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
               visible_items.push(this.$columns[c][i])
            }
         }
      }

      if (visible_items.length > 0) {
         let min_max = this.getMinMaxY(visible_items)
         
         this.main_scale_y = (this.main_height-50)/(min_max.max)
         this.main_offset_y = this.main_scale_y * 10
      } else {
         this.main_scale_y = 0
      }
      
      this.emit('update', this.update_data)
   }
}