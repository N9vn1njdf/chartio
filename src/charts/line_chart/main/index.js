import { Component } from 'core'
import { Position } from 'elements'
import Hover from './hover.js'
import YAxis from './y_axis.js'
import Columns from './columns.js'
import Lines from './lines.js'

export default class Main extends Component {

   // constructor() {
   //    // width -= 20
   //    // this.width = width;
   //    // this.height = height;

   //    // this.hover = new Hover({canvas, width, height, localeObserver, themeObserver, hiddenColumnsObserver});
   //    // this.y_axis = new YAxis({width, height, themeObserver});
   //    // this.lines = new Lines({width, height, themeObserver});
   // }
   
   /**
    * @override
    */
   $build(theme, locale) {
      this.columns = new Columns()

      return new Position({
         x: 10,
         children: [
            // this.lines.element,
            this.columns,
            // this.y_axis.element,
            // this.hover.element,
         ]
      })
   }

   onMapUpdate({offset, scale}) {
      // this.y_axis.update({offset, scale, columns});
      // this.lines.update({scale, columns});
      this.columns.onMapUpdate({offset, scale});
      // this.hover.update({offset, scale, columns, dates_column, colors, names});
   }
}