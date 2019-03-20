import { Event } from 'core'
import { Circle, Rectangle, Position } from 'elements'
import { Slide } from 'animations'
import Navigator from './navigator.js'

export default class Map extends Event {

   constructor({width, map_height, main_height, main_padding_top, localization, locale_code, themeObserver, hiddenColumnsObserver}) {
      super();

      this.width = width;
      this.map_height = map_height;
      this.padding_top = 5;
      this.padding_bottom = 5;

      this.main_height = main_height;
      this.main_padding_top = main_padding_top || 40;
      this.localization = localization;
      this.locale_code = locale_code;

      this.dates_column = [];
      this.columns = [];
      this.hidden_columns = [];
      this.colors = {};
      this.main_scale_y = 1;
      this.map_scale_y = 1;
      this.duration = 200

      themeObserver.subscribe(theme => {
         this.duration = theme.animation_duration_4;
         this.update();
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

      this.data_element = new Position();
      
      this.element = new Rectangle({
         clip: true,
         w: width,
         h: map_height,
         children: [
            new Rectangle({w: 1000, h: this.padding_top, color: 'rgba(230, 63, 54, 0.31)'}),
            new Rectangle({w: 1000, h: this.padding_bottom, y: map_height-this.padding_bottom, color: 'rgba(230, 63, 54, 0.31)'}),
            this.data_element,
            this.navigator.element,
         ]
      });      
   }

   emitUpdate() {
      this.caclMainYScale();
      this.emit('update', this.update_data);
   }

   get main_offset() {
      return -this.navigator.offset * ((this.scale.x * this.width / this.navigator.width) / this.scale.x)
   }

   get main_scale() {
      return {
         x: this.scale.x * this.width / this.navigator.width,
         y: this.main_scale_y
      };
   }

   get locale() {
      return this.localization[this.locale_code];
   }

   get update_data() {
      return {
         offset: this.main_offset,
         scale: this.main_scale,
         dates_column: this.dates_column,
         columns: this.columns,
         colors: this.colors,
         locale: this.locale,
         locale_code: this.locale_code,
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
   
   setData({columns, colors}) {
      columns = columns.slice();
      this.dates_column = columns[0];
      this.columns = columns.splice(1, columns.length);
      this.colors = colors;

      this.caclMapYScale();
      this.update();
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
      this.data_element.children.forEach(element => {
         if (element.column_index == index) {
            element.toAlpha(0);
         }
         
         let new_y = 0;

         if (this.visible_columns.length == 0) {
            new_y = -((this.map_height - this.padding_bottom - this.padding_top)/8)
         } else {
            new_y = this.map_height - element.column_value * this.scale.y + this.min_y * this.scale.y - this.padding_bottom
         }

         if (new_y < 0 && element.column_index !== index) {
            new_y = -new_y
         }

         element.completed = false;
         element.offset = -(element.child._y - new_y);
         element.forward()
      })
   }

   showColumn(index) {
      this.data_element.children.forEach(element => {
         if (element.column_index == index) {
            element.toAlpha(1);
         }

         element.offset = -element.offset;
         element.completed = false;
         element.forward()
      })
   }

   update() {
      var children = [];
      
      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i];
         
         for (let i = 1; i < column.length; i++) {
            let rect = new Circle({
               x: (i-1) * this.scale.x,
               y: this.map_height - column[i] * this.scale.y + this.min_y * this.scale.y - this.padding_bottom,
               r: 3,
               color: this.colors[column[0]],
            });
            
            let child = new Slide({child: rect, duration: this.duration});
            child.column_index = c_i;
            child.column_value = column[i];

            children.push(child);
         }
      };
      
      this.data_element.children = children;
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
      
      for (let i = 0; i < this.columns.length; i++) {
         if (this.hidden_columns.includes(i)) {
            continue;
         }

         let column = this.columns[i];
         
         for (let i = 1; i < column.length; i++) {
            let x = (i-1) * this.main_scale.x;
            
            if (x > -this.main_offset - 10 && x < -this.main_offset + this.width + 10) {
               visible_items.push(this.main_height - column[i] * 1);
            }
         }
      }

      var min_max = this.getMinMaxY(visible_items);
      var diff = this.main_height - min_max.min;
      this.main_scale_y = (this.main_height-this.main_padding_top)/diff;
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