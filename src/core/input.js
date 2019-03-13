
export default class Input {
   
   constructor(canvas) {
      this.x = 0;
      this.y = 0;
      this.down = false;
      this.event_down = false;

      var _this = this;

      // Мышь
      document.addEventListener('mousemove', function(e) {
         if (e.target == canvas) {
            _this.x = e.layerX;
            _this.y = e.layerY;
         }
      });
      document.addEventListener('mousedown', function(e) {
         if (e.target == canvas) {
            _this.down = true;
         }
      });
      document.addEventListener('mouseup', function(e) {
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
}