import { Component, Animation, Curves } from 'core'
import { Position, Line, LinesGroup, Rectangle } from 'elements'

export default class Columns extends Component {

   /**
    * @override
    */
   $onTheme(theme) {      

   }

   /**
    * @override
    */
   $onData({dates, columns, colors, names}) {

   }

   /**
    * @override
    */
   $onHideColumn(index) {
      this.animation_data = [0, index]
   }

   /**
    * @override
    */
   $onShowColumn(index) {
      this.animation_data = [1, index]
   }

   /**
    * @override
    */
   $build(theme, locale) {
      this.animation_data = []

      this.animation = new Animation({
         component: this,
         duration: theme.main_animation_duration,
         curve: Curves.easeOutCubic,
         handle: this.animate,
         onEnd: () => {
            this.animation_data = []
         }
      })

      this.lines_groups = new Position()

      this.padding = theme.main_padding
      this.height = this.$canvas.height - theme.dates_height - theme.map_height - this.padding
      
      return new Rectangle({
         y: this.padding,
         h: this.height,
         child: this.lines_groups
      })
   }
   
   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale

      this.$element.w = (this.$columns[0].length-2)*this.scale.x
      this.$element.x = offset.x + this.$theme.main_margin

      if (this.lines_groups.children.length == 0) {
         this.createColumns()
      } else {
         this.updateColumns()
      }
   }

   updateColumns() {
      let offset = this.height + this.offset.y
      let run = true
      
      this.lines_groups.children.forEach(lines_group => {
         lines_group.children.forEach(line => {
            line.x = line.index * this.scale.x
            line.x2 = (line.index+1) * this.scale.x

            let line_new_y = offset - line.column_value * this.scale.y
            let line_new_y2 = offset - line.column_next_value * this.scale.y

            // Если нет изменений, то не перезапускаем анимацию
            if (line.new_y == line_new_y && line.new_y2 == line_new_y2) {               
               run = false
               return
            }

            line.old_y = line.y
            line.new_y = line_new_y
            line.offset_y = line.new_y - line.y

            line.old_y2 = line.y2
            line.new_y2 = line_new_y2           
            line.offset_y2 = line.new_y2 - line.y2
         })
      })

      if (run) {
         this.animation.run(this.animation_data)
      }
   }

   // type: 1 - показать, 0 скрыть
   animate(progress, [type, column_index]) {      
      this.lines_groups.children.forEach(lines_group => {
         lines_group.children.forEach(line => {

            if (line.column_index == column_index) {
               line.alpha = type == 0 ? 1 - progress : progress
            }

            line.y = line.offset_y * progress + line.old_y

            if (line.offset_y2) {
               line.y2 = line.offset_y2 * progress + line.old_y2
            }
         })
      })
   }

   createColumns() {      
      var children = [];
      let offset = this.height + this.offset.y

      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i];
         
         let group = new LinesGroup({lineWidth: 2.5, color: this.$colors[column[0]], lineCap: 'round'});
         let lines = [];
         
         for (let i = 1; i < column.length; i++) {
            if (!column[i+1]) {
               break;
            }

            let y = column[i] * this.scale.y;
            let y2 = column[i+1] * this.scale.y;
            
            let line = new Line({
               x: (i-1) * this.scale.x,
               x2: i * this.scale.x,
               y: offset - y,
               y2: offset - y2,
            })

            line.column_index = c_i;
            line.column_value = column[i];
            line.column_next_value = column[i+1];
            line.index = i-1;

            lines.push(line);
         }

         group.children = lines
         children.push(group)         
      }

      this.lines_groups.children = children
   }
}