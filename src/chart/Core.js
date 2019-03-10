
export default class Core {

   constructor({id, width, height, children}) {
      var canvas = document.getElementById(id);
      this.width = canvas.width = width;
      this.height = canvas.height = height;
      this._handleMouse(canvas);

      this.children = children;

      var ctx = canvas.getContext("2d");
      this._renderObjects(ctx);
   }

   _handleMouse(canvas) {
            
      this.mouse = {x: 0, y: 0, down: false};
      var self = this;

      // Мышь
      canvas.onmousemove = function(e) {
         self.mouse.x = e.layerX;
         self.mouse.y = e.layerY;
      }
      canvas.onmousedown = function(e) {
         self.mouse.down = true;
      }
      canvas.onmouseup = function(e) {
         self.mouse.down = false;
      }

      // Тач
      canvas.ontouchmove = function(e) {
         var touch = e.targetTouches[0];

         self.mouse.down = true;
         self.mouse.x = touch.pageX;
         self.mouse.y = touch.pageY;
      }

      canvas.ontouchend = function(e) {
         self.mouse.down = false;
      }
   }

   _renderObjects(ctx) {
      ctx.clearRect(0, 0, this.width, this.height);

      let self = this;

      for(let i in self.children) {
         let object = self.children[i];
         object.render(ctx, {mouse: self.mouse});
      }

      requestAnimationFrame(() => self._renderObjects(ctx));
   }

   // Добавить объект на холст
   add(object) {
      this.children.push(object);
   }
}