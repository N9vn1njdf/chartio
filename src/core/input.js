import Event from './event.js'

export default class Input extends Event {
   
   constructor(scaffold) {
      super();
      let canvas = scaffold.canvas;
      this.x = null;
      this.y = null;
      this.down = false;

      var _this = this;

      // Как только мышь покидает график, отрисовать еще 100мс для остаточных действий
      canvas.addEventListener('mouseout', () => scaffold.setNeedUpdate('mouseout', true, 100))

      // Мышь
      document.addEventListener('mousemove', function(e) {
         _this.el = null;

         var rect = canvas.getBoundingClientRect();
         _this.x = e.x - rect.left;
         _this.y = e.y - rect.top;

         if (e.target == canvas) {
            scaffold.setNeedUpdate('mousemove', true);
         } else {
            scaffold.setNeedUpdate('mousemove', false);
         }
      });

      document.addEventListener('mousedown', function(e) {
         if (e.target == canvas) {
            _this.down = true;
            _this.emit('down', _this);
            scaffold.setNeedUpdate('mousedown', true);
         }
      });
      document.addEventListener('mouseup', function(e) {
         _this.el = null;
      
         if (e.target == canvas) {
            _this.down = false;
         }

         _this.emit('up', _this);
         scaffold.setNeedUpdate('mousedown', false);
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