import { Columns } from 'components'
import { Position, Rectangle } from 'elements'

export default class LineColumns extends Columns {

   /**
    * @override
    */
   createColumns() {
      let children = []
      let offset = this.height + this.offset.y
      
      for (let c = 0; c < this.$columns.length; c++) {
         let column = this.$columns[c]
         
         let group = new Position()
         let lines = []
         
         for (let i = 1; i < column.length; i++) {
            let x = (i-1) * this.scale.x
            let w = i * this.scale.x - x
            
            let y = offset - column[i] * this.scale.y
            let h = this.height - y
            let column_height = this.getColumnHeight(c, i-1)

            let bar = new Rectangle({
               alpha: 0.5,
               color: this.$colors[column[0]],
               x: x - w/2,
               w: w,
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

      this.columns.children = children
   }

   /**
    * @override
    */
   updateColumns() {
      let offset = this.height + this.offset.y
      
      this.columns.children.forEach(group => {
         group.children.forEach(bar => {            
            let x = bar.index * this.scale.x
            let w = (bar.index+1) * this.scale.x - x
            bar.x = x - w/2
            bar.w = w

            let new_y = offset - bar.column_value * this.scale.y
            let new_h = this.height - new_y


            if (this.animation_data[1] == bar.column_index) {
               bar.new_alpha = this.animation_data[0] ? 0.5 : 0
               bar.old_alpha = bar.alpha
               bar.alpha_fraction = bar.new_alpha - bar.alpha

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
               bar.offset_y = bar.new_y - bar.y
   
               bar.old_h = bar.h
               bar.new_h = new_h
               bar.offset_h = bar.new_h - bar.h
            }
         })
      })

      this.animation.run(this.animation_data)
   }

   /**
    * @override
    * 
    * @param {*} progress прогресс анимации
    * @param {*} hide - true скрыть, false показать
    * @param {*} column_index - индекс колонки для скрытия/показа
    */
   animate(progress, [hide, column_index]) {
      this.columns.children.forEach(group => {
         group.children.forEach(bar => {

            if (bar.column_index == column_index) {
               bar.alpha = bar.alpha_fraction * progress + bar.old_alpha
            }

            bar.y = bar.offset_y * progress + bar.old_y
            bar.h = bar.offset_h * progress + bar.old_h
         })
      })
   }

   onMove(index) {      
      this.columns.children.forEach(group => {
         group.children.forEach(bar => {
            if (bar.alpha !== 0) {
               bar.alpha = bar.index == index ? 1 : 0.5
            }
         })
      })
   }

   onLeave() {
      this.columns.children.forEach(group => {
         group.children.forEach(bar => {
            if (bar.alpha == 1) {
               bar.alpha = 0.5
            }
         })
      })
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
}