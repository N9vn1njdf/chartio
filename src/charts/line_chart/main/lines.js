import { Line, Position } from 'elements'
import { FadeSlide } from 'animations'

export default class Lines {

   constructor({width, height, color}) {      
      this.width = width;
      this.height = height;
      this.color = color;

      this.lines_count = 5;
      this.step = (this.height-30)/this.lines_count;

      this.lines = {
         top: new Position({w: width}),
         bottom: new Position({w: width}),
      };

      this.element = new Position({
         children: [
            this.lines.top,
            this.lines.bottom,
            new Line({x: 0, y: this.height, color: color})
         ]
      });
   }

   update({scale, columns, hidden_columns}) {
      this.element.w = (columns[0].length-2)*scale.x;      
      this.element.x = 0;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.hidden_columns = hidden_columns;
      
      if (this.prev_scale) {
         this.animateLines();

      } else {
         this.lines.top.children = this.getLinesGroup(0, -50, -90, this.color);
      }
   }

   animateLines() {
      if (this.lines.top.children.running) {
         return;
      }

      var direction = null;
      
      if (this.prev_scale.y < this.scale.y) {
         direction = 'bottom';
      }
      
      if (this.prev_scale.y > this.scale.y) {
         direction = 'top';
      }

      if (direction != null) {
         this.animateFrom(direction);
      }
   }

   animateFrom(from) {
      let to = from == 'top' ? 'bottom' : 'top';

      this.lines[from].children = this.getLinesGroup(0, -50, -90, this.color);
      this.lines[to].children = this.getLinesGroup(0, 20, 40, this.color);
      
      this.lines.top.children.forEach(element => {         
         element.completed = true
         element.reverse()
      });

      this.lines.bottom.children.forEach(element => {
         element.forward()
      });
   }
   
   getLinesGroup(y, offset, m, color) {
      var children = [];
      
      for (let i = 1; i <= this.lines_count; i++) {
         let child = new FadeSlide({
            child: new Line({x: 0, y: y + this.height-(i*this.step), color: color}),
            offset: (i*m)+offset,
            duration: 320,
         });
         children.push(child);
      }

      return children;
   }
}