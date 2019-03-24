
export default class Input {
   
   constructor(scaffold) {
      let canvas = scaffold.canvas;
      this.x = null;
      this.y = null;
      this.down = false;
      this.event_down = false;

      var _this = this;

      // Мышь
      document.addEventListener('mousemove', function(e) {
         _this.el = null;
         if (e.target == canvas) {
            scaffold.need_update = true;
            _this.x = e.layerX;
            _this.y = e.layerY;
         } else {            
            scaffold.need_update = false;
            _this.x = null;
            _this.y = null;
         }

      });
      document.addEventListener('mousedown', function(e) {
         if (e.target == canvas) {
            _this.down = true;
         }
      });
      document.addEventListener('mouseup', function(e) {
         _this.el = null;

         if (e.target == canvas) {
            _this.down = false;
            _this.event_down = null;
         }
      });

      // Тач
      canvas.addEventListener('touchmove', function(e) {
         if (e.target == canvas) {
            var touch = e.targetTouches[0];
            
            _this.down = true;
            _this.x = touch.pageX - canvas.offsetLeft;
            _this.y = touch.pageY - canvas.offsetTop;
         }
      });
      document.addEventListener('touchend', function(e) {
         if (e.target == canvas) {
            _this.down = false;
         }
      });
   }

   get x() {
      return this._x;
   }

   set x(value) {
      if (this._x && this._prev_x != this._x) {
         this._prev_x = this._x;
      }
      this._x = value;
   }

   get direction() {
      let x = 'unknow';

      if (!this._prev_x || !this._x) {
         return {x};
      }

      if (this._prev_x > this._x) {
         x = 'left';
      }

      if (this._prev_x < this._x) {
         x = 'right';
      }

      return {x}
   }
}