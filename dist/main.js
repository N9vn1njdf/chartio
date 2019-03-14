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

/***/ "./src/core/event.js":
/*!***************************!*\
  !*** ./src/core/event.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Event = function () {\n   function Event() {\n      _classCallCheck(this, Event);\n\n      this.listeners = {};\n   }\n\n   _createClass(Event, [{\n      key: \"on\",\n      value: function on(event) {\n         var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n\n         if (!this.listeners[event]) {\n            this.listeners[event] = [];\n         }\n         this.listeners[event].push(callback);\n      }\n   }, {\n      key: \"emit\",\n      value: function emit(event, data) {\n         if (this.listeners[event]) {\n            this.listeners[event].forEach(function (callback) {\n               return callback(data);\n            });\n         }\n      }\n   }]);\n\n   return Event;\n}();\n\nexports.default = Event;\n\n//# sourceURL=webpack:///./src/core/event.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\nexports.Event = exports.Scaffold = undefined;\n\nvar _scaffold = __webpack_require__(/*! ./scaffold.js */ \"./src/core/scaffold.js\");\n\nvar _scaffold2 = _interopRequireDefault(_scaffold);\n\nvar _event = __webpack_require__(/*! ./event.js */ \"./src/core/event.js\");\n\nvar _event2 = _interopRequireDefault(_event);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Scaffold = _scaffold2.default;\nexports.Event = _event2.default;\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/input.js":
/*!***************************!*\
  !*** ./src/core/input.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Input = function Input(canvas) {\n   _classCallCheck(this, Input);\n\n   this.x = null;\n   this.y = null;\n   this.down = false;\n   this.event_down = false;\n\n   var _this = this;\n\n   // Мышь\n   document.addEventListener('mousemove', function (e) {\n      _this.el = null;\n      if (e.target == canvas) {\n         _this.x = e.layerX;\n         _this.y = e.layerY;\n      } else {\n         _this.x = null;\n         _this.y = null;\n      }\n   });\n   document.addEventListener('mousedown', function (e) {\n      if (e.target == canvas) {\n         _this.down = true;\n      }\n   });\n   document.addEventListener('mouseup', function (e) {\n      if (e.target == canvas) {\n         _this.down = false;\n         _this.event_down = null;\n      }\n   });\n\n   // Тач\n   canvas.addEventListener('touchmove', function (e) {\n      if (e.target == canvas) {\n         var touch = e.targetTouches[0];\n\n         _this.down = true;\n         _this.x = touch.pageX - canvas.offsetLeft;\n         _this.y = touch.pageY - canvas.offsetTop;\n      }\n   });\n   document.addEventListener('touchend', function (e) {\n      if (e.target == canvas) {\n         _this.down = false;\n      }\n   });\n};\n\nexports.default = Input;\n\n//# sourceURL=webpack:///./src/core/input.js?");

/***/ }),

/***/ "./src/core/scaffold.js":
/*!******************************!*\
  !*** ./src/core/scaffold.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _input = __webpack_require__(/*! ./input.js */ \"./src/core/input.js\");\n\nvar _input2 = _interopRequireDefault(_input);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Scaffold = function () {\n   function Scaffold(_ref) {\n      var id = _ref.id,\n          width = _ref.width,\n          height = _ref.height,\n          children = _ref.children;\n\n      _classCallCheck(this, Scaffold);\n\n      this.canvas = document.getElementById(id);\n      this.canvas.width = width;\n      this.canvas.height = height;\n\n      this.input = new _input2.default(this.canvas);\n\n      this.children = children || [];\n      this.render();\n   }\n\n   _createClass(Scaffold, [{\n      key: 'render',\n      value: function render() {\n         var _this = this;\n\n         var ctx = this.canvas.getContext('2d');\n\n         ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n         this.children.forEach(function (element) {\n            return element.render(ctx, _this.input);\n         });\n\n         if (this.input.down && !this.input.event_down) {\n            this.input.event_down = true;\n         }\n\n         if (this.input.el) {\n            this.canvas.style.cursor = this.input.el.cursor;\n         } else {\n            this.canvas.style.cursor = 'default';\n         }\n\n         requestAnimationFrame(function () {\n            return _this.render();\n         });\n      }\n   }, {\n      key: 'add',\n      value: function add(element) {\n         this.children.push(element);\n      }\n   }]);\n\n   return Scaffold;\n}();\n\nexports.default = Scaffold;\n\n//# sourceURL=webpack:///./src/core/scaffold.js?");

/***/ }),

/***/ "./src/elements/circle.js":
/*!********************************!*\
  !*** ./src/elements/circle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Circle = function (_Element) {\n   _inherits(Circle, _Element);\n\n   function Circle(_ref) {\n      var r = _ref.r;\n\n      _classCallCheck(this, Circle);\n\n      var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, arguments[0]));\n\n      _this.r = r;\n      return _this;\n   }\n\n   _createClass(Circle, [{\n      key: 'isHover',\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x < this.x + this.r && x > this.x - this.r && y < this.y + this.r && y > this.y - this.r;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         ctx.beginPath();\n         ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);\n         ctx.fillStyle = this.color;\n         ctx.fill();\n\n         _get(Circle.prototype.__proto__ || Object.getPrototypeOf(Circle.prototype), 'render', this).call(this, ctx, input);\n      }\n   }, {\n      key: 'w',\n      get: function get() {\n         return this.r;\n      },\n      set: function set(value) {\n         this.r = value;\n      }\n   }, {\n      key: 'h',\n      get: function get() {\n         return this.r;\n      },\n      set: function set(value) {\n         this.r = value;\n      }\n   }]);\n\n   return Circle;\n}(_element2.default);\n\nexports.default = Circle;\n\n//# sourceURL=webpack:///./src/elements/circle.js?");

/***/ }),

/***/ "./src/elements/draggable.js":
/*!***********************************!*\
  !*** ./src/elements/draggable.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Draggable = function (_Element) {\n   _inherits(Draggable, _Element);\n\n   function Draggable(_ref) {\n      var child = _ref.child,\n          axisX = _ref.axisX,\n          axisY = _ref.axisY,\n          onDragging = _ref.onDragging;\n\n      _classCallCheck(this, Draggable);\n\n      var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, { x: child.x, y: child.y, w: child.w, h: child.h, children: [child] }));\n\n      child.x = 0;\n      child.y = 0;\n      _this.child = child;\n\n      _this.axisX = axisX || false;\n      _this.axisY = axisY || false;\n\n      if (onDragging) {\n         _this.on('dragging', onDragging);\n      }\n      return _this;\n   }\n\n   _createClass(Draggable, [{\n      key: 'isHover',\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x > this.childX && x < this.childX + this.w && y > this.childY && y < this.childY + this.h;\n      }\n   }, {\n      key: 'handleDragging',\n      value: function handleDragging(input) {\n         if (!input.down) {\n            this._drag = false;\n            this._inputOffset = null;\n            return;\n         }\n\n         if (!this._inputOffset) {\n            this._inputOffset = { x: input.x - this._x, y: input.y - this._y };\n         }\n\n         if (this.axisY) {\n            this.y = input.y - this._inputOffset.y;\n         }\n\n         if (this.axisX) {\n            this.x = input.x - this._inputOffset.x;\n         }\n\n         this.emit('dragging');\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         _get(Draggable.prototype.__proto__ || Object.getPrototypeOf(Draggable.prototype), 'render', this).call(this, ctx, input);\n\n         if (this._mouse_down) {\n            this._drag = true;\n         }\n\n         if (this._drag) {\n            this.handleDragging(input);\n         }\n      }\n   }, {\n      key: 'w',\n      get: function get() {\n         return this.child.w;\n      },\n      set: function set(value) {\n         return this.child.w = value;\n      }\n   }, {\n      key: 'h',\n      get: function get() {\n         return this.child.h;\n      },\n      set: function set(value) {\n         return this.child.h = value;\n      }\n   }, {\n      key: 'childX',\n      get: function get() {\n         return this.child.x;\n      }\n   }, {\n      key: 'childY',\n      get: function get() {\n         return this.child.y;\n      }\n   }]);\n\n   return Draggable;\n}(_element2.default);\n\nexports.default = Draggable;\n\n//# sourceURL=webpack:///./src/elements/draggable.js?");

/***/ }),

/***/ "./src/elements/element.js":
/*!*********************************!*\
  !*** ./src/elements/element.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Element = function (_Event) {\n   _inherits(Element, _Event);\n\n   function Element(_ref) {\n      var x = _ref.x,\n          y = _ref.y,\n          color = _ref.color,\n          children = _ref.children,\n          cursor = _ref.cursor,\n          inputIgnore = _ref.inputIgnore;\n\n      _classCallCheck(this, Element);\n\n      var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));\n\n      _this.x = x || 0;\n      _this.y = y || 0;\n      _this.color = color || 'rgba(0, 0, 0, 0)';\n      _this.children = children || [];\n      _this.cursor = cursor || 'default';\n      _this.inputIgnore = inputIgnore || false;\n\n      _this._mouse_down = false;\n      return _this;\n   }\n\n   _createClass(Element, [{\n      key: 'isHover',\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         for (var i in this.children) {\n            this.children[i].render(ctx, input);\n         }\n\n         if (this.isHover(input)) {\n\n            if (!input.el && this.color != 'rgba(0, 0, 0, 0)' && !this.inputIgnore) {\n               input.el = this;\n            }\n\n            this._move = true;\n            this.emit('move', input);\n\n            if (input.down && !input.event_down) {\n               this._mouse_down = true;\n               this.emit('down', input);\n            } else if (this._mouse_down) {\n               this._mouse_down = false;\n               this.emit('up', input);\n            }\n         } else if (this._move) {\n            this._move = false;\n            this.emit('leave', input);\n         }\n      }\n   }, {\n      key: 'children',\n      get: function get() {\n         return this._children;\n      },\n      set: function set(value) {\n         for (var i in value) {\n            value[i].parent = this;\n         }\n         return this._children = value;\n      }\n   }, {\n      key: 'x',\n      get: function get() {\n         if (this.parent != null) {\n            return this._x + this.parent.x;\n         }\n         return this._x;\n      },\n      set: function set(value) {\n         return this._x = value;\n      }\n   }, {\n      key: 'y',\n      get: function get() {\n         if (this.parent != null) {\n            return this._y + this.parent.y;\n         }\n         return this._y;\n      },\n      set: function set(value) {\n         return this._y = value;\n      }\n   }]);\n\n   return Element;\n}(_core.Event);\n\nexports.default = Element;\n\n//# sourceURL=webpack:///./src/elements/element.js?");

/***/ }),

/***/ "./src/elements/index.js":
/*!*******************************!*\
  !*** ./src/elements/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\nexports.Scalable = exports.Draggable = exports.Position = exports.Rectangle = exports.Circle = undefined;\n\nvar _circle = __webpack_require__(/*! ./circle.js */ \"./src/elements/circle.js\");\n\nvar _circle2 = _interopRequireDefault(_circle);\n\nvar _rectangle = __webpack_require__(/*! ./rectangle.js */ \"./src/elements/rectangle.js\");\n\nvar _rectangle2 = _interopRequireDefault(_rectangle);\n\nvar _position = __webpack_require__(/*! ./position.js */ \"./src/elements/position.js\");\n\nvar _position2 = _interopRequireDefault(_position);\n\nvar _draggable = __webpack_require__(/*! ./draggable.js */ \"./src/elements/draggable.js\");\n\nvar _draggable2 = _interopRequireDefault(_draggable);\n\nvar _scalable = __webpack_require__(/*! ./scalable.js */ \"./src/elements/scalable.js\");\n\nvar _scalable2 = _interopRequireDefault(_scalable);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Circle = _circle2.default;\nexports.Rectangle = _rectangle2.default;\nexports.Position = _position2.default;\nexports.Draggable = _draggable2.default;\nexports.Scalable = _scalable2.default;\n\n//# sourceURL=webpack:///./src/elements/index.js?");

/***/ }),

/***/ "./src/elements/position.js":
/*!**********************************!*\
  !*** ./src/elements/position.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Position = function (_Element) {\n   _inherits(Position, _Element);\n\n   function Position() {\n      _classCallCheck(this, Position);\n\n      return _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).apply(this, arguments));\n   }\n\n   _createClass(Position, [{\n      key: 'render',\n      value: function render(ctx, input) {\n         _get(Position.prototype.__proto__ || Object.getPrototypeOf(Position.prototype), 'render', this).call(this, ctx, input);\n      }\n   }]);\n\n   return Position;\n}(_element2.default);\n\nexports.default = Position;\n\n//# sourceURL=webpack:///./src/elements/position.js?");

/***/ }),

/***/ "./src/elements/rectangle.js":
/*!***********************************!*\
  !*** ./src/elements/rectangle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Rectangle = function (_Element) {\n   _inherits(Rectangle, _Element);\n\n   function Rectangle(_ref) {\n      var w = _ref.w,\n          h = _ref.h,\n          borderTop = _ref.borderTop,\n          borderBottom = _ref.borderBottom,\n          borderLeft = _ref.borderLeft,\n          borderRight = _ref.borderRight;\n\n      _classCallCheck(this, Rectangle);\n\n      var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, arguments[0]));\n\n      _this.w = w;\n      _this.h = h;\n\n      if (borderTop) {\n         _this.borderTop = {\n            color: borderTop.color || 'rgb(0, 0, 0)',\n            width: borderTop.width || 1,\n            inside: borderTop.inside || false\n         };\n      }\n\n      if (borderBottom) {\n         _this.borderBottom = {\n            color: borderBottom.color || 'rgb(0, 0, 0)',\n            width: borderBottom.width || 1,\n            inside: borderBottom.inside || false\n         };\n      }\n\n      if (borderLeft) {\n         // ..\n      }\n\n      if (borderRight) {\n         // ..\n      }\n      return _this;\n   }\n\n   _createClass(Rectangle, [{\n      key: 'render',\n      value: function render(ctx, input) {\n         ctx.fillStyle = this.color;\n         ctx.fillRect(this.x, this.y, this.w, this.h);\n\n         if (this.borderTop) {\n            ctx.strokeStyle = this.borderTop.color;\n            ctx.lineWidth = this.borderTop.width;\n\n            var y = this.borderTop.inside ? this.y + this.borderTop.width / 2 : this.y;\n\n            ctx.beginPath();\n            ctx.moveTo(this.x, y);\n            ctx.lineTo(this.x + this.w, y);\n            ctx.stroke();\n            ctx.closePath();\n         }\n\n         if (this.borderBottom) {\n            ctx.strokeStyle = this.borderBottom.color;\n            ctx.lineWidth = this.borderBottom.width;\n\n            var y = this.borderBottom.inside ? this.y + this.h - this.borderTop.width / 2 : this.y + this.h;\n\n            ctx.beginPath();\n            ctx.moveTo(this.x, y);\n            ctx.lineTo(this.x + this.w, y);\n            ctx.stroke();\n         }\n\n         _get(Rectangle.prototype.__proto__ || Object.getPrototypeOf(Rectangle.prototype), 'render', this).call(this, ctx, input);\n      }\n   }]);\n\n   return Rectangle;\n}(_element2.default);\n\nexports.default = Rectangle;\n\n//# sourceURL=webpack:///./src/elements/rectangle.js?");

/***/ }),

/***/ "./src/elements/scalable.js":
/*!**********************************!*\
  !*** ./src/elements/scalable.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nvar _rectangle = __webpack_require__(/*! ./rectangle.js */ \"./src/elements/rectangle.js\");\n\nvar _rectangle2 = _interopRequireDefault(_rectangle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// Note: масштабирование по оси Y не реализовано\n\nvar Scalable = function (_Element) {\n   _inherits(Scalable, _Element);\n\n   function Scalable() {\n      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n          child = _ref.child,\n          axisX = _ref.axisX,\n          axisY = _ref.axisY,\n          onScaling = _ref.onScaling;\n\n      _classCallCheck(this, Scalable);\n\n      var _this = _possibleConstructorReturn(this, (Scalable.__proto__ || Object.getPrototypeOf(Scalable)).call(this, { x: child.x, y: child.y, w: child.w, h: child.h }));\n\n      child.x = 0;\n      child.y = 0;\n      _this.child = child;\n\n      _this.axisX = axisX || false;\n      _this.axisY = axisY || false;\n\n      if (onScaling) {\n         _this.on('scaling', onScaling);\n      }\n\n      _this.children = _this._getChildren();\n      return _this;\n   }\n\n   _createClass(Scalable, [{\n      key: '_getChildren',\n      value: function _getChildren() {\n         var _this2 = this;\n\n         this.left = new _rectangle2.default({ x: -6, w: 6, h: this.h, cursor: 'col-resize', color: 'rgba(0, 0, 0, 0.12)' });\n         this.left.on('down', function (input) {\n            return _this2.left._scaling = true;\n         });\n\n         this.right = new _rectangle2.default({ x: this.w, w: 6, h: this.h, cursor: 'col-resize', color: 'rgba(0, 0, 0, 0.12)' });\n         this.right.on('down', function (input) {\n            return _this2.right._scaling = true;\n         });\n\n         var edgesX = this.axisX ? [this.left, this.right] : [];\n\n         // Тут ось Y...\n         var edgesY = this.axisY ? [] : [];\n         // ~~~~~~~~~~~~\n\n         return [].concat(edgesX, edgesY, [this.child]);\n      }\n   }, {\n      key: '_slaleLeftX',\n      value: function _slaleLeftX(input) {\n         if (!input.down) {\n            this.left._scaling = false;\n            this.left._inputOffset = null;\n            return;\n         }\n\n         if (!this.left._inputOffset) {\n            this.left._inputOffset = { x: input.x - this._x, y: input.y - this._y, w: this.w + this._x };\n         }\n\n         var newX = input.x - this.left._inputOffset.x;\n\n         this.w = this.left._inputOffset.w - newX;\n         this.right.x = this.w;\n\n         this.x = newX;\n\n         this.emit('scaling');\n      }\n   }, {\n      key: '_slaleRightX',\n      value: function _slaleRightX(input) {\n         if (!input.down) {\n            this.right._scaling = false;\n            this.right._inputOffset = null;\n            return;\n         }\n\n         if (!this.right._inputOffset) {\n            this.right._inputOffset = { x: input.x - this.w, y: input.y - this._y, w: this.w + this._x };\n         }\n\n         this.w = input.x - this.right._inputOffset.x;\n         this.right.x = this.w;\n\n         this.emit('scaling');\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         if (this.left._scaling) {\n            this._slaleLeftX(input);\n         }\n\n         if (this.right._scaling) {\n            this._slaleRightX(input);\n         }\n\n         _get(Scalable.prototype.__proto__ || Object.getPrototypeOf(Scalable.prototype), 'render', this).call(this, ctx, input);\n      }\n   }, {\n      key: 'w',\n      get: function get() {\n         return this.child.w;\n      },\n      set: function set(value) {\n         return this.child.w = value;\n      }\n   }, {\n      key: 'h',\n      get: function get() {\n         return this.child.h;\n      },\n      set: function set(value) {\n         return this.child.h = value;\n      }\n   }]);\n\n   return Scalable;\n}(_element2.default);\n\nexports.default = Scalable;\n\n//# sourceURL=webpack:///./src/elements/scalable.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _line_chart = __webpack_require__(/*! ./line_chart */ \"./src/line_chart/index.js\");\n\nvar _line_chart2 = _interopRequireDefault(_line_chart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.LineChart = _line_chart2.default;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/line_chart/index.js":
/*!*********************************!*\
  !*** ./src/line_chart/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nvar _main = __webpack_require__(/*! ./main */ \"./src/line_chart/main/index.js\");\n\nvar _main2 = _interopRequireDefault(_main);\n\nvar _map = __webpack_require__(/*! ./map */ \"./src/line_chart/map/index.js\");\n\nvar _map2 = _interopRequireDefault(_map);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar LineChart = function () {\n   function LineChart(id, width, height) {\n      var _this = this;\n\n      _classCallCheck(this, LineChart);\n\n      var map_height = 50; // размер миникарты\n      var main_height = 200; // размер графика\n      var ratio = map_height / main_height; // соотношение\n\n      // Создаем миникарту  \n      this.map = new _map2.default({ width: width, height: map_height, ratio: ratio });\n\n      // Создаем график\n      this.main = new _main2.default({ height: main_height });\n\n      // Слушаем события миникарты и обновляем график\n      this.map.on('update', function (_ref) {\n         var offset = _ref.offset,\n             scale = _ref.scale;\n\n         _this.main.offset = offset;\n         _this.main.scale = scale;\n      });\n\n      new _core.Scaffold({\n         id: id,\n         width: width,\n         height: height,\n         children: [new _elements.Position({\n            y: 54,\n            children: [this.main.element]\n         }), new _elements.Position({\n            y: height - map_height,\n            children: [this.map.element]\n         })]\n      });\n   }\n\n   _createClass(LineChart, [{\n      key: 'setData',\n      value: function setData(data) {\n         this.main.data = data;\n         this.map.data = data;\n      }\n   }]);\n\n   return LineChart;\n}();\n\nexports.default = LineChart;\n\n//# sourceURL=webpack:///./src/line_chart/index.js?");

/***/ }),

/***/ "./src/line_chart/main/index.js":
/*!**************************************!*\
  !*** ./src/line_chart/main/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _main = __webpack_require__(/*! ./main.js */ \"./src/line_chart/main/main.js\");\n\nvar _main2 = _interopRequireDefault(_main);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _main2.default;\n\n//# sourceURL=webpack:///./src/line_chart/main/index.js?");

/***/ }),

/***/ "./src/line_chart/main/main.js":
/*!*************************************!*\
  !*** ./src/line_chart/main/main.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Main = function () {\n   function Main(_ref) {\n      var height = _ref.height;\n\n      _classCallCheck(this, Main);\n\n      this.data = [];\n      this.height = height;\n      this.element = new _elements.Rectangle({ h: height, color: 'rgba(200, 100, 100, 0.5)' });\n   }\n\n   _createClass(Main, [{\n      key: 'update',\n      value: function update(data) {\n         var children = [];\n\n         for (var index = 0; index <= data.length; index++) {\n\n            var rect = new _elements.Circle({\n               x: index * this.scale.x,\n               y: index % 2 ? 10 : this.height - 10,\n               r: 10,\n               color: 'rgba(0, 0, 0, 0.4)'\n            });\n\n            children.push(rect);\n         }\n\n         this.element.children = children;\n         this.element.w = (this.element.children.length - 1) * this.scale.x;\n      }\n   }, {\n      key: 'offset',\n      get: function get() {\n         return this.element.x;\n      },\n      set: function set(value) {\n         this.element.x = value;\n      }\n   }, {\n      key: 'scale',\n      get: function get() {\n         return this._scale;\n      },\n      set: function set(value) {\n         this._scale = value;\n\n         if (this.data) {\n            this.update(this.data);\n         }\n      }\n   }]);\n\n   return Main;\n}();\n\nexports.default = Main;\n\n//# sourceURL=webpack:///./src/line_chart/main/main.js?");

/***/ }),

/***/ "./src/line_chart/map/index.js":
/*!*************************************!*\
  !*** ./src/line_chart/map/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _map = __webpack_require__(/*! ./map.js */ \"./src/line_chart/map/map.js\");\n\nvar _map2 = _interopRequireDefault(_map);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _map2.default;\n\n//# sourceURL=webpack:///./src/line_chart/map/index.js?");

/***/ }),

/***/ "./src/line_chart/map/map.js":
/*!***********************************!*\
  !*** ./src/line_chart/map/map.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nvar _navigator = __webpack_require__(/*! ./navigator.js */ \"./src/line_chart/map/navigator.js\");\n\nvar _navigator2 = _interopRequireDefault(_navigator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MiniMap = function (_Event) {\n   _inherits(MiniMap, _Event);\n\n   function MiniMap(_ref) {\n      var width = _ref.width,\n          height = _ref.height,\n          ratio = _ref.ratio;\n\n      _classCallCheck(this, MiniMap);\n\n      var _this = _possibleConstructorReturn(this, (MiniMap.__proto__ || Object.getPrototypeOf(MiniMap)).call(this));\n\n      _this.width = width;\n      _this.height = height;\n      _this.ratio = ratio;\n\n      _this.navigator = new _navigator2.default({ width: width, height: height });\n      _this.navigator.on('offset', function () {\n         _this.emit('update', _this.main_update_data);\n      });\n      _this.navigator.on('scaling', function () {\n         _this.emit('update', _this.main_update_data);\n      });\n\n      _this.data_element = new _elements.Rectangle({ w: width, h: height });\n\n      _this.element = new _elements.Rectangle({\n         w: width,\n         h: height,\n         children: [_this.data_element, _this.navigator.element]\n      });\n      return _this;\n   }\n\n   _createClass(MiniMap, [{\n      key: 'update',\n      value: function update(data) {\n         var children = [];\n\n         for (var index = 0; index <= data.length; index++) {\n            var rect = new _elements.Circle({\n               x: index * this.scale.x,\n               y: index % 2 ? 5 : this.height - 5, //  * this.scale.y\n               r: 5,\n               color: 'rgba(0, 0, 0, 0.4)'\n            });\n\n            children.push(rect);\n         }\n\n         this.data_element.children = children;\n         this.emit('update', this.main_update_data);\n      }\n   }, {\n      key: 'main_offset',\n      get: function get() {\n         return -this.navigator.offset * (this.scale.x * this.width / this.navigator.width / this.scale.x);\n      }\n   }, {\n      key: 'main_scale',\n      get: function get() {\n         return {\n            x: this.scale.x * this.width / this.navigator.width,\n            y: 0\n         };\n      }\n   }, {\n      key: 'main_update_data',\n      get: function get() {\n         return {\n            offset: this.main_offset,\n            scale: this.main_scale\n         };\n      }\n   }, {\n      key: 'scale',\n      get: function get() {\n         return {\n            x: this.data.length > 0 ? this.width / this.data.length : 0,\n            y: this.ratio\n         };\n      }\n   }, {\n      key: 'data',\n      get: function get() {\n         return this._data;\n      },\n      set: function set(value) {\n         this._data = value;\n         this.update(value);\n      }\n   }]);\n\n   return MiniMap;\n}(_core.Event);\n\nexports.default = MiniMap;\n\n//# sourceURL=webpack:///./src/line_chart/map/map.js?");

/***/ }),

/***/ "./src/line_chart/map/navigator.js":
/*!*****************************************!*\
  !*** ./src/line_chart/map/navigator.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Navigator = function (_Event) {\n   _inherits(Navigator, _Event);\n\n   function Navigator(_ref) {\n      var width = _ref.width,\n          height = _ref.height;\n\n      _classCallCheck(this, Navigator);\n\n      var _this = _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call(this));\n\n      var start_w = 300;\n      var start_x = width - start_w - 20;\n\n      _this.navigator = new _elements.Draggable({\n         axisX: true,\n         onDragging: function onDragging() {\n            return _this.onDragging();\n         },\n         child: new _elements.Scalable({\n            axisX: true,\n            onScaling: function onScaling() {\n               return _this.onScaling();\n            },\n            child: new _elements.Rectangle({\n               x: start_x,\n               w: start_w,\n               h: height,\n               borderTop: { color: 'rgba(0, 0, 0, 0.12)', inside: true },\n               borderBottom: { color: 'rgba(0, 0, 0, 0.12)', inside: true }\n            })\n         })\n      });\n\n      _this.background = [new _elements.Rectangle({ w: start_x, h: height, color: 'rgba(255, 255, 255, 0.5)', inputIgnore: true }), new _elements.Rectangle({ x: _this.offset + _this.width, w: width, h: height, color: 'rgba(255, 255, 255, 0.5)', inputIgnore: true })];\n\n      _this.element = new _elements.Rectangle({\n         w: width,\n         h: height,\n         children: [].concat(_toConsumableArray(_this.background), [_this.navigator])\n      });\n      return _this;\n   }\n\n   _createClass(Navigator, [{\n      key: 'onScaling',\n      value: function onScaling() {\n         this.background[0].w = this.offset;\n         this.background[1].x = this.offset + this.width;\n         this.emit('scaling');\n      }\n   }, {\n      key: 'onDragging',\n      value: function onDragging() {\n         this.background[0].w = this.offset;\n         this.background[1].x = this.offset + this.width;\n         this.emit('offset');\n      }\n   }, {\n      key: 'width',\n      get: function get() {\n         return this.navigator.child.w;\n      },\n      set: function set(value) {\n         this.navigator.child.w = value;\n      }\n   }, {\n      key: 'offset',\n      get: function get() {\n         return this.navigator.child.x;\n      },\n      set: function set(value) {\n         this.navigator.child.x = value;\n      }\n   }]);\n\n   return Navigator;\n}(_core.Event);\n\nexports.default = Navigator;\n\n//# sourceURL=webpack:///./src/line_chart/map/navigator.js?");

/***/ })

/******/ });