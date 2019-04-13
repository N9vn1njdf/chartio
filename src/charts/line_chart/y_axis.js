import { Component, Animation } from 'core'
import { Position, Text, Rectangle } from 'elements'

export default class YAxis extends Component {

   /**
    * @override
    */
   $onTheme(theme) {
      this.color = theme.dates_text_color
      this.font_size = theme.text_size2
      this.font_family = theme.font_family
      this.item_width = this.font_size*3.5
      this.createDates()

      this.animation.duration = theme.dates_animation_duration
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

      this.color = theme.dates_text_color
      this.font_size = theme.text_size2
      this.font_family = theme.font_family
      this.item_width = this.font_size*3.5

      this.animation = new Animation({
         component: this,
         duration: theme.dates_animation_duration,
         curve: (time_fraction) => Math.pow(time_fraction, 1),
         handle: this.animate,
      })

      this.el = new Position({
         // y: this.$canvas.height - theme.map_height - theme.dates_height,
      })

      return new Rectangle({
         w: this.$canvas.width,
         h: this.$canvas.height - theme.map_height - theme.dates_height,
         ignoreInput: true,
         color: 'rgba(211,211,51,0.2)',
         child: this.el
      })
   }

   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale

      // this.$element.w = (this.$columns[0].length-2)*this.scale.x
      // this.$element.x = 11
      
      if (this.el.children.length == 0) {
         this.calcHidden(true)
         this.createItems()
      } else {
         // this.calcHidden()
         // this.updateDates()
      }
   }

   createItems() {
      let children = []
      
      for (let i = 1; i < this.$columns[0].length; i++) {
         let x = (i-1) * this.scale.x - this.font_size/5

         let text = new Text({
            alpha: this.hidden.includes(i-1) ? 0 : 1,
            x: 10,
            y: 12,
            text: 'test',
            size: this.font_size,
            fontFamily: this.font_family,
            color: this.color,
            align: 'center'
         })

         children.push(text)
      }

      this.el.children = children      
   }

   updateDates() {
      for (let i = 0; i < this.$element.children.length; i++) {
         let element = this.$element.children[i];

         element.x = i * this.scale.x - this.font_size/5
         
         if (this.hidden.includes(i)) {
            element.new_alpha = 0
         } else {
            element.new_alpha = 1
         }

         element.old_alpha = element.alpha
         element.alpha_fraction = element.new_alpha - element.alpha
      }

      this.animation.run()
   }

   animate(progress) {
      this.$element.children.forEach(element => {
         element.alpha = element.alpha_fraction * progress + element.old_alpha
      })
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
 
   calcHidden(force = false) {
      var all_width = (this.$dates.length)*this.scale.x;
      var visible_width = (this.$dates.length-this.hidden.length)*this.item_width;

      // Скрываем элементы
      if (force || this.prev_scale.x > this.scale.x) {
         var w = (all_width - visible_width)/this.visible.length;
         
         if (w <= 1) {
            var visible = this.visible.slice();
            this.hidden_levels.push([]);

            for (let i = 0; i < visible.length; i++) {
               if (i % 2 == 0) {
                  this.hidden_levels[this.hidden_levels.length-1].push(visible[i]);
               }
            }
         }

         if ((all_width - visible_width)/this.visible.length <= 1) {
            this.calcHidden(true);
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