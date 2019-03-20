import { Text, Circle, Rectangle } from 'elements'
import { Slide } from 'animations'

export default class Lines {

   constructor({width, height, themeObserver, hiddenColumnsObserver}) {      
      this.width = width;
      this.height = height;
      this.hidden_columns = [];

      themeObserver.subscribe(theme => {
         this.duration = theme.animation_duration_4;
      })
      
      hiddenColumnsObserver.subscribe(([act, index]) => {         
         if (act == 'hide' && this.visible_columns.length > 1) {
            this.hidden_columns.push(index);
            this.hideColumn(index);
         }

         if (act == 'show') {
            let has = false
            for(let i in this.hidden_columns) {
               if (this.hidden_columns.includes(index)) {
                  has = true;
                  this.hidden_columns.splice(i, 1);
               }
            }

            if (has) {
               this.showColumn(index);
            }
         }
      })

      this.element = new Rectangle({h: height});
   }
   
   get visible_columns() {
      var result = [];
      
      for (let i = 0; i < this.columns.length; i++) {
         if (!this.hidden_columns.includes(i)) {
            result.push(i);
         }
      }
      return result;
   }

   get running() {
      for(let i in this.element.children) {
         if (this.element.children[i].running) {
            return true;
         }
      }
      return false;
   }

   update({offset, scale, columns, colors}) {
      this.element.x = offset;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.colors = colors;
      
      this.updateColumns();
   }

   updateColumns() {
      if (this.element.children.length > 0) {
         for (let i = 0; i < this.element.children.length; i++) {
            this.element.children[i].child.x = this.element.children[i].child.index * this.scale.x;
         }
         return this.animateDirection();
      }

      this.element.children = this.getColumnsGroup();
      this.element.w = (this.columns[0].length-2)*this.scale.x;
   }

   animateDirection() {
      if (this.running || !this.prev_scale) {         
         return;
      }

      if (this.prev_scale.y < this.scale.y) {         
         this.animateColumns();
      }
      
      if (this.prev_scale.y > this.scale.y) {
         this.animateColumns();
      }
   }

   animateColumns() {
      this.element.children.forEach(element => {
         let offset = (this.height - element.column_value * this.scale.y);

         element.completed = false
         element.offset = -(element.child.y - offset);
         element.forward()
      });
   }

   hideColumn(index) {
      this.element.children.forEach(element => {         
         if (element.column_index !== index) {
            return;            
         }

         let offset = (this.height - element.column_value * this.scale.y);

         element.completed = false
         element.offset = -(element.child.y - offset)
         element.toAlpha(0)
         element.forward()
      });
   }

   showColumn(index) {
      this.element.children.forEach(element => {         
         if (element.column_index !== index) {
            return;            
         }

         let offset = (this.height - element.column_value * this.scale.y);

         element.completed = false
         element.offset = -(element.child.y - offset)
         element.toAlpha(1)
         element.forward()
      });
   }

   getColumnsGroup() {
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];
         
         for (let i = 1; i < column.length; i++) {

            let rect = new Circle({
               x: (i-1) * this.scale.x,
               y: this.height - column[i] * this.scale.y,
               r: 5,
               color: this.colors[column[0]],
               children: [
                  new Text({text: column[i], size: 10, color: '#000'})
               ]
            });
            rect.index = i-1;

            let child = new Slide({child: rect, duration: this.duration});
            child.column_index = c_i;
            child.column_value = column[i];

            children.push(child);
         }
      }

      return children;
   }
}