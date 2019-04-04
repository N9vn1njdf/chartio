import { LinesGroup, Line, Position } from 'elements'
import { FadeSlide } from 'animations'

export default class Lines {

   constructor({width, height, themeObserver}) {      
      this.width = width;
      this.height = height;

      this.lines = {
         top: new LinesGroup({
            lineWidth: 2,
            color: this.color,
         }),
         bottom: new LinesGroup({
            lineWidth: 2,
            color: this.color,
         }),
         fixed: new LinesGroup({
            lineWidth: 2,
            color: this.color,
            children: [
               new Line({x2: this.width, y: this.height})
            ]
         }),
      };

      themeObserver.subscribe(theme => {
         this.lines_count = theme.lines_count-1;
         this.step = (this.height-30)/this.lines_count;         
         this.color = this.lines.top.color = this.lines.bottom.color = this.lines.fixed.color = theme.line_color1;         
         this.duration = theme.animation_duration_1;
         this.lines.top.children = this.getLinesGroup(0, 0, 0);
      })
      
      this.element = new Position({
         children: [
            this.lines.top,
            this.lines.bottom,
            this.lines.fixed
         ]
      });
   }

   update({scale, columns}) {
      this.element.w = (columns[0].length-2)*scale.x;      
      this.element.x = 0;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;

      if (this.prev_scale) {
         this.animateDirection();
      }
   }

   animateDirection() {
      if (this.lines.top.children.running) {
         return;
      }

      if (this.prev_scale.y < this.scale.y) {
         this.animateFrom('bottom');
      }
      
      if (this.prev_scale.y > this.scale.y) {
         this.animateFrom('top');
      }
   }

   animateFrom(from) {
      let to = from == 'top' ? 'bottom' : 'top';

      this.lines[from].children = this.getLinesGroup(0, -60, -20);
      this.lines[to].children = this.getLinesGroup(0, 100, 5);
      
      this.lines.top.children.forEach(element => {
         element.completed = true
         element.reverse()
      });

      this.lines.bottom.children.forEach(element => {
         element.forward()
      });
   }
   
   getLinesGroup(y, offset, m) {
      var children = [];
      
      for (let i = 1; i <= this.lines_count; i++) {
         let child = new FadeSlide({
            child: new Line({x: 0, x2: this.width, y: y + this.height-(i*this.step), color: this.color}),
            offset: (i*m)+offset,
            duration: this.duration,
         });
         children.push(child);
      }

      return children;
   }
}