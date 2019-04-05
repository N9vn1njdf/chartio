import { Event } from 'core'
import { Line, LinesGroup, Rectangle } from 'elements'
import { Slide } from 'animations'

export default class Columns extends Event {

   constructor({width, height, themeObserver, hiddenColumnsObserver}) {
      super();

      this.width = width;
      this.height = height;
      this.hidden_columns = [];

      this.padding_bottom = 0;

      themeObserver.subscribe(theme => {
         this.padding_bottom = theme.main_padding_bottom;
         this.duration = theme.animation_duration_4;

         if (this.scale) {
            this.pointers.children = this.getColumnsGroup();
            this.updateLines();
         }
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

      this.element = new Rectangle({
         h: height,
         children: [
            this.pointers,
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
      this.element.x = offset.x;
      this.offset = offset;
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
         this.emit('ready');
         return 
      }

      this.pointers.children.forEach(lines_group => {
         lines_group.children.forEach(slide => slide.child.x = slide.index * this.scale.x)
      })

      this.animateDirection();
   }

   updateLines() {
      this.pointers.children.forEach(lines_group => {
         for (let i = 0; i < lines_group.children.length; i++) {
            const slide = lines_group.children[i];
            const slide2 = lines_group.children[i+1];

            if (!slide2) {
               continue;
            }

            if (slide2 && slide.column_index == slide2.column_index) {
               slide.child._x2 = slide2.child._x
               slide.child._y2 = slide2.child._y
            }
         }
      });
   }

   animateDirection() {
      if (this.pointers.children[0].running || this.prev_scale.y == this.scale.y) {
         return;
      }

      this.pointers.children.forEach(lines_group => {
         lines_group.children.forEach(slide => {
            let offset = (this.height - slide.column_value * this.scale.y + this.offset.y) - this.padding_bottom;

            slide.completed = false
            slide.offset = -(slide.child.y - offset);
            slide.forward()
         })
      })
   }

   hideColumn(index) {
      this.pointers.children.forEach(lines_group => {
         lines_group.children.forEach(slide => {
            if (slide.column_index !== index) {
               return;
            }

            slide.toAlpha(0)
            slide.forward()
         })
      })
   }

   showColumn(index) {
      this.pointers.children.forEach(lines_group => {
         lines_group.children.forEach(slide => {
            if (slide.column_index !== index) {
               return;
            }

            slide.toAlpha(1)
            slide.forward()
         })
      })
   }

   getColumnsGroup() {      
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];

         let group = new LinesGroup({lineWidth: 2, color: this.colors[column[0]], lineCap: 'round'});
         let lines = [];

         for (let i = 1; i < column.length; i++) {
            if (i > column.length-1) {
               break;
            }

            let y = column[i] * this.scale.y;
            let y2 = column[i+1] * this.scale.y;
            let offset = this.height + this.offset.y - this.padding_bottom;
            
            let child = new Slide({
               child: new Line({
                  x: (i-1) * this.scale.x,
                  x2: i * this.scale.x,
                  y: offset - y,
                  y2: offset - y2,
               }),
               duration: this.duration,
               onProgress: () => this.updateLines()
            });

            child.column_index = c_i;
            child.column_value = column[i];
            child.index = i-1;

            lines.push(child);
         }

         group.children = lines;
         children.push(group);
      }

      return children;
   }
}