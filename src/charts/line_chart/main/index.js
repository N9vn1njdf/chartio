import { Component } from 'core'
import { Position } from 'elements'
import Hover from './hover.js'
import YAxis from './y_axis.js'
import Columns from './columns.js'

export default class Main extends Component {
   
   /**
    * @override
    */
   $build(theme, locale) {
      this.columns = new Columns()
      this.hover = new Hover()

      return new Position({
         children: [
            this.columns,
            this.hover,
         ]
      })
   }

   onMapUpdate({offset, scale}) {
      this.columns.onMapUpdate({offset, scale});
      this.hover.onMapUpdate({offset, scale});
   }
}