/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chart/Chart.js":
/*!****************************!*\
  !*** ./src/chart/Chart.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _Core = __webpack_require__(/*! ./Core.js */ \"./src/chart/Core.js\");\n\nvar _Core2 = _interopRequireDefault(_Core);\n\nvar _objects = __webpack_require__(/*! ./objects */ \"./src/chart/objects/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Chart = function () {\n   function Chart(id, width, height) {\n      _classCallCheck(this, Chart);\n\n      this.width = width;\n      this.height = height;\n\n      this.chart_render = this._generateChart();\n      this.map_render = this._generateMap();\n      this.map_nav_render = this._generateMapNavigator();\n\n      return new _Core2.default({\n         id: id,\n         width: width,\n         height: height,\n         children: [this.chart_render, this.map_render, this.map_nav_render]\n      });\n   }\n\n   _createClass(Chart, [{\n      key: '_generateMapNavigator',\n      value: function _generateMapNavigator() {\n         var chart = this.chart_render;\n\n         var rect2_x_start = chart.x;\n         var start_rect3 = this.width - 200;\n\n         var map = new _objects.Rect({\n            x: start_rect3,\n            y: this.height - 50,\n            w: 180,\n            h: 50,\n            color: \"rgba(0, 0, 255, 0.2)\",\n            draggable: { x: true, y: false }\n         }).$on('move', function (mouse) {\n            map.color = \"rgba(0, 0, 255, 0.4)\";\n         }).$on('leave', function (mouse) {\n            map.color = \"rgba(0, 0, 255, 0.2)\";\n         }).$on('dragging', function (mouse) {\n\n            var visible = {\n               start: map.x / 0.3,\n               end: map.x + map.w / 0.3\n            };\n\n            console.log(visible);\n\n            chart.x = map.x * -2.5;\n            // chart.x = (start_rect3 - map.x+rect2_x_start)*-1.51;\n         });\n\n         return map;\n      }\n   }, {\n      key: '_generateMap',\n      value: function _generateMap() {\n         var coefficient = 0.3;\n\n         var children = [];\n\n         var d = this.width / this.chart_render.w;\n         console.log(this.chart_render.w);\n\n         for (var index = 0; index < 35; index++) {\n            var rect = new _objects.Rect({\n               x: 10 + index * 55 * d,\n               y: 0 + (index % 2 ? 30 : 100) * d,\n               w: 50 * d,\n               h: 50 * d,\n               color: \"rgba(0, 0, 0, 0.4)\"\n            });\n\n            children.push(rect);\n         }\n\n         return new _objects.Rect({\n            x: 0,\n            y: this.height - 50,\n            w: this.width,\n            h: 50,\n            color: \"rgba(110, 110, 100, 0.1)\",\n            children: [new _objects.Rect({\n               x: 0,\n               y: 0,\n               w: this.width,\n               h: 50,\n               color: \"rgba(0, 255, 0, 0.2)\",\n               children: children\n            })]\n         });\n      }\n   }, {\n      key: '_generateChart',\n      value: function _generateChart() {\n         var coefficient = 1.0;\n\n         var children = [];\n\n         var _loop = function _loop(index) {\n            var rect = new _objects.Rect({\n               x: 10 + index * 55 * coefficient,\n               y: 10 + (index % 2 ? 30 : 100),\n               w: 50 * coefficient,\n               h: 50 * coefficient,\n               color: \"rgba(0, 0, 0, 0.4)\"\n\n            }).$on('move', function (mouse) {\n               rect.color = 'rgba(0, 0, 0, 0.5)';\n               if (mouse.down) {\n                  rect.color = 'rgba(0, 0, 0, 0.8)';\n               }\n            }).$on('leave', function (mouse) {\n               rect.color = 'rgba(0, 0, 0, 0.4)';\n            });\n\n            children.push(rect);\n         };\n\n         for (var index = 0; index < 35; index++) {\n            _loop(index);\n         }\n\n         return new _objects.Rect({\n            x: -55 * 12,\n            y: 66,\n            w: children.length * 60,\n            h: 200,\n            color: \"rgba(0, 255, 0, 0.2)\",\n            children: children\n         });\n      }\n   }]);\n\n   return Chart;\n}();\n\nexports.default = Chart;\n\n//# sourceURL=webpack:///./src/chart/Chart.js?");

/***/ }),

/***/ "./src/chart/Core.js":
/*!***************************!*\
  !*** ./src/chart/Core.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Core = function () {\n   function Core(_ref) {\n      var id = _ref.id,\n          width = _ref.width,\n          height = _ref.height,\n          children = _ref.children;\n\n      _classCallCheck(this, Core);\n\n      var canvas = document.getElementById(id);\n      this.width = canvas.width = width;\n      this.height = canvas.height = height;\n      this._handleMouse(canvas);\n\n      this.children = children;\n\n      var ctx = canvas.getContext(\"2d\");\n      this._renderObjects(ctx);\n   }\n\n   _createClass(Core, [{\n      key: \"_handleMouse\",\n      value: function _handleMouse(canvas) {\n\n         this.mouse = { x: 0, y: 0, down: false };\n         var self = this;\n\n         // Мышь\n         canvas.onmousemove = function (e) {\n            self.mouse.x = e.layerX;\n            self.mouse.y = e.layerY;\n         };\n         canvas.onmousedown = function (e) {\n            self.mouse.down = true;\n         };\n         canvas.onmouseup = function (e) {\n            self.mouse.down = false;\n         };\n\n         // Тач\n         canvas.ontouchmove = function (e) {\n            var touch = e.targetTouches[0];\n\n            self.mouse.down = true;\n            self.mouse.x = touch.pageX;\n            self.mouse.y = touch.pageY;\n         };\n\n         canvas.ontouchend = function (e) {\n            self.mouse.down = false;\n         };\n      }\n   }, {\n      key: \"_renderObjects\",\n      value: function _renderObjects(ctx) {\n         ctx.clearRect(0, 0, this.width, this.height);\n\n         var self = this;\n\n         for (var i in self.children) {\n            var object = self.children[i];\n            object.render(ctx, { mouse: self.mouse });\n         }\n\n         requestAnimationFrame(function () {\n            return self._renderObjects(ctx);\n         });\n      }\n\n      // Добавить объект на холст\n\n   }, {\n      key: \"add\",\n      value: function add(object) {\n         this.children.push(object);\n      }\n   }]);\n\n   return Core;\n}();\n\nexports.default = Core;\n\n//# sourceURL=webpack:///./src/chart/Core.js?");

/***/ }),

/***/ "./src/chart/index.js":
/*!****************************!*\
  !*** ./src/chart/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _Chart = __webpack_require__(/*! ./Chart.js */ \"./src/chart/Chart.js\");\n\nvar _Chart2 = _interopRequireDefault(_Chart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _Chart2.default;\n\n//# sourceURL=webpack:///./src/chart/index.js?");

/***/ }),

/***/ "./src/chart/objects/ChartObject.js":
/*!******************************************!*\
  !*** ./src/chart/objects/ChartObject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ChartObject = function () {\n   function ChartObject(children) {\n      _classCallCheck(this, ChartObject);\n\n      this.events = {};\n\n      this.children = children || [];\n\n      for (var i in this.children) {\n         this.children[i]._x = this.children[i].x;\n         this.children[i]._y = this.children[i].y;\n      }\n   }\n\n   _createClass(ChartObject, [{\n      key: '$on',\n      value: function $on(type, callback) {\n         if (!this.events[type]) {\n            this.events[type] = [];\n         }\n         this.events[type].push(callback);\n\n         return this;\n      }\n   }, {\n      key: '$emit',\n      value: function $emit(type, data) {\n         for (var i in this.events[type]) {\n            this.events[type][i].call({ 'asd': 12 }, data);\n         }\n      }\n   }, {\n      key: '_handleDragging',\n      value: function _handleDragging(mouse) {\n         if (!mouse.down) {\n            this._drag = false;\n            this._drag_offset = null;\n            return;\n         }\n\n         if (!this._drag_offset) {\n            this._drag_offset = { x: mouse.x - this.x, y: mouse.y - this.y };\n         }\n\n         if (this.draggable.y) {\n            this.y = mouse.y - this._drag_offset.y;\n         }\n\n         if (this.draggable.x) {\n            this.x = mouse.x - this._drag_offset.x;\n         }\n\n         this.$emit('dragging', mouse);\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, _ref) {\n         var mouse = _ref.mouse;\n\n\n         if (this.isHover(mouse)) {\n            this.move = true;\n            this.$emit('move', mouse);\n\n            if (this.draggable && mouse.down) {\n               this._drag = true;\n            }\n         } else {\n            if (this.move) {\n               this.move = false;\n               this.$emit('leave', mouse);\n            }\n         }\n\n         // Обработка перетаскиваний\n         if (this._drag) {\n            this._handleDragging(mouse);\n         }\n\n         // Рендер дочерних объектов\n         var self = this;\n\n         for (var i in self.children) {\n            var object = self.children[i];\n\n            object.x = self.x + object._x;\n            object.y = self.y + object._y;\n\n            object.render(ctx, { mouse: mouse });\n         }\n      }\n   }]);\n\n   return ChartObject;\n}();\n\nexports.default = ChartObject;\n\n//# sourceURL=webpack:///./src/chart/objects/ChartObject.js?");

/***/ }),

/***/ "./src/chart/objects/Rect.js":
/*!***********************************!*\
  !*** ./src/chart/objects/Rect.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _ChartObject2 = __webpack_require__(/*! ./ChartObject.js */ \"./src/chart/objects/ChartObject.js\");\n\nvar _ChartObject3 = _interopRequireDefault(_ChartObject2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Rect = function (_ChartObject) {\n   _inherits(Rect, _ChartObject);\n\n   function Rect(_ref) {\n      var _ret;\n\n      var x = _ref.x,\n          y = _ref.y,\n          w = _ref.w,\n          h = _ref.h,\n          color = _ref.color,\n          draggable = _ref.draggable,\n          children = _ref.children;\n\n      _classCallCheck(this, Rect);\n\n      var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, children));\n\n      _this.x = x;\n      _this.y = y;\n      _this.w = w;\n      _this.h = h;\n      _this.color = color || \"rgba(255, 255, 255, 1)\";\n      _this.draggable = draggable || null;\n\n      return _ret = _this, _possibleConstructorReturn(_this, _ret);\n   }\n\n   _createClass(Rect, [{\n      key: \"isHover\",\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;\n      }\n   }, {\n      key: \"render\",\n      value: function render(ctx, _ref3) {\n         var mouse = _ref3.mouse;\n\n         _get(Rect.prototype.__proto__ || Object.getPrototypeOf(Rect.prototype), \"render\", this).call(this, ctx, { mouse: mouse });\n\n         ctx.fillStyle = this.color;\n         ctx.fillRect(this.x, this.y, this.w, this.h);\n      }\n   }]);\n\n   return Rect;\n}(_ChartObject3.default);\n\nexports.default = Rect;\n\n//# sourceURL=webpack:///./src/chart/objects/Rect.js?");

/***/ }),

/***/ "./src/chart/objects/index.js":
/*!************************************!*\
  !*** ./src/chart/objects/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\nexports.Rect = undefined;\n\nvar _Rect = __webpack_require__(/*! ./Rect.js */ \"./src/chart/objects/Rect.js\");\n\nvar _Rect2 = _interopRequireDefault(_Rect);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Rect = _Rect2.default;\n\n//# sourceURL=webpack:///./src/chart/objects/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _chart = __webpack_require__(/*! ./chart */ \"./src/chart/index.js\");\n\nvar _chart2 = _interopRequireDefault(_chart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\ndocument.addEventListener('DOMContentLoaded', function () {\n   new _chart2.default('chart', 600, 400);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });