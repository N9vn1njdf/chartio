import { Position } from 'elements'
import YAxis from './y_axis.js'
import Columns from './columns.js'
import Lines from './lines.js'

export default class Main {

   constructor({width, height, themeObserver, hiddenColumnsObserver}) {
      this.width = width;
      this.height = height;

      this.y_axis = new YAxis({width, height, themeObserver});
      this.lines = new Lines({width, height, themeObserver});
      this.columns = new Columns({width, height, themeObserver, hiddenColumnsObserver});

      this.element = new Position({
         children: [
            this.lines.element,
            this.columns.element,
            this.y_axis.element,
         ]
      });
   }

   update({offset, scale, columns, colors}) {
      this.y_axis.update({scale, columns});
      this.lines.update({scale, columns});
      this.columns.update({offset, scale, columns, colors});
   }
}