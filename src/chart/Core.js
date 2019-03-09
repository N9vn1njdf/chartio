

class Events {

   constructor(canvas) {
      this.canvas = canvas;
      this.callback = {
         move: [],
         mousedown: [],
         mouseup: [],
      };
      
      var self = this;

      canvas.onmousemove = function(e) {
         for(let i in self.callback.move) {
            self.callback.move[i](e);
         }
      }
      canvas.onmousedown = function(e) {
         for(let i in self.callback.mousedown) {
            self.callback.mousedown[i](e);
         }
      }
      canvas.onmouseup = function(e) {
         for(let i in self.callback.mouseup) {
            self.callback.mouseup[i](e);
         }
      }
   }

   onMove(callback) {
      this.callback.move.push(callback);
   }

   onMouseDown(callback) {
      this.callback.mousedown.push(callback);
   }

   onMouseUp(callback) {
      this.callback.mouseup.push(callback);
   }
}









export default class Core {

   constructor(id, {width, height}) {
      var canvas = document.getElementById(id);
      this.width = canvas.width = width;
      this.height = canvas.height = height;
      var ctx = canvas.getContext("2d");

      this.objects = [];

      // =================================

      this.mouse = {x: 0, y: 0, down: false};

      var self = this;
      var events = new Events(canvas);
      events.onMove((e) => {
         self.mouse.x = e.layerX;
         self.mouse.y = e.layerY;
      });
      events.onMouseDown((e) => {
         self.mouse.down = true;
      });
      events.onMouseUp((e) => {
         self.mouse.down = false;
      });


      // ============================

      this.renderObjects(ctx);
   }

   renderObjects(ctx) {      
      ctx.clearRect(0, 0, this.width, this.height);

      let self = this;

      for(let i in self.objects) {
         self.objects[i].render(ctx);

         if (self.objects[i].isMove(self.mouse)) {
            self.objects[i].move = true;
            self.objects[i].$emit('move', self.mouse);
         } else if(self.objects[i].move) {
            self.objects[i].move = false;
            self.objects[i].$emit('leave', self.mouse);
         }
      }

      requestAnimationFrame(() => self.renderObjects(ctx));
   }

   add(object) {
      this.objects.push(object);
   }
}