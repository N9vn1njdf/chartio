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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _Core = __webpack_require__(/*! ./Core.js */ \"./src/chart/Core.js\");\n\nvar _Core2 = _interopRequireDefault(_Core);\n\nvar _objects = __webpack_require__(/*! ./objects */ \"./src/chart/objects/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Chart = function Chart(id, width, height) {\n   _classCallCheck(this, Chart);\n\n   var chart = new _Core2.default(id, { width: width, height: height });\n\n   var rect2 = new _objects.Rect(150, 150, 200, 200, {\n      color: \"rgba(0, 255, 0, 0.2)\"\n   });\n   chart.add(rect2);\n\n   var rect = new _objects.Rect(100, 100, 200, 200, {\n      color: \"rgba(255, 0, 0, 0.2)\"\n   });\n   rect.$on('move', function (mouse) {\n      rect.color = 'rgba(255, 0, 0, 0.4)';\n      if (mouse.down) {\n         rect.color = 'rgba(255, 0, 0, 1)';\n      }\n   });\n   rect.$on('leave', function (mouse) {\n      rect.color = 'rgba(255, 0, 0, 0.2)';\n   });\n   chart.add(rect);\n\n   var rect3 = new _objects.Rect(200, 50, 200, 200, {\n      color: \"rgba(0, 0, 255, 0.2)\"\n   });\n   chart.add(rect3);\n\n   return chart;\n};\n\nexports.default = Chart;\n\n//# sourceURL=webpack:///./src/chart/Chart.js?");

/***/ }),

/***/ "./src/chart/Core.js":
/*!***************************!*\
  !*** ./src/chart/Core.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Events = function () {\n   function Events(canvas) {\n      _classCallCheck(this, Events);\n\n      this.canvas = canvas;\n      this.callback = {\n         move: [],\n         mousedown: [],\n         mouseup: []\n      };\n\n      var self = this;\n\n      canvas.onmousemove = function (e) {\n         for (var i in self.callback.move) {\n            self.callback.move[i](e);\n         }\n      };\n      canvas.onmousedown = function (e) {\n         for (var i in self.callback.mousedown) {\n            self.callback.mousedown[i](e);\n         }\n      };\n      canvas.onmouseup = function (e) {\n         for (var i in self.callback.mouseup) {\n            self.callback.mouseup[i](e);\n         }\n      };\n   }\n\n   _createClass(Events, [{\n      key: 'onMove',\n      value: function onMove(callback) {\n         this.callback.move.push(callback);\n      }\n   }, {\n      key: 'onMouseDown',\n      value: function onMouseDown(callback) {\n         this.callback.mousedown.push(callback);\n      }\n   }, {\n      key: 'onMouseUp',\n      value: function onMouseUp(callback) {\n         this.callback.mouseup.push(callback);\n      }\n   }]);\n\n   return Events;\n}();\n\nvar Core = function () {\n   function Core(id, _ref) {\n      var width = _ref.width,\n          height = _ref.height;\n\n      _classCallCheck(this, Core);\n\n      var canvas = document.getElementById(id);\n      this.width = canvas.width = width;\n      this.height = canvas.height = height;\n      var ctx = canvas.getContext(\"2d\");\n\n      this.objects = [];\n\n      // =================================\n\n      this.mouse = { x: 0, y: 0, down: false };\n\n      var self = this;\n      var events = new Events(canvas);\n      events.onMove(function (e) {\n         self.mouse.x = e.layerX;\n         self.mouse.y = e.layerY;\n      });\n      events.onMouseDown(function (e) {\n         self.mouse.down = true;\n      });\n      events.onMouseUp(function (e) {\n         self.mouse.down = false;\n      });\n\n      // ============================\n\n      this.renderObjects(ctx);\n   }\n\n   _createClass(Core, [{\n      key: 'renderObjects',\n      value: function renderObjects(ctx) {\n         ctx.clearRect(0, 0, this.width, this.height);\n\n         var self = this;\n\n         for (var i in self.objects) {\n            self.objects[i].render(ctx);\n\n            if (self.objects[i].isMove(self.mouse)) {\n               self.objects[i].move = true;\n               self.objects[i].$emit('move', self.mouse);\n            } else if (self.objects[i].move) {\n               self.objects[i].move = false;\n               self.objects[i].$emit('leave', self.mouse);\n            }\n         }\n\n         requestAnimationFrame(function () {\n            return self.renderObjects(ctx);\n         });\n      }\n   }, {\n      key: 'add',\n      value: function add(object) {\n         this.objects.push(object);\n      }\n   }]);\n\n   return Core;\n}();\n\nexports.default = Core;\n\n//# sourceURL=webpack:///./src/chart/Core.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ChartObject = function () {\n   function ChartObject(x, y) {\n      _classCallCheck(this, ChartObject);\n\n      this.events = {};\n      this.x = x;\n      this.y = y;\n   }\n\n   _createClass(ChartObject, [{\n      key: \"$on\",\n      value: function $on(type, callback) {\n         if (!this.events[type]) {\n            this.events[type] = [];\n         }\n         this.events[type].push(callback);\n      }\n   }, {\n      key: \"$emit\",\n      value: function $emit(type, data) {\n         for (var i in this.events[type]) {\n            this.events[type][i](data);\n         }\n      }\n   }, {\n      key: \"isMove\",\n      value: function isMove(_ref) {\n         var x = _ref.x,\n             y = _ref.y;\n      }\n   }, {\n      key: \"render\",\n      value: function render(ctx) {}\n   }]);\n\n   return ChartObject;\n}();\n\nexports.default = ChartObject;\n\n//# sourceURL=webpack:///./src/chart/objects/ChartObject.js?");

/***/ }),

/***/ "./src/chart/objects/Rect.js":
/*!***********************************!*\
  !*** ./src/chart/objects/Rect.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _ChartObject2 = __webpack_require__(/*! ./ChartObject.js */ \"./src/chart/objects/ChartObject.js\");\n\nvar _ChartObject3 = _interopRequireDefault(_ChartObject2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Rect = function (_ChartObject) {\n   _inherits(Rect, _ChartObject);\n\n   function Rect(x, y, w, h, _ref) {\n      var color = _ref.color;\n\n      _classCallCheck(this, Rect);\n\n      var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, x, y));\n\n      _this.w = w;\n      _this.h = h;\n      _this.color = color || null;\n      return _this;\n   }\n\n   _createClass(Rect, [{\n      key: 'isMove',\n      value: function isMove(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         if (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h) {\n            return true;\n         }\n         return false;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx) {\n         if (this.color) {\n            ctx.fillStyle = this.color;\n         }\n         ctx.fillRect(this.x, this.y, this.w, this.h);\n      }\n   }]);\n\n   return Rect;\n}(_ChartObject3.default);\n\nexports.default = Rect;\n\n//# sourceURL=webpack:///./src/chart/objects/Rect.js?");

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
eval("\n\nvar _chart = __webpack_require__(/*! ./chart */ \"./src/chart/index.js\");\n\nvar _chart2 = _interopRequireDefault(_chart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\ndocument.addEventListener('DOMContentLoaded', function () {\n   new _chart2.default('chart', 400, 400);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });