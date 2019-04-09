import { Component } from 'core'
import { LinesGroup, Line, Rectangle, Position } from 'elements'
import { Slide } from 'animations'
import { Navigator } from 'components'

export default class Map extends Component {

   constructor({map_height, main_height}) {
      super()

      this.map_height = map_height
      this.padding_top = 0
      this.padding_bottom = 0

      this.main_height = main_height
      this.main_padding_top = 0
      this.main_padding_bottom = 0

      this.dates_column = []
      this.columns = []
      this.hidden_columns = []
      this.colors = {}
      this.names = {}
      this.main_scale_y = 1
      this.map_scale_y = 1
      this.duration = 200

      // localeObserver.subscribe(locale => {
      //    this.locale = locale
      //    this.createLines()
      // })

      // themeObserver.subscribe(theme => {
      //    this.main_padding_top = theme.main_padding_top
      //    this.main_padding_bottom = theme.main_padding_bottom
      //    this.padding_top = theme.map_padding_top
      //    this.padding_bottom = theme.map_padding_bottom

      //    this.duration = theme.animation_duration_4
      //    this.caclMapYScale()
      //    this.createLines()
         
      //    if (this.columns.length > 0) {
      //       this.emitUpdate()
      //    }
      // })

      // hiddenColumnsObserver.subscribe(([act, index]) => {
      //    if (act == 'hide' && this.visible_columns.length > 1) {
      //       this.hidden_columns.push(index)
      //       this.caclMapYScale()
      //       this.hideColumn(index)
      //       this.emitUpdate()
      //    }

      //    if (act == 'show') {
      //       let has = false
      //       for(let i in this.hidden_columns) {
      //          if (this.hidden_columns.includes(index)) {
      //             has = true
      //             this.hidden_columns.splice(i, 1)
      //          }
      //       }

      //       if (has) {
      //          this.hidden_columns_count--
      //          this.caclMapYScale()
      //          this.showColumn(index)
      //          this.emitUpdate()
      //       }
      //    }
      // })
   }

   $onTheme(theme) {
      this.main_padding_top = theme.main_padding_top
      this.main_padding_bottom = theme.main_padding_bottom
      this.padding_top = theme.map_padding_top
      this.padding_bottom = theme.map_padding_bottom

      this.duration = theme.animation_duration_4
      this.caclMapYScale()
      this.createLines()
      
      if (this.columns.length > 0) {
         this.emitUpdate()
      }
   }

   $onData({columns, colors, names}) {      
      columns = columns.slice()
      this.dates_column = columns[0]
      this.columns = columns.splice(1, columns.length)
      this.colors = colors
      this.names = names

      this.caclMapYScale()
      this.createLines()
      this.emitUpdate()
   }

   $onHideColumn(index) {      
      // this.caclMapYScale()
      this.hideColumn(index)
      this.$update()
   }

   $onShowColumn(index) {      
      // this.caclMapYScale()
      this.showColumn(index)
      this.$update()
   }

   $build(theme, locale) {
      this.navigator = new Navigator({width: this.$canvas.width, height: this.map_height})
      this.navigator.on('update', () => this.emitUpdate())

      this.lines_groups = new Position()
      this.$onTheme(theme)

      this.lines_groups2 = new Rectangle({w: 100, h: 100, color: 'red'})
      
      return new Rectangle({
         // clip: true,
         y: this.$canvas.height - this.map_height,
         w: this.$canvas.width,
         h: this.map_height,
         child: new Position({
            children: [
               this.lines_groups,
               this.navigator,
            ]
         }),
      })
   }

   emitUpdate() {
      if (this.scale) {
         this.caclMainYScale()
      }
   }

   get main_offset() {
      return {
         x: -this.navigator.offset * ((this.scale.x * this.$canvas.width / this.navigator.scale) / this.scale.x),
         y: this.main_offset_y || 0
      }
   }

   get main_scale() {
      return {
         x: this.scale.x * (this.$canvas.width-5) / this.navigator.scale,
         y: this.main_scale_y,
      }
   }

   get update_data() {
      return {
         offset: this.main_offset,
         scale: this.main_scale,
         dates_column: this.dates_column,
         columns: this.columns,
         colors: this.colors,
         names: this.names,
      }
   }

   get scale() {      
      return {
         x: this.data_count > 0 ? this.$canvas.width/this.data_count : 0,
         y: this.map_scale_y
      }
   }

   get data_count() {
      return this.columns[0] ? this.columns[0].length-2 : 0
   }

   get visible_columns() {
      var result = []
      
      for (let i = 0; i < this.columns.length; i++) {
         if (!this.hidden_columns.includes(i)) {
            result.push(i)
         }
      }
      return result
   }

   hideColumn(index) {
      this.lines_groups.children.forEach(lines_group => {
         lines_group.children.forEach(line => {
            if (line.column_index == index) {
               line.alpha = 0
               // slide.toAlpha(0)
            }
         })
      })
   }

   showColumn(index) {
      this.lines_groups.children.forEach(lines_group => {
         lines_group.children.forEach(line => {
            if (line.column_index == index) {
               // slide.toAlpha(1)
               line.alpha = 1
            }
         })
      })
   }

   updateLines() {
      this.lines_groups.children.forEach(lines_group => {
         for (let i = 0; i < lines_group.children.length; i++) {
            const slide = lines_group.children[i]
            const slide2 = lines_group.children[i+1]

            if (!slide2) {
               continue
            }

            if (slide2 && slide.column_index == slide2.column_index) {
               // slide.child._x2 = slide2.child._x
               // slide.child._y2 = slide2.child._y
            }
         }
      })
   }

   createLines() {
      var children = []
      let offset = this.map_height + this.min_y * this.scale.y - this.padding_bottom

      for (let c_i = 0; c_i < this.columns.length; c_i++) {
         let column = this.columns[c_i]

         let group = new LinesGroup({lineWidth: 1.5, color: this.colors[column[0]]})
         let lines = []

         for (let i = 1; i < column.length; i++) {
            if (!column[i+1]) {
               break
            }

            let y = column[i] * this.scale.y
            let y2 = column[i+1] * this.scale.y
            
            let child = 
            // new Slide({
            //    child: 
               new Line({
                  x: (i-1) * this.scale.x,
                  y: offset - y,
                  x2: i * this.scale.x,
                  y2: offset - y2,
               })
            //    ,
            //    duration: this.duration,
            //    onProgress: () => this.updateLines()
            // })

            child.column_index = c_i
            child.column_value = column[i]

            lines.push(child)
         }
         
         group.children = lines
         children.push(group)
      }
      
      this.lines_groups.children = children
      console.log(this.lines_groups.children);
      
   }

   // Вычисляем Y масштаб для миникарты
   caclMapYScale() {
      let items = []
      
      for (let i = 0; i < this.columns.length; i++) {
         if (!this.hidden_columns.includes(i)) {
            this.columns[i].forEach(element => items.push(element))
         }
      }
      
      let min_max = this.getMinMaxY(items)
      this.min_y = min_max.min
      this.map_scale_y = (this.map_height-this.padding_top-this.padding_bottom)/(min_max.max - min_max.min)

      this.animateDirection()
   }

   animateDirection() {
      this.lines_groups.children.forEach(lines_group => {
         lines_group.children.forEach(slide => {
            let offset = this.map_height + this.min_y * this.scale.y - this.padding_bottom
            let y = slide.column_value * this.scale.y

            slide.completed = false
            // slide.offset = -(slide.child._y - (offset-y))            
            slide.forward()
         })
      })
   }

   // Вычисляем Y масштаб для основного графика
   caclMainYScale() {
      var visible_items = []
      let s = this.scale.x * 2

      for (let c = 0; c < this.columns.length; c++) {
         if (this.hidden_columns.includes(c)) {
            continue
         }
         
         for (let i = 1; i < this.columns[c].length; i++) {
            let item_x = (i-1) * this.scale.x
            
            if (this.navigator.offset < item_x + s && this.navigator.offset + this.navigator.scale > item_x - s) {
               visible_items.push(this.columns[c][i])
            }
         }
      }

      let min_max = this.getMinMaxY(visible_items)

      this.main_scale_y = (this.main_height-this.main_padding_top-this.main_padding_bottom)/(min_max.max - min_max.min)
      this.main_offset_y = this.main_scale_y * min_max.min

      this.emit('update', this.update_data)
   }

   getMinMaxY(items) {
      let min = items.length == 0 ? 0 : items[items.length-1]
      let max = 0

      items.forEach(element => {
         max = element > max ? element : max
         min = element < min ? element : min
      })

      return {min, max}
   }
}