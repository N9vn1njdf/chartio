import { Component } from 'core'
import { Position, Rectangle, Circle } from 'elements'
import { Popup } from 'components'

export default class Hover extends Component {

   constructor({showCircles, showLine}) {
      super()

      this.showCircles = showCircles
      this.showLine = showLine
   }

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
      this.height = this.$canvas.height - theme.dates_height - theme.map_height - this.padding

      this.circles = new Position()
      this.line = new Rectangle({alpha: 0, w: this.showLine ? 1 : 0, h: this.height, color: theme.line_color2})
      
      this.popup = new Popup()

      let el = new Rectangle({
         y: this.padding,
         h: this.height,
         child: new Position({
            x: this.$theme.main_margin,
            children: [
               this.line,
               this.circles,
               this.popup,
            ]
         })
      })
      el.on('move', (input, element) => this.onMove(input))
      el.on('leave', (input, element) => this.hide())

      return el
   }

   onMapUpdate({offset, scale}) {
      this.offset = offset
      this.prev_scale = this.scale
      this.scale = scale

      this.$element.w = (this.$columns[0].length-2)*this.scale.x + this.$theme.main_margin*2
      this.$element.x = offset.x

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
               color: this.showCircles ? this.background : null
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

   show() {
      for(let i in this.hover_points) {
         this.hover_points[i].alpha = 1
      }
      this.popup.show(this.hover_points[0].index, this.$scaffold.input)
      this.emit('move', this.hover_points[0].index)
   }

   hide() {
      this.emit('leave')
      for(let i in this.hover_points) {
         this.hover_points[i].alpha = 0
      }
      this.popup.hide()
      this.line.alpha = 0
      this.$update()
   }

   onMove(input) {
      if (input.event.target !== this.$canvas) {
         this.hide()
         return
      }

      if (input.x == this.prev_input.x && input.y == this.prev_input.y) {
         return
      }

      this.prev_input.x = input.x
      this.prev_input.y = input.y

      this.line.x = -this.$element.x + input.x - this.$theme.main_margin
      this.line.alpha = 1

      let closerLeft = []
      let closerRight = []

      for(let i in this.circles.children) {
         let circle = this.circles.children[i]
         if (this.$hidden_columns.includes(circle.column_index)) {
            continue
         }

         let x = circle.globalX

         // Бижайшие слева и справа
         if (x < input.x && (!closerLeft[circle.column_index] || closerLeft[circle.column_index].globalX < x)) {
            closerLeft[circle.column_index] = circle
         } else if (x > input.x && (!closerRight[circle.column_index] || closerRight[circle.column_index].globalX > x)) {
            closerRight[circle.column_index] = circle
         }

         circle.alpha = 0
      }
      
      if (!closerLeft[0] && !closerRight[0]) {
         this.hide()
         return
      }

      // Ближайшая точка
      if (closerRight[0] && (!closerLeft[0] || input.x - closerLeft[0].globalX >= closerRight[0].globalX - input.x)) {
         this.hover_points = closerRight
      } else {
         this.hover_points = closerLeft
      }

      this.show()
   }
}