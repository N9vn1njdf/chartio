import { Text, Line, Position } from 'elements'

export default class YAxis {

   constructor({width, height, themeObserver}) {
      this.width = width;
      this.height = height;

      this.lines_count = 5;
      this.step = (this.height-30)/this.lines_count;
      
      themeObserver.subscribe(theme => {         
         this.color = theme.text_color1;
         this.font_size = theme.text_size1;
         if (this.scale) {
            this.updateColumns();
         }
      })
      
      this.element = new Position();
   }

   update({scale, columns, hidden_columns}) {
      this.element.x = 0;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.hidden_columns = hidden_columns;
            
      this.updateColumns();
   }

   updateColumns() {
      var children = [];
      
      for (let i = 0; i <= this.lines_count; i++) {
         children.push(new Text({
            y: this.height-(i*this.step)-15,
            text: parseInt(i*this.step/this.scale.y),
            size: this.font_size,
            color: this.color
         }));
      }

      this.element.children = children;
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }
}