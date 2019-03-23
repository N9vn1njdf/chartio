import { Text, Line, Circle, Rectangle } from 'elements'
import { Slide } from 'animations'

export default class Columns {

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

      this.pointers = new Rectangle()
      this.lines = new Rectangle()

      this.element = new Rectangle({
         h: height,
         children: [
            this.pointers,
            this.lines,
         ]
      })
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

   update({offset, scale, columns, colors}) {
      this.element.x = offset;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
      this.colors = colors;

      this.updatePointers();
      this.updateLines();
   }

   updatePointers() {
      if (this.pointers.children.length == 0) {
         this.pointers.children = this.getColumnsGroup();
         this.element.w = (this.columns[0].length-2)*this.scale.x;
         return 
      }

      for (let i = 0; i < this.pointers.children.length; i++) {
         this.pointers.children[i].child.x = this.pointers.children[i].child.index * this.scale.x;
      }
      this.animateDirection();
   }

   updateLines() {
      let children = [];

      for (let i = 0; i < this.pointers.children.length; i++) {
         const element = this.pointers.children[i];
         const element2 = this.pointers.children[i+1] ? this.pointers.children[i+1] : null;
         
         if (element2 && element.column_index == element2.column_index) {
            let line = element.child.children[0]
            line.x2 = element2.child.x - element2.child.r/2
            line.y2 = element2.child.y + element2.child.r/2
         }
      }

      this.lines.children = children;
   }

   animateDirection() {
      if (this.pointers.children[0].running) {
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
      this.pointers.children.forEach(element => {
         let offset = (this.height - element.column_value * this.scale.y);

         element.completed = false
         element.offset = -(element.child.y - offset);
         element.forward()
      });
   }

   hideColumn(index) {
      this.pointers.children.forEach(element => {
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
      this.pointers.children.forEach(element => {
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
            let y = this.height - column[i] * this.scale.y// + 600;
            let line = null;
         
            if (i < column.length-1) {
               line = new Line({color: this.colors[column[0]], w: 2});
            }

            let rect = new Circle({x: (i-1) * this.scale.x, y, r: 0, children: line ? [line] : []});
            rect.index = i-1;

            let child = new Slide({child: rect, duration: this.duration, onProgress: () => this.updateLines()});
            child.column_index = c_i;
            child.column_value = column[i];

            children.push(child);
         }
      }

      return children;
   }
}