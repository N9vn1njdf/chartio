import Core from './Core.js'
import { Rect } from './objects'

class Chart {

   constructor(id, width, height) {
      this.width = width;
      this.height = height;

      this.chart_render = this._generateChart();
      this.map_render = this._generateMap();
      this.map_nav_render = this._generateMapNavigator();

      return new Core({
         id: id,
         width: width,
         height: height,
         children: [
            this.chart_render,
            this.map_render,
            this.map_nav_render,
         ]
      });
   }

   _generateMapNavigator() {
      var chart = this.chart_render;

      var rect2_x_start = chart.x;
      var start_rect3 = this.width-200;

      let map = new Rect({
         x: start_rect3,
         y: this.height-50,
         w: 180,
         h: 50,
         color: "rgba(0, 0, 255, 0.2)",
         draggable: {x: true, y: false},
      })
      .$on('move', (mouse) => {         
         map.color = "rgba(0, 0, 255, 0.4)";
      })
      .$on('leave', (mouse) => {         
         map.color = "rgba(0, 0, 255, 0.2)";
      })
      .$on('dragging', (mouse) => {

         let visible = {
            start: map.x/0.3,
            end: map.x+map.w/0.3
         }

         console.log(visible);
         

         chart.x = map.x*-2.5;
         // chart.x = (start_rect3 - map.x+rect2_x_start)*-1.51;
      });

      return map;
   }

   _generateMap() {
      var coefficient = 0.3;

      var children = [];

      var d = this.width/this.chart_render.w;
      console.log(this.chart_render.w);
      
      for (let index = 0; index < 35; index++) {
         let rect = new Rect({
            x: 10+(index*55)*d,
            y: 0+(index%2 ? 30 : 100)*d,
            w: 50*d,
            h: 50*d,
            color: "rgba(0, 0, 0, 0.4)",
         });

         children.push(rect);
      }

      return new Rect({
         x: 0,
         y: this.height-50,
         w: this.width,
         h: 50,
         color: "rgba(110, 110, 100, 0.1)",
         children: [
            new Rect({
               x: 0,
               y: 0,
               w: this.width,
               h: 50,
               color: "rgba(0, 255, 0, 0.2)",
               children: children
            })
         ]
      });
   }

   _generateChart() {
      var coefficient = 1.0;

      var children = [];

      for (let index = 0; index < 35; index++) {
         let rect = new Rect({
            x: 10+(index*55)*coefficient,
            y: 10+(index%2 ? 30 : 100),
            w: 50*coefficient,
            h: 50*coefficient,
            color: "rgba(0, 0, 0, 0.4)",

         }).$on('move', (mouse) => {            
            rect.color = 'rgba(0, 0, 0, 0.5)';         
            if (mouse.down) {
               rect.color = 'rgba(0, 0, 0, 0.8)';
            }
         }).$on('leave', (mouse) => {
            rect.color = 'rgba(0, 0, 0, 0.4)';
         });

         children.push(rect);
      }

      return new Rect({
         x: -55*12, 
         y: 66, 
         w: children.length*60, 
         h: 200,
         color: "rgba(0, 255, 0, 0.2)",
         children: children
      });
   }
}

export default Chart