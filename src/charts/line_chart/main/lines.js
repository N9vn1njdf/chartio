import { Line, Position } from 'elements'
import { FadeSlide } from 'animations'

export default class Lines {

   constructor({width, height}) {      
      this.width = width;
      this.height = height;

      this.lines_count = 5;
      this.step = (this.height-30)/this.lines_count;

      this.lines = [
         new Position(),
         new Position(),
      ];

      this.element = new Position({
         children: [
            this.lines[0],
            this.lines[1],
            new Line({x: 0, y: this.height, color: '#dfdcdf'})
         ]
      });
   }

   update({scale, columns, hidden_columns}) {
      this.element.w = this.lines[0].w = this.lines[1].w = (columns[0].length-2)*scale.x;

      this.element.x = 0;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.hidden_columns = hidden_columns;
      
      // this.updateColumns();
   }

   to_bottom() {
      this.lines[0].children = this.getLinesGroup(0, -60, -2, '#dfdcdf');
      this.lines[1].children = this.getLinesGroup(0, 24, 12, '#dfdcdf');

      this.lines[0].children.forEach(element => {
         element.completed = true
         element.reverse()
      });
      this.lines[1].children.forEach(element => {
         element.forward()
      });

      console.log(this.lines[1]);
      
   }

   updateColumns() {
      if (this.prev_scale) {
         // this.animateLinesGroup(this.lines.children);
         // return;
      }

      if (this.lines[0].children.running) {
         return;
      }
      var type = 'to_bottom';

      if (type == 'to_bottom') {
         this.to_bottom()
      }
      

      // var children = this.getLinesGroup();

      // this.lines.children = children;
   }
   
   getLinesGroup(y, offset, m, color) {
      var children = [];
      
      for (let i = 1; i <= this.lines_count; i++) {
         let line = new Line({x: 0, y: y + this.height-(i*this.step), color: color});
         
         children.push(
            new FadeSlide({child: line, offset: (i*m)+offset, duration: 390,
               //  listener: animationListener
               })
         );
      }

      return children;
   }

   // animationListener(completed) {
      
   // }

   // toBottomAnimation() {
   //    var children = this.getLinesGroup(-200);
   //    this.lines.children = this.lines.children.concat(children);

   //    for (let i = 0; i < children.length; i++) {
   //       const element = children[i];
   //       element.completed = true;
   //       element.reverse();
   //    }

   //    console.log(this.lines.children);
   // }

   animateLinesGroup(children) {
      if (!children[0] || children[0].running) {
         return;
      }


      var direction;
      
      if (this.prev_scale.y < this.scale.y) {
         console.log('анимация вверх');
         // this.toTopAnimation();
         direction = 'top';
      }
      
      // if (this.prev_scale.y > this.scale.y) {
         console.log('анимация вниз');
         // this.toBottomAnimation();
         direction = 'bottom';
      // }

      return;



      for (let i = 0; i < children.length; i++) {
         const element = children[i];

         // element.completed = true;
         // element.child.y += 120;

         if (direction == 'bottom') {
            element.completed = false;
            element.offset = 200;

         }

         if (element.completed) {
            element.reverse();

         } else {
            element.forward();
         }
      }
   }
}