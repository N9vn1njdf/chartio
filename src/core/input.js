import Event from './event.js'

/**
 * 
 * Слой ввода данных.
 * Отвечает за прием событий ввода(мышь, тач), конвертацию и передачу в Scaffold
 * 
 */
export default class Input extends Event {
   
   constructor(scaffold) {
      super();
      this.canvas = scaffold.canvas;
      this.x = this.y = null;
      this.down = false;

      let _this = this;

      // Как только мышь покидает график, отрисовать еще 100мс для остаточных действий
      this.canvas.addEventListener('mouseout', () => scaffold.update())

      // Мышь
      document.addEventListener('mousemove', function(e) {         
         _this.el = null;
         _this.event = e;

         let rect = _this.canvas.getBoundingClientRect();
         _this.x = (e.x - rect.left)/100*120
         _this.y = (e.y - rect.top)/100*120         

         if (e.target == _this.canvas) {
            scaffold.update()
         } else if (document.mousedown_scaffold) {
            document.mousedown_scaffold.update()
         }
      });

      document.addEventListener('mousedown', function(e) {
         _this.event = e;
         document.mousedown_scaffold = scaffold
         
         if (e.target == _this.canvas) {
            _this.down = true;
            _this.emit('down', _this)
            scaffold.update()
         }
      });
      document.addEventListener('mouseup', function(e) {
         _this.el = null;
         _this.event = e;
         _this.event_down = false;
         document.mousedown_scaffold = null

         if (e.target == _this.canvas) {
            _this.down = false;
         }

         _this.emit('up', _this);
         scaffold.update()
      });

      // Тач
      this.canvas.addEventListener('touchmove', function(e) {
         if (e.target == _this.canvas) {
            var touch = e.targetTouches[0];
            
            _this.down = true;
            _this.x = touch.pageX - _this.canvas.offsetLeft;
            _this.y = touch.pageY - _this.canvas.offsetTop;
         }
      });
      document.addEventListener('touchend', function(e) {
         if (e.target == _this.canvas) {
            _this.down = false;
         }
      });
   }
}