
export default class Mouse {
   
   static init(canvas) {
      Mouse.canvas = canvas;
      Mouse.x = 0;
      Mouse.y = 0;
      Mouse.down = false;

      // Мышь
      document.onmousemove = function(e) {
         Mouse.x = e.layerX;
         Mouse.y = e.layerY;
      }
      document.onmousedown = function(e) {
         Mouse.down = true;
      }
      document.onmouseup = function(e) {
         Mouse.down = false;
      }

      // Тач
      canvas.ontouchmove = function(e) {
         var touch = e.targetTouches[0];

         Mouse.down = true;
         Mouse.x = touch.pageX;
         Mouse.y = touch.pageY;
      }

      document.ontouchend = function(e) {
         Mouse.down = false;
      }
   }

   static _handleMouse() {

   }
}