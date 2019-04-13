import { Component, Animation, Curves } from 'core'
import { LinesGroup, Line, Position, Rectangle } from 'elements'

export default class Lines extends Component {

   /**
    * @override
    */
   $build(theme, locale) {
      // Передается в параметрах
      this.height = this.$canvas.height - theme.map_height - theme.dates_height
      this.margin = 20
      
      // Тема
      this.lines_count = 6
      this.color = 'rgb(233, 233, 233)'

      this.animation = new Animation({
         component: this,
         duration: 340,
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
         // ignoreInput: true,
         // color: 'rgba(221, 211, 51, 0.2)',
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




   // constructor({width, height, themeObserver}) {      
   //    this.width = width;
   //    this.height = height;

   //    this.lines = {
   //       top: new LinesGroup({lineWidth: 1, color: this.color}),
   //       bottom: new LinesGroup({lineWidth: 1, color: this.color}),
   //    }

   //    themeObserver.subscribe(theme => {
   //       this.lines_count = theme.lines_count-1;
   //       this.step = (this.height-30)/this.lines_count;         
   //       this.color = this.lines.top.color = this.lines.bottom.color = theme.line_color1;         
   //       this.duration = theme.animation_duration_1;
   //       this.lines.top.children = this.getLinesGroup(0, 0, 0);
   //    })
      
   //    this.element = new Position({
   //       children: [
   //          this.lines.top,
   //          this.lines.bottom,
   //       ]
   //    });
   // }

   // update({scale, columns}) {
   //    this.element.w = (columns[0].length-2)*scale.x;      
   //    this.element.x = 0;
   //    this.prev_scale = this.scale;
   //    this.scale = scale;
   //    this.columns = columns;

   //    if (this.prev_scale) {
   //       this.animateDirection();
   //    }
   // }

   // animateDirection() {
   //    if (this.lines.top.children.running) {
   //       return;
   //    }

   //    if (this.prev_scale.y < this.scale.y) {
   //       this.animateFrom('bottom');
   //    }
      
   //    if (this.prev_scale.y > this.scale.y) {
   //       this.animateFrom('top');
   //    }
   // }

   // animateFrom(from) {
   //    let to = from == 'top' ? 'bottom' : 'top';

   //    this.lines[from].children = this.getLinesGroup(0, -60, -20);
   //    this.lines[to].children = this.getLinesGroup(0, 100, 5);
      
   //    this.lines.top.children.forEach(element => {
   //       element.completed = true
   //       element.reverse()
   //    });

   //    this.lines.bottom.children.forEach(element => {
   //       element.forward()
   //    });
   // }

}