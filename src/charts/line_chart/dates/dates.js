import { Circle, Position, Text, Rectangle } from 'elements'
import { Visible } from 'animations'

export default class MainDates {

   constructor({item_width} = {}) {
      this.item_width = item_width || 80;
      this.data = [];

      this.hidden_levels = [
         // [1,3,5]
         // [2,6,10]
      ];

      this.element = new Position();
   }

   get offset() {
      return this.element.x;
   }

   set offset(value) {
      this.element.x = value;
   }

   get scale() {
      return this._scale;
   }

   set scale(value) {
      if (this._scale) {
         this._prev_scale = this._scale;
      }

      this._scale = value;

      if (this.data) {
         this.update();
      }
   }

   update() {      
      if (this.element.children.length > 0) {
         this.animate();
         return;
      }

      var children = [];

      for (let i = 0; i <= this.data.length; i++) {
         let rect = new Rectangle({
            x: (i * this.scale.x),
            w: this.item_width,
            children: [
               new Text({text: 'Mar ' + i, color: 'rgba(0, 0, 0, 0.4)', align: 'center'})
            ]
         });

         let child = new Visible({child: rect, duration: 320});
         children.push(child);
      }

      this.element.children = children;
      // this.animate();
   }

   animate() {
      this.element.w = (this.element.children.length-1)*this.scale.x;
      this.calc_hidden();

      for (let i = 0; i < this.element.children.length; i++) {
         let element = this.element.children[i];
         element.child.x = (i * this.scale.x);

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
      for (let i = 0; i < this.element.children.length; i++) {
         if (!this.hidden.includes(i)) {
            result.push(i);
         }
      }
      return result;
   }
 
   calc_hidden() {
      var all_width = (this.element.children.length)*this.scale.x;
      var visible_width = (this.element.children.length-this.hidden.length)*this.item_width;

      // Скрываем элементы
      if (this._prev_scale.x > this.scale.x) {
         var w = (all_width - visible_width)/(this.visible.length);
         
         if (w <= 1) {
            var visible = this.visible.slice();
            this.hidden_levels.push([]);

            for (let i = 0; i < visible.length; i++) {
               if (i%2) {
                  this.hidden_levels[this.hidden_levels.length-1].push(visible[i]);
               }
            }
         }
      }

      // Показываем элементы
      if(this._prev_scale.x < this.scale.x && this.hidden_levels.length > 0) {
         var w = (all_width - visible_width)/(this.hidden_levels[this.hidden_levels.length-1].length);

         if (w > this.item_width) {
            this.hidden_levels.splice(this.hidden_levels.length-1, 1);
         }
      }
   }
}