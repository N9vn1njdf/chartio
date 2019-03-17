import { Text, Line, Rectangle } from 'elements'
import { FadeSlide } from 'animations'

export default class YInformer {

   constructor({width, height}) {
      this.width = width;
      this.height = height;
      this.lines_count = 5;

      this.element = new Rectangle({h: height});      
   }

   update({offset, scale, dates_column, columns, hidden_columns, colors, locale}) {
      this.element.x = 0;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.hidden_columns = hidden_columns;
      
      this.updateColumns();
   }

   updateColumns() {      
      if (this.columns.length == 0) {
         return;
      }

      if (this.prev_scale) {
         console.log(this.prev_scale.y, this.scale.y);

         this.animate();
         return;
      }

      var step = (this.height-30)/this.lines_count;      

      var children = [];
      
      for (let i = 0; i <= this.lines_count; i++) {
         let line = new Line({
            x: 0,
            y: this.height-(i*step),
            color: '#c7c7c7',
            children: [
               new Text({y: -15, text: parseInt(i*step/this.scale.y), size: 12.5})
            ]
         });

         let child = new FadeSlide({child: line, offset: i*20, duration: 220, completed: false});
         
         children.push(child);
      }

      this.element.children = children;
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }

   animate() {
      
      if (this.prev_scale.y < this.scale.y) {
         console.log('анимация вверх');
      }
      
      if (this.prev_scale.y > this.scale.y) {
         console.log('анимация вниз');
      }

      for (let i = 1; i < this.element.children.length; i++) {
         const element = this.element.children[i];
         if (element.completed) {
            element.reverse();

         } else {
            element.forward();
         }
      }
   }
}