import { Columns } from 'components'
import { Position, Rectangle } from 'elements'

export default class LineColumns extends Columns {

   /**
    * @override
    */
   createColumns() {
      var children = []
      let offset = this.height + this.offset.y
      let column_h = []
      
      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i];
         
         let group = new Position();
         let lines = [];
         
         for (let i = 1; i < column.length; i++) {
            if (!column[i+1]) {
               break;
            }

            let x = (i-1) * this.scale.x
            let prev_h = column_h[c_i-1] ? column_h[c_i-1][i] : 0
            
            let y = offset - column[i] * this.scale.y
            let h = this.height - y

            let line = new Rectangle({
               alpha: 0.5,
               color: this.$colors[column[0]],
               x,
               w: i * this.scale.x - x,
               y: offset - 10020, //this.height - h - prev_h
               h: -y + 100
            })
            line.on('move', () => line.alpha = 1)
            line.on('leave', () => line.alpha = 0.5)

            if (!column_h[c_i]) {
               column_h[c_i] = []
            }
            column_h[c_i][i] = h
            

            line.column_index = c_i;
            line.column_value = column[i];
            line.column_next_value = column[i+1];
            line.index = i-1;
            line.prev_h = prev_h

            lines.push(line);
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
      let run = true
      
      this.columns.children.forEach(lines_group => {
         lines_group.children.forEach(line => {
            line.x = line.index * this.scale.x
            line.w = (line.index+1) * this.scale.x - line.x

            let y = offset - line.column_value * this.scale.y
            let h = this.height - y
            let new_y = this.height - h - line.prev_h

            // Если нет изменений, то не перезапускаем анимацию
            if (line.new_y == new_y && this.animation_data.length == 0) {
               run = false
               return
            }

            line.old_y = line.y
            line.new_y = new_y
            line.offset_y = line.new_y - line.y

            line.old_h = line.h
            line.new_h = h
            line.offset_h = line.new_h - line.h
         })
      })

      if (run) {
         this.animation.run(this.animation_data)
      }
   }

   /**
    * @override
    * 
    * @param {*} progress прогресс анимации
    * @param {*} type - true скрыть, false показать
    * @param {*} column_index - индекс колонки для скрытия/показа
    */
   animate(progress, [type, column_index]) {
      this.columns.children.forEach(lines_group => {
         lines_group.children.forEach(line => {

            if (line.column_index == column_index) {
               line.alpha = type == false ? 1 - progress : progress
            }

            line.y = line.offset_y * progress + line.old_y
            line.h = line.offset_h * progress + line.old_h
         })
      })
   }
}