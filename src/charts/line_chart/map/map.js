import { Event } from 'core'
import { Circle, Line, Rectangle, Position } from 'elements'
import { Slide } from 'animations'
import Navigator from './navigator.js'

export default class Map extends Event {

   constructor({width, map_height, main_height, localeObserver, themeObserver, hiddenColumnsObserver}) {
      super();

      this.width = width;
      this.map_height = map_height;
      this.padding_top = 0;
      this.padding_bottom = 0;

      this.main_height = main_height;
      this.main_padding_top = 0;
      this.main_padding_bottom = 0;

      this.dates_column = [];
      this.columns = [];
      this.hidden_columns = [];
      this.colors = {};
      this.names = {}
      this.main_scale_y = 1;
      this.map_scale_y = 1;
      this.duration = 200

      localeObserver.subscribe(locale => {
         this.locale = locale;
         this.updatePointers();
         this.updateLines();
      })

      themeObserver.subscribe(theme => {
         this.main_padding_top = theme.main_padding_top;
         this.main_padding_bottom = theme.main_padding_bottom;
         this.padding_top = theme.map_padding_top;
         this.padding_bottom = theme.map_padding_bottom;

         this.duration = theme.animation_duration_4;
         this.caclMapYScale();
         this.updatePointers();
         this.updateLines();
      })

      hiddenColumnsObserver.subscribe(([act, index]) => {
         if (act == 'hide' && this.visible_columns.length > 1) {
            this.hidden_columns.push(index);
            this.caclMapYScale();
            this.hideColumn(index);
            this.emitUpdate();
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
               this.hidden_columns_count--;
               this.caclMapYScale();
               this.showColumn(index);
               this.emitUpdate();
            }
         }
      })

      this.navigator = new Navigator({width: width, height: map_height, themeObserver});
      this.navigator.on('offset', () => this.emitUpdate());
      this.navigator.on('scaling', () => this.emitUpdate());

      this.pointers = new Position();
      this.lines = new Rectangle()

      this.element = new Rectangle({
         clip: true,
         w: width,
         h: map_height,
         children: [
            this.pointers,
            this.lines,
            this.navigator.element,
         ]
      });      
   }

   emitUpdate() {
      this.caclMainYScale();
      this.updateLines();
      this.emit('update', this.update_data);
   }

   get main_offset() {
      return {
         x: -this.navigator.offset * ((this.scale.x * this.width / this.navigator.width) / this.scale.x),
         y: this.main_offset_y || 0
      }
   }

   get main_scale() {
      return {
         x: this.scale.x * this.width / this.navigator.width,
         y: this.main_scale_y,
      };
   }

   get update_data() {
      return {
         offset: this.main_offset,
         scale: this.main_scale,
         dates_column: this.dates_column,
         columns: this.columns,
         colors: this.colors,
         names: this.names,
      };
   }

   get scale() {
      return {
         x: this.data_count > 0 ? this.width/this.data_count : 0,
         y: this.map_scale_y
      }
   }

   get data_count() {
      return this.columns[0] ? this.columns[0].length-2 : 0;
   }
   
   setData({columns, colors, names}) {
      columns = columns.slice();
      this.dates_column = columns[0];
      this.columns = columns.splice(1, columns.length);
      this.colors = colors;
      this.names = names;

      this.caclMapYScale();
      this.updatePointers();
      this.updateLines();
      this.emitUpdate();
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

   hideColumn(index) {
      this.pointers.children.forEach(element => {
         if (element.column_index == index) {
            element.toAlpha(0);
         }
         
         let new_y = this.map_height - element.column_value * this.scale.y + this.min_y * this.scale.y - this.padding_bottom;

         if (new_y < 0 && element.column_index !== index) {
            new_y = -new_y
         }

         element.completed = false;
         element.offset = -(element.child._y - new_y);
         element.forward()
      })
   }

   showColumn(index) {
      this.pointers.children.forEach(element => {
         if (element.column_index == index) {
            element.toAlpha(1);
         }

         element.offset = -element.offset;
         element.completed = false;
         element.forward()
      })
      
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


   updatePointers() {
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];
         
         for (let i = 1; i < column.length; i++) {
            let line = null;

            if (i < column.length-1) {
               line = new Line({color: this.colors[column[0]], w: 2});
            }
            
            let rect = new Circle({
               x: (i-1) * this.scale.x,
               y: this.map_height - column[i] * this.scale.y + this.min_y * this.scale.y - this.padding_bottom,
               r: 0,
               color: this.colors[column[0]],
               children: line ? [line] : []
            });
            
            let child = new Slide({child: rect, duration: this.duration, onProgress: () => this.updateLines()});
            child.column_index = c_i;
            child.column_value = column[i];

            children.push(child);
         }
      };
      
      this.pointers.children = children;
   }

   // Вычисляем Y масштаб для миникарты
   caclMapYScale() {
      let items = [];
      
      for (let i = 0; i < this.columns.length; i++) {
         if (this.hidden_columns.includes(i)) {
            continue;
         }
         this.columns[i].forEach(element => items.push(element));
      }      
      
      let min_max = this.getMinMaxY(items);
      this.min_y = min_max.min;
      this.map_scale_y = (this.map_height-this.padding_top-this.padding_bottom)/(min_max.max - min_max.min)
   }
   
   // Вычисляем Y масштаб для основного графика
   caclMainYScale() {
      var visible_items = [];
      
      for (let c = 0; c < this.columns.length; c++) {
         if (this.hidden_columns.includes(c)) {
            continue;
         }
         
         for (let i = 1; i < this.columns[c].length; i++) {
            let s = 70;
            let item_x = (i-1) * this.scale.x;

            if (this.navigator.offset < item_x + s && this.navigator.offset + this.navigator.width > item_x - s) {
               visible_items.push(this.columns[c][i]);
            }
         }
      }

      var min_max = this.getMinMaxY(visible_items);
      var diff = min_max.max - min_max.min;
      this.main_scale_y = (this.main_height-this.main_padding_top-this.main_padding_bottom)/diff;
      
      this.main_offset_y = this.main_scale_y * min_max.min;
   }

   getMinMaxY(items) {
      let min = items.length == 0 ? 0 : items[items.length-1];
      let max = 0;

      items.forEach(element => {
         max = element > max ? element : max;
         min = element < min ? element : min;
      });

      return {min, max}
   }
}