import { Component, Animation } from 'core'
import { Position, Text, Rectangle } from 'elements'

export default class Dates extends Component {

   /**
    * @override
    */
   $onTheme(theme) {
   //          this.color = theme.text_color2;
   //          this.font_size = theme.text_size2;
   //          this.font_family = theme.font_family
   //          this.duration = theme.animation_duration_3;
   }

   /**
    * @override
    */
   $onData({dates, columns, colors, names}) {
   }

   /**
    * @override
    */
   $onHideColumn(index) {
   }

   /**
    * @override
    */
   $onShowColumn(index) {
   }

   /**
    * @override
    */
   $build(theme, locale) {
      this.hidden_levels = []

      this.color = theme.text_color2;
      this.font_size = theme.text_size2;
      this.font_family = theme.font_family
      this.duration = theme.animation_duration_3;
      this.item_width = this.font_size*3.2

      this.element = new Position();

      return new Position({
         y: this.$canvas.height - theme.map_height - theme.date_height,
      })
   }

   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale

      this.$element.w = (this.$columns[0].length-2)*this.scale.x
      this.$element.x = offset.x + this.$theme.main_margin

      if (this.$element.children.length == 0) {
         this.calc_hidden_levels(true)
         this.createDates()
      } else {
         this.animate()
      }
   }

   createDates() {
      let children = []
      
      for (let i = 1; i < this.$dates.length; i++) {
         let date = new Date(this.$dates[i])
         let d = date.getDate()
         let m = this.$locale.month[date.getMonth()]

         let x = (i-1) * this.scale.x - this.font_size/1.8

         let text = new Text({
            alpha: this.hidden.includes(i-1) ? 0 : 1,
            x: x,
            y: this.$theme.date_height/3,
            text: `${m} ${d}`,
            size: this.font_size,
            fontFamily: this.font_family,
            color: this.color,
            align: 'center'
         })

         children.push(text)
      }

      this.$element.children = children      
   }

   animate() {
      this.calc_hidden_levels();

      for (let i = 0; i < this.$element.children.length; i++) {
         let element = this.$element.children[i];

         element.x = i * this.scale.x - this.font_size/1.8
         
         if (this.hidden.includes(i)) {
            element.alpha = 0
         } else {
            element.alpha = 1
         }
      }
   }

   // Возвращает индексы скрытых элементов
   get hidden() {
      let result = [];
      for(let i in this.hidden_levels) {
         result = result.concat(this.hidden_levels[i]);
      }
      return result;
   }

   // Возвращает индексы элементов, которые показаны
   get visible() {      
      let result = [];
      for (let i = 0; i < this.$dates.length; i++) {
         if (!this.hidden.includes(i)) {
            result.push(i);
         }
      }
      return result;
   }
 
   calc_hidden_levels(force = false) {
      var all_width = (this.$dates.length)*this.scale.x;
      var visible_width = (this.$dates.length-this.hidden.length)*this.item_width;

      // Скрываем элементы
      if (force || this.prev_scale.x > this.scale.x) {
         var w = (all_width - visible_width)/this.visible.length;
         
         if (w <= 1) {
            var visible = this.visible.slice();
            this.hidden_levels.push([]);

            for (let i = 0; i < visible.length; i++) {
               if (Math.abs(i % 2) == 1) {
                  this.hidden_levels[this.hidden_levels.length-1].push(visible[i]);
               }
            }
         }

         if ((all_width - visible_width)/this.visible.length <= 1) {
            this.calc_hidden_levels(true);
         }
         return;
      }

      // Показываем элементы
      if(this.prev_scale.x < this.scale.x && this.hidden_levels.length > 0) {
         var w = (all_width - visible_width)/(this.hidden_levels[this.hidden_levels.length-1].length);
         
         if (w > this.item_width) {
            this.hidden_levels.splice(this.hidden_levels.length-1, 1);
         }
      }
   }
}