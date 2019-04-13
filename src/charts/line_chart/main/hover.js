import { Component } from 'core'
import { Position, Rectangle, Circle } from 'elements'
import { Popup } from 'components'

export default class Hover extends Component {

   /**
    * @override
    */
   $onTheme(theme) {
      // this.padding_bottom = theme.main_padding_bottom
      // this.background = theme.background
      // this.line.color = theme.line_color2

      // this.div.setAttribute('class', 'chart-popup ' + theme.name + '-theme')
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
      this.prev_input = {}
      this.r = 5

      this.padding = theme.main_padding
      this.background = theme.background
      this.height = this.$canvas.height - theme.date_height - theme.map_height - this.padding

      this.circles = new Position()
      this.line = new Rectangle({w: 1, h: this.height, color: theme.line_color2})
      
      this.popup = new Popup()

      let el = new Rectangle({
         y: this.padding,
         h: this.height,
         child: new Position({
            children: [
               this.line,
               this.circles,
               this.popup,
            ]
         })
      })
      el.on('move', (input, element) => this.onMove(input))
      el.on('leave', (input, element) => this.popup.hide())

      return el
   }

   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale

      this.$element.w = (this.$columns[0].length-2)*this.scale.x + this.$theme.main_margin
      this.$element.x = offset.x + this.$theme.main_margin

      if (this.circles.children.length == 0) {
         this.createCircles()
      } else {
         this.updateCircles()
      }
   }

   createCircles() {
      var children = []
      
      for (let c_i = 0; c_i < this.$columns.length; c_i++) {
         let column = this.$columns[c_i]

         for (let i = 1; i < column.length; i++) {
            if (i > column.length-1) {
               break
            }

            let circle = new Circle({
               alpha: 0,
               x: (i-1) * this.scale.x,
               y: this.height + this.offset.y - column[i] * this.scale.y,
               r: this.r,
               border: {w: this.r/2, color: this.$colors[column[0]]},
               color: this.background
            })

            circle.column_index = c_i
            circle.column_value = column[i]
            circle.index = i-1

            children.push(circle)
         }
      }

      this.circles.children = children
   }

   updateCircles() {
      if (this.prev_scale == this.scale) {
         return
      }

      let offset = this.height + this.offset.y

      this.circles.children.forEach(circle => {
         circle.x = circle.index * this.scale.x
         circle.y = offset - circle.column_value * this.scale.y
      })
   }

   onMove(input) {
      if (input.event.target !== this.$canvas) {
         this.popup.hide()
         return
      }

      if (input.x == this.prev_input.x && input.y == this.prev_input.y) {
         return
      }

      this.prev_input.x = input.x
      this.prev_input.y = input.y

      this.line.x = -this.$element.x + input.x
      this.line.alpha = 1

      let closerLeft = []
      let closerRight = []

      for(let i in this.circles.children) {
         let point = this.circles.children[i]
         if (this.$hidden_columns.includes(point.column_index)) {
            continue
         }

         let x = point.globalX

         if (x < input.x && (!closerLeft[point.column_index] || closerLeft[point.column_index].globalX < x)) {
            closerLeft[point.column_index] = point
         } else if (x > input.x && (!closerRight[point.column_index] || closerRight[point.column_index].globalX > x)) {
            closerRight[point.column_index] = point
         }

         point.alpha = 0
      }      

      
      if (!closerLeft[0] && !closerRight[0]) {
         this.popup.hide()
         return
      }


      if (closerRight[0] && (!closerLeft[0] || input.x - closerLeft[0].globalX >= closerRight[0].globalX - input.x)) {
         this.popup.show(closerRight[0].index, input)
         for(let i in closerRight) {
            closerRight[i].alpha = 1
         }
      } else {
         this.popup.show(closerLeft[0].index, input)
         for(let i in closerLeft) {
            closerLeft[i].alpha = 1
         }
      }
   }
}