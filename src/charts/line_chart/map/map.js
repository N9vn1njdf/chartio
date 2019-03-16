import { Event } from 'core'
import { Circle, Rectangle } from 'elements'
import Navigator from './navigator.js'

export default class Map extends Event {

   constructor({width, map_height, main_height, main_padding_top, localization, locale_code}) {
      super();

      this.width = width;
      this.map_height = map_height;
      this.main_height = main_height;
      this.main_padding_top = main_padding_top || 40;
      this.localization = localization;
      this.locale_code = locale_code;

      // Соотношение основного графика и миникарты
      this.ratio = map_height/main_height;

      this.dates_column = [];
      this.columns = [];
      this.hidden_columns = [];
      this.colors = {};

      this.navigator = new Navigator({width, height: map_height});
      this.navigator.on('offset', () => this.emitUpdate());
      this.navigator.on('scaling', () => this.emitUpdate());

      this.data_element = new Rectangle({w: width, h: map_height});
      
      this.element = new Rectangle({
         w: width,
         h: map_height,
         children: [
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
         y: this.main_scale_y || 1
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
         hidden_columns: this.hidden_columns,
         colors: this.colors,
         locale: this.locale,
         locale_code: this.locale_code,
      };
   }

   get scale() {
      return {
         x: this.data_count > 0 ? this.width/this.data_count : 0,
         y: this.ratio
      }
   }

   get data_count() {
      return this.columns[0] ? this.columns[0].length-2 : 0;
   }
   
   setData({columns, colors}) {
      this.dates_column = columns[0];
      this.columns = columns.splice(1, columns.length);
      this.colors = colors;
      this.update();
   }

   hideColumn(index) {
      this.hidden_columns.push(index);
      this.update();
   }

   showColumn(index) {
      for(let i in this.hidden_columns) {
         if (this.hidden_columns[i] == index) {
            this.hidden_columns.splice(i, 1);
         }
      }      
      this.update();
   }

   update() {
      var children = [];

      for (let i = 0; i < this.columns.length; i++) {
         if (this.hidden_columns.includes(i)) {
            continue;
         }

         let column = this.columns[i];

         for (let i = 1; i < column.length; i++) {
            let rect = new Circle({
               x: (i-1) * this.scale.x,
               y: this.map_height - column[i] * this.scale.y,
               r: 3,
               color: this.colors[column[0]],
            });

            children.push(rect);
         }
      };
      
      this.data_element.children = children;
      this.emitUpdate();
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
               visible_items.push({x: x, y: this.main_height - column[i] * 1});
            }
         }
      }

      var min_max2 = this.getMinMaxY(visible_items);
      var diff = this.main_height - min_max2.min;
      this.main_scale_y = (this.main_height-this.main_padding_top)/diff;
   }

   getMinMaxY(items) {
      let min = items.length == 0 ? 0 : items[items.length-1].y;
      let max = 0;

      items.forEach(element => {
         max = element.y > max ? element.y : max;
         min = element.y < min ? element.y : min;
      });

      return {min, max}
   }
}

