import { Position, Rectangle, DragScaling } from 'elements'
import { Component } from 'core'

export default class Navigator extends Component {

   constructor({width, height, themeObserver}) {
      super()
   
      var navigator_width = 100

      // themeObserver.subscribe(theme => {
      //    if (this.navigator) {
      //       this.offset = width-navigator_width-theme.map_navigator_edge_width
      //       this.navigator.edgeWidth = theme.map_navigator_edge_width
      //       this.navigator.minWidth = theme.map_navigator_min_width >>> 0
      //       this.update(false)

      //       this.navigator.edgeColor = this.border[0].color = this.border[1].color = theme.map_color1
      //       this.background[0].color = this.background[1].color = theme.map_color2
      //    }
      // })

      this.navigator = new DragScaling({
         axisX: {min: 0, max: width},
         onUpdate: () => this.update(),
         w: navigator_width,
         h: height
      })
      
      this.background = [
         new Rectangle({h: height, border: {tr: 0, tl: 8, br: 0, bl: 8}, inputIgnore: true}),
         new Rectangle({h: height, border: {tr: 8, tl: 0, br: 8, bl: 0}, inputIgnore: true})
      ]

      this.border = [
         new Rectangle({h: 2}),
         new Rectangle({h: 2, y: height-2}),
      ]

      this.width = width
      this.height = height
   }

   $created(theme, locale) {
      console.log('navigator created');
   }

   $build() {
      console.log('navigator build');

      return new Position({
         w: this.width,
         h: this.height,
         children: [
            ...this.background,
            ...this.border,
            this.navigator,
         ]
      })
   }

   update(event = true) {
      this.background[0].w = this.offset + this.navigator.edgeWidth
      this.background[1].x = this.navigator.x + this.navigator.w
      this.background[1].w = this.width - this.background[1].x

      this.border[0].w = this.border[1].w = this.navigator.w
      this.border[0].x = this.border[1].x = this.navigator.x

      if (event) {
         this.emit('update')
      }
   }

   get width() {
      return this.navigator.w + this.navigator.edgeWidth*2
   }

   set width(value) {
      this.navigator.w = value
   }

   get offset() {
      return this.navigator.x - this.navigator.edgeWidth
   }

   set offset(value) {
      this.navigator.x = value
   }
}