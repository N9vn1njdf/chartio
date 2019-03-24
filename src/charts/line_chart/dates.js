import { Position, Text, Rectangle } from 'elements'
import { Fade } from 'animations'

export default class Dates {

   constructor({localeObserver, themeObserver}) {
      this.dates = [];
      this.hidden_levels = [];
      
      this.element = new Position();

      localeObserver.subscribe(locale => {         
         this.locale = locale;
         this.element.children = [];
         this.createDates();
      })
      
      themeObserver.subscribe(theme => {
         if (this.element) {
            this.color = theme.text_color2;
            this.font_size = theme.text_size2;
            this.font_family = theme.font_family
            this.duration = theme.animation_duration_3;

            this.element.children = [];
            this.createDates();
         }
      })
   }

   update({offset, scale, dates_column}) {
      this.element.x = offset.x + 20;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.dates = dates_column;

      if (this.element.children.length == 0) {
         this.calc_hidden_levels(true);
         this.createDates();
      } else {
         this.animate();
      }
   }

   get item_width() {
      return this.font_size*5;
   }

   createDates() {
      if (!this.locale) {
         return
      }

      var children = [];
      
      for (let i = 1; i < this.dates.length; i++) {
         let date = new Date(this.dates[i]);
         let d = date.getDate();
         let m = this.locale.month[date.getMonth()];
         
         let rect = new Rectangle({
            alpha: !this.hidden.includes(i-1) ? 1 : 0,
            x: (i-1) * this.scale.x + (i == 1 ? 0 : -20) + (i+1 == this.dates.length ? -20 : 0),
            w: this.item_width,
            children: [
               new Text({text: `${m} ${d}`, size: this.font_size, fontFamily: this.font_family, color: this.color, align: 'center'})
            ]
         });
         
         let child = new Fade({child: rect, duration: this.duration, completed: this.hidden.includes(i-1)});
         children.push(child);
      }

      this.element.children = children;
   }

   animate() {
      this.element.w = (this.element.children.length-1)*this.scale.x;
      this.calc_hidden_levels();

      for (let i = 0; i < this.element.children.length; i++) {
         let element = this.element.children[i];
         element.child.x = i * this.scale.x + (i == 0 ? 0 : -20) + (i+1 == this.element.children.length ? -20 : 0);
         
         if (this.hidden.includes(i)) {
            element.forward();
         } else {
            element.reverse();
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
      for (let i = 0; i < this.dates.length; i++) {
         if (!this.hidden.includes(i)) {
            result.push(i);
         }
      }
      return result;
   }
 
   calc_hidden_levels(force = false) {
      var all_width = (this.dates.length)*this.scale.x;
      var visible_width = (this.dates.length-this.hidden.length)*this.item_width;

      // Скрываем элементы
      if (force || this.prev_scale.x > this.scale.x) {
         var w = (all_width - visible_width)/this.visible.length;
         
         if (w <= 1) {
            var visible = this.visible.slice();
            this.hidden_levels.push([]);

            for (let i = 0; i < visible.length; i++) {
               if (i%2 == 0) {
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