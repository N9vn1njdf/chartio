import { Columns } from 'components'
import { Position, Rectangle, LinesGroup, Line } from 'elements'

export default class LineColumns extends Columns {

   /**
    * @override
    */
   createColumns() {
      let children = []
      let offset = this.height + this.offset.y
      
      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i]
         
         let group = new Position()
         let lines = []
         
         for (let i = 1; i < column.length; i++) {
            let x = (i-1) * this.scale.x
            let w = i * this.scale.x - x
            
            let y = offset - column[i] * this.scale.y
            let h = this.height - y
            let column_height = children[c_i-1] ? children[c_i-1].children[i-1].h : 0
            
            let bar = new Rectangle({
               alpha: 0.5,
               color: this.$colors[column[0]],
               x: x - w/2,
               w: w,
               y: y - column_height,
               h: h
            })
            bar.on('move', () => bar.alpha = 1)
            bar.on('leave', () => bar.alpha = 0.5)

            bar.column_index = c_i
            bar.column_value = column[i]
            bar.column_next_value = column[i+1]
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
            let column_height = bar.column_index > 0 ? this.columns.children[bar.column_index-1].children[bar.index].new_h : 0
            
            bar.old_y = bar.y
            bar.new_y = new_y - column_height
            bar.offset_y = bar.new_y - bar.y

            bar.old_h = bar.h
            bar.new_h = new_h
            bar.offset_h = bar.new_h - bar.h
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
               bar.alpha = hide == false ? 1 - progress : progress
            }

            bar.y = bar.offset_y * progress + bar.old_y
            bar.h = bar.offset_h * progress + bar.old_h
         })
      })
   }

   onMove(index) {      
      this.columns.children.forEach(group => {
         group.children.forEach(bar => {            
            bar.alpha = bar.index == index ? 1 : 0.5
         })
      })
   }

   onLeave() {
      this.columns.children.forEach(group => {
         group.children.forEach(bar => {            
            bar.alpha = 0.5
         })
      })
   }
}