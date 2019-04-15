import { Component, Animation, Curves } from 'core'
import { Position, Text, Rectangle, HorizontalLine } from 'elements'

export default class YAxis extends Component {

   constructor() {
      super()
   }

   /**
    * @override
    */
   $onTheme(theme) {
      this.color = theme.dates_text_color
      this.font_size = theme.text_size2
      this.font_family = theme.font_family
      this.item_width = this.font_size*3.5

      this.texts1.children = this.createTexts()
      this.texts2.children = this.createTexts()

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
      this.height = this.$canvas.height - theme.map_height - theme.dates_height
      this.margin = 20
      this.lines_count = 6

      


      this.hidden_levels = []

      this.color = theme.dates_text_color
      this.font_size = theme.text_size2
      this.font_family = theme.font_family
      this.item_width = this.font_size*3.5

      this.animation = new Animation({
         component: this,
         duration: theme.y_axis_animation_duration,
         curve: Curves.easeOutCubic,
         handle: this.animate,
      })

      this.width = this.$canvas.width - this.margin*2
      this.height = this.height - this.margin
      this.step = this.height / this.lines_count

      this.texts1 = new Position()
      this.texts2 = new Position()

      this.el = new Position({
         children: [
            this.texts1,
            this.texts2
         ]
      })

      return new Rectangle({
         x: this.margin,
         y: this.margin,
         w: this.width,
         h: this.height,
         child: this.el
      })
   }

   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale
      
      if (this.texts1.children.length == 0) {
         this.texts1.children = this.createTexts()
         this.texts2.children = this.createTexts()
      } else {
         this.updateTexts()
      }
   }

   getValueByIndex(i) {      
      i = (i * this.step + this.offset.y) / this.scale.y

      if (i > 1000000) {
         return (i/1000000).toFixed(1)+'М'
      }
      if (i > 1000) {
         return (i/1000).toFixed(1)+'К'
      }
      return (i) >> 0
   }

   createTexts() {
      let children = []

      for (let i = 1; i <= this.lines_count; i++) {
         let text = new Text({
            y: this.height - i * this.step - 20,
            text: this.getValueByIndex(i),
            size: this.font_size,
            fontFamily: this.font_family,
            color: this.color,
         })

         text.index = i

         children.push(text)
      }

      return children      
   }

   updateTexts() {
      let diff = this.prev_scale.y - this.scale.y

      let offset = diff * 300

      for (let i = 0; i < this.texts2.children.length; i++) {
         const text = this.texts2.children[i]

         let new_text = this.getValueByIndex(text.index)
         if (text.text == new_text) {
            return
         }

         text.text = new_text
         text.y = this.height - text.index * this.step - offset - 20
         text.alpha = 0
         text.new_alpha = 1

         this.calcAnimation(text, offset)
      }
   
      for (let i = 0; i < this.texts1.children.length; i++) {
         const text = this.texts1.children[i]

         text.y = this.height - text.index * this.step - 20
         text.alpha = 1
         text.new_alpha = 0

         this.calcAnimation(text, offset)
      }
      
      this.animation.run()
   }

   calcAnimation(text, n) {
      text.old_y = text.y
      text.new_y = text.y + n
      text.offset_y = text.new_y - text.y

      text.old_alpha = text.alpha
      text.alpha_fraction = text.new_alpha - text.alpha
   }

   animate(progress) {      
      this.texts1.children.forEach(text => {
         text.alpha = text.alpha_fraction * progress + text.old_alpha
         text.y = text.offset_y * progress + text.old_y
      })

      this.texts2.children.forEach(text => {
         text.alpha = text.alpha_fraction * progress + text.old_alpha
         text.y = text.offset_y * progress + text.old_y
      })
   }
}