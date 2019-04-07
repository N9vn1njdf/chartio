import { Text, Position } from 'elements'
import { FadeSlide } from 'animations'

export default class YAxis {

   constructor({width, height, themeObserver}) {
      this.width = width;
      this.height = height;
      this.data = [];

      this.lines = {
         top: new Position({w: width}),
         bottom: new Position({w: width}),
      };

      this.padding_top = 0;
      this.padding_bottom = 0;

      themeObserver.subscribe(theme => {
         this.padding_top = theme.main_padding_top;
         this.padding_bottom = theme.main_padding_bottom;
         this.lines_count = theme.lines_count-1;
         this.step = (this.height-30)/this.lines_count;
         this.color = this.bottom_text.color = theme.text_color1;
         this.font_size = this.bottom_text.size = theme.text_size1;
         this.font_family = this.bottom_text.fontFamily = theme.font_family;

         this.duration = theme.animation_duration_2;

         if (this.scale) {
            this.createLines()
         }
      })
      
      this.bottom_text =  new Text({
         y: this.height - 15,
         text: 0,
         size: this.font_size,
         fontFamily: this.font_family,
         color: this.color
      });

      this.element = new Position({
         children: [
            this.lines.top,
            this.lines.bottom,
            this.bottom_text
         ]
      });
   }

   update({offset, scale, columns}) {
      this.element.x = 0;
      this.offset = offset;
      this.prev_scale = this.scale;
      this.scale = scale;
      this.columns = columns;
            
      if (this.prev_scale) {
         this.animateDirection();
      } else {
         this.createLines();
      }
   }

   calc(i) {
      i = (i*this.step+this.offset.y-this.padding_bottom)/this.scale.y;

      if (i > 1000000) {
         return (i/1000000).toFixed(1)+'М'
      }
      if (i > 1000) {
         return (i/1000).toFixed(1)+'К'
      }
      return (i) >> 0;
   }

   createLines() {
      this.data = [];
      for (let i = 1; i <= this.lines_count; i++) {
         this.data.push(this.calc(i));
      }
      this.lines.top.children = this.getLinesGroup(0, 0, this.data);      
   }

   animateDirection() {
      // if (this.lines.top.children.running) {
      //    return;
      // }

      if (this.prev_scale.y < this.scale.y) {
         this.animateFrom('bottom');
      }
      
      if (this.prev_scale.y > this.scale.y) {
         this.animateFrom('top');
      }

      this.data = [];
      for (let i = 1; i <= this.lines_count; i++) {
         this.data.push(this.calc(i));
      }
   }

   animateFrom(from) {
      let to = from == 'top' ? 'bottom' : 'top';
      
      let data = []
      for (let i = 1; i <= this.lines_count; i++) {
         data.push(this.calc(i));
      }

      this.lines[from].children = this.getLinesGroup(-120, -120, to == 'top' ? this.data : data);
      this.lines[to].children = this.getLinesGroup(22, 20, to == 'bottom' ? this.data : data);
      
      this.lines.top.children.forEach(element => {
         element.completed = true
         element.reverse()
      });

      this.lines.bottom.children.forEach(element => {
         element.forward()
      });
   }

   getLinesGroup(offset, m, data) {
      var children = [];      
      
      for (let i = 1; i <= this.lines_count; i++) {
         children.push(new FadeSlide({
            child: new Text({
               y: this.height-i*this.step-15,
               text: data[i-1],
               size: this.font_size,
               fontFamily: this.font_family,
               color: this.color
            }),
            offset: (i*m)+offset,
            duration: this.duration,
         }));
      }

      return children;
   }
}