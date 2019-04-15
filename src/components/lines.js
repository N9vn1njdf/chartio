import { Component, Animation, Curves } from 'core'
import { LinesGroup, Line, Position, Rectangle } from 'elements'

export default class Lines extends Component {

   /**
    * @override
    */
   $onTheme(theme) {
      this.color = theme.lines_color
      this.animation.duration = theme.lines_animation_duration
      this.lines1.color = this.lines2.color = this.color
   }

   /**
    * @override
    */
   $build(theme, locale) {
      // Передается в параметрах
      this.height = this.$canvas.height - theme.map_height - theme.dates_height
      this.margin = 20
      
      // Тема
      this.lines_count = 6
      this.color = theme.lines_color

      this.animation = new Animation({
         component: this,
         duration: theme.lines_animation_duration,
         curve: Curves.easeOutCubic,
         handle: this.animate,
      })

      this.width = this.$canvas.width - this.margin*2
      this.height = this.height - this.margin
      this.step = this.height / this.lines_count

      this.lines1 = new LinesGroup({lineWidth: 1, color: this.color})
      this.lines2 = new LinesGroup({lineWidth: 1, color: this.color})

      return new Rectangle({
         x: this.margin,
         y: this.margin,
         w: this.width,
         h: this.height,
         child: new Position({
            children: [
               this.lines1,
               this.lines2,
            ]
         })
      })
   }

   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale
      
      if (this.lines1.children.length == 0) {
         this.lines1.children = this.createLines()
         this.lines2.children = this.createLines()
      } else {
         this.updateLines()
      }
   }

   createLines() {
      let children = []
      
      for (let i = 1; i <= this.lines_count; i++) {
         let value = (i * this.step + this.offset.y) / this.scale.y
         let y = this.height - i * this.step

         let child = new Line({
            x2: this.width,
            y: y,
            y2: y
         })

         child.index = i
         child.value = value

         children.push(child)
      }

      return children
   }

   updateLines() {
      let diff = this.prev_scale.y - this.scale.y
      if (diff == 0) {
         return
      }

      let offset = diff * 300
      
      for (let i = 0; i < this.lines1.children.length; i++) {
         const line = this.lines1.children[i]

         line.y = line.y2 = this.height - line.index * this.step
         line.alpha = 1
         line.new_alpha = 0

         this.calcAnimation(line, offset)
      }

      for (let i = 0; i < this.lines2.children.length; i++) {
         const line = this.lines2.children[i]

         line.y = line.y2 = this.height - line.index * this.step - offset
         line.alpha = 0
         line.new_alpha = 1

         this.calcAnimation(line, offset)
      }

      this.animation.run()
   }

   calcAnimation(line, n) {
      line.old_y = line.y
      line.new_y = line.y + n
      line.offset_y = line.new_y - line.y

      line.old_alpha = line.alpha
      line.alpha_fraction = line.new_alpha - line.alpha
   }

   animate(progress, direction) {      
      this.lines1.children.forEach(line => {
         line.alpha = line.alpha_fraction * progress + line.old_alpha
         line.y = line.y2 = line.offset_y * progress + line.old_y
      })
      this.lines2.children.forEach(line => {
         line.alpha = line.alpha_fraction * progress + line.old_alpha
         line.y = line.y2 = line.offset_y * progress + line.old_y
      })
   }
}