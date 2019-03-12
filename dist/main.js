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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Input = function Input(canvas) {\n   _classCallCheck(this, Input);\n\n   this.x = 0;\n   this.y = 0;\n   this.down = false;\n\n   var _this = this;\n\n   // Мышь\n   document.addEventListener('mousemove', function (e) {\n      if (e.target == canvas) {\n         _this.x = e.layerX;\n         _this.y = e.layerY;\n      }\n   });\n   document.addEventListener('mousedown', function (e) {\n      if (e.target == canvas) {\n         _this.down = true;\n      }\n   });\n   document.addEventListener('mouseup', function (e) {\n      if (e.target == canvas) {\n         _this.down = false;\n      }\n   });\n\n   // Тач\n   canvas.addEventListener('touchmove', function (e) {\n      if (e.target == canvas) {\n         var touch = e.targetTouches[0];\n\n         _this.down = true;\n         _this.x = touch.pageX - canvas.offsetLeft;\n         _this.y = touch.pageY - canvas.offsetTop;\n      }\n   });\n   document.addEventListener('touchend', function (e) {\n      if (e.target == canvas) {\n         _this.down = false;\n      }\n   });\n};\n\nexports.default = Input;\n\n//# sourceURL=webpack:///./src/core/input.js?");

/***/ }),

/***/ "./src/core/scaffold.js":
/*!******************************!*\
  !*** ./src/core/scaffold.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _input = __webpack_require__(/*! ./input.js */ \"./src/core/input.js\");\n\nvar _input2 = _interopRequireDefault(_input);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Scaffold = function () {\n   function Scaffold(_ref) {\n      var id = _ref.id,\n          width = _ref.width,\n          height = _ref.height,\n          children = _ref.children;\n\n      _classCallCheck(this, Scaffold);\n\n      this.canvas = document.getElementById(id);\n      this.canvas.width = width;\n      this.canvas.height = height;\n\n      this.input = new _input2.default(this.canvas);\n\n      this.children = children || [];\n      this.render();\n   }\n\n   _createClass(Scaffold, [{\n      key: 'render',\n      value: function render() {\n         var _this = this;\n\n         var ctx = this.canvas.getContext('2d');\n\n         ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n         this.children.forEach(function (element) {\n            return element.render(ctx, _this.input);\n         });\n\n         requestAnimationFrame(function () {\n            return _this.render();\n         });\n      }\n   }, {\n      key: 'add',\n      value: function add(element) {\n         this.children.push(element);\n      }\n   }]);\n\n   return Scaffold;\n}();\n\nexports.default = Scaffold;\n\n//# sourceURL=webpack:///./src/core/scaffold.js?");

/***/ }),

/***/ "./src/elements/circle.js":
/*!********************************!*\
  !*** ./src/elements/circle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Circle = function (_Element) {\n   _inherits(Circle, _Element);\n\n   function Circle(_ref) {\n      var _ret;\n\n      var x = _ref.x,\n          y = _ref.y,\n          r = _ref.r,\n          color = _ref.color,\n          draggable = _ref.draggable,\n          children = _ref.children;\n\n      _classCallCheck(this, Circle);\n\n      var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, { x: x, y: y, color: color, draggable: draggable, children: children }));\n\n      _this.r = r;\n\n      return _ret = _this, _possibleConstructorReturn(_this, _ret);\n   }\n\n   _createClass(Circle, [{\n      key: 'isHover',\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x < this.x + this.r && x > this.x - this.r && y < this.y + this.r && y > this.y - this.r;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         ctx.beginPath();\n         ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);\n         ctx.fillStyle = this.color;\n         ctx.fill();\n\n         _get(Circle.prototype.__proto__ || Object.getPrototypeOf(Circle.prototype), 'render', this).call(this, ctx, input);\n      }\n   }]);\n\n   return Circle;\n}(_element2.default);\n\nexports.default = Circle;\n\n//# sourceURL=webpack:///./src/elements/circle.js?");

/***/ }),

/***/ "./src/elements/element.js":
/*!*********************************!*\
  !*** ./src/elements/element.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Element = function (_Event) {\n   _inherits(Element, _Event);\n\n   function Element(_ref) {\n      var x = _ref.x,\n          y = _ref.y,\n          color = _ref.color,\n          draggable = _ref.draggable,\n          children = _ref.children;\n\n      _classCallCheck(this, Element);\n\n      var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));\n\n      _this.x = x || 0;\n      _this.y = y || 0;\n      _this.color = color || 'rgba(0, 255, 0, 0)';\n      _this.draggable = draggable || null;\n      _this.children = children || [];\n      return _this;\n   }\n\n   _createClass(Element, [{\n      key: 'handleDragging',\n      value: function handleDragging(input) {\n         if (!input.down) {\n            this._drag = false;\n            this._drag_offset = null;\n            return;\n         }\n\n         if (!this._drag_offset) {\n            this._drag_offset = { x: input.x - this._x, y: input.y - this._y };\n         }\n\n         if (this.draggable.y) {\n            this.y = input.y - this._drag_offset.y;\n         }\n\n         if (this.draggable.x) {\n            this.x = input.x - this._drag_offset.x;\n         }\n\n         this.emit('dragging', input);\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n\n         if (this.isHover({ x: input.x, y: input.y })) {\n            this.move = true;\n            this.emit('move', input);\n\n            if (this.draggable && input.down) {\n               this._drag = true;\n            }\n         } else {\n            if (this.move) {\n               this.move = false;\n               this.emit('leave', input);\n            }\n         }\n\n         if (this._drag) {\n            this.handleDragging(input);\n         }\n\n         for (var i in this.children) {\n            this.children[i].render(ctx, input);\n         }\n      }\n   }, {\n      key: 'children',\n      get: function get() {\n         return this._children;\n      },\n      set: function set(s) {\n         for (var i in s) {\n            s[i].parent = this;\n         }\n         return this._children = s;\n      }\n   }, {\n      key: 'x',\n      get: function get() {\n         if (this.parent != null) {\n            return this._x + this.parent.x;\n         }\n         return this._x;\n      },\n      set: function set(s) {\n         return this._x = s;\n      }\n   }, {\n      key: 'y',\n      get: function get() {\n         if (this.parent != null) {\n            return this._y + this.parent.y;\n         }\n         return this._y;\n      },\n      set: function set(s) {\n         return this._y = s;\n      }\n   }]);\n\n   return Element;\n}(_core.Event);\n\nexports.default = Element;\n\n//# sourceURL=webpack:///./src/elements/element.js?");

/***/ }),

/***/ "./src/elements/index.js":
/*!*******************************!*\
  !*** ./src/elements/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\nexports.Position = exports.Rectangle = exports.Circle = undefined;\n\nvar _circle = __webpack_require__(/*! ./circle.js */ \"./src/elements/circle.js\");\n\nvar _circle2 = _interopRequireDefault(_circle);\n\nvar _rectangle = __webpack_require__(/*! ./rectangle.js */ \"./src/elements/rectangle.js\");\n\nvar _rectangle2 = _interopRequireDefault(_rectangle);\n\nvar _position = __webpack_require__(/*! ./position.js */ \"./src/elements/position.js\");\n\nvar _position2 = _interopRequireDefault(_position);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.Circle = _circle2.default;\nexports.Rectangle = _rectangle2.default;\nexports.Position = _position2.default;\n\n//# sourceURL=webpack:///./src/elements/index.js?");

/***/ }),

/***/ "./src/elements/position.js":
/*!**********************************!*\
  !*** ./src/elements/position.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Position = function (_Element) {\n   _inherits(Position, _Element);\n\n   function Position() {\n      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},\n          x = _ref.x,\n          y = _ref.y,\n          children = _ref.children;\n\n      _classCallCheck(this, Position);\n\n      return _possibleConstructorReturn(this, (Position.__proto__ || Object.getPrototypeOf(Position)).call(this, { x: x, y: y, children: children }));\n   }\n\n   _createClass(Position, [{\n      key: 'isHover',\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         _get(Position.prototype.__proto__ || Object.getPrototypeOf(Position.prototype), 'render', this).call(this, ctx, input);\n      }\n   }]);\n\n   return Position;\n}(_element2.default);\n\nexports.default = Position;\n\n//# sourceURL=webpack:///./src/elements/position.js?");

/***/ }),

/***/ "./src/elements/rectangle.js":
/*!***********************************!*\
  !*** ./src/elements/rectangle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if (\"value\" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };\n\nvar _element = __webpack_require__(/*! ./element.js */ \"./src/elements/element.js\");\n\nvar _element2 = _interopRequireDefault(_element);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Rectangle = function (_Element) {\n   _inherits(Rectangle, _Element);\n\n   function Rectangle(_ref) {\n      var _ret;\n\n      var x = _ref.x,\n          y = _ref.y,\n          w = _ref.w,\n          h = _ref.h,\n          color = _ref.color,\n          draggable = _ref.draggable,\n          children = _ref.children;\n\n      _classCallCheck(this, Rectangle);\n\n      var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, { x: x, y: y, w: w, h: h, color: color, draggable: draggable, children: children }));\n\n      _this.w = w;\n      _this.h = h;\n\n      return _ret = _this, _possibleConstructorReturn(_this, _ret);\n   }\n\n   _createClass(Rectangle, [{\n      key: 'isHover',\n      value: function isHover(_ref2) {\n         var x = _ref2.x,\n             y = _ref2.y;\n\n         return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h;\n      }\n   }, {\n      key: 'render',\n      value: function render(ctx, input) {\n         ctx.fillStyle = this.color;\n         ctx.fillRect(this.x, this.y, this.w, this.h);\n\n         _get(Rectangle.prototype.__proto__ || Object.getPrototypeOf(Rectangle.prototype), 'render', this).call(this, ctx, input);\n      }\n   }]);\n\n   return Rectangle;\n}(_element2.default);\n\nexports.default = Rectangle;\n\n//# sourceURL=webpack:///./src/elements/rectangle.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _line_chart = __webpack_require__(/*! ./line_chart/line_chart */ \"./src/line_chart/line_chart.js\");\n\nvar _line_chart2 = _interopRequireDefault(_line_chart);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nwindow.LineChart = _line_chart2.default;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/line_chart/layers/index.js":
/*!****************************************!*\
  !*** ./src/line_chart/layers/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\nexports.NavigatorLayer = exports.MapLayer = exports.MainLayer = undefined;\n\nvar _main = __webpack_require__(/*! ./main.js */ \"./src/line_chart/layers/main.js\");\n\nvar _main2 = _interopRequireDefault(_main);\n\nvar _map = __webpack_require__(/*! ./map.js */ \"./src/line_chart/layers/map.js\");\n\nvar _map2 = _interopRequireDefault(_map);\n\nvar _navigator = __webpack_require__(/*! ./navigator.js */ \"./src/line_chart/layers/navigator.js\");\n\nvar _navigator2 = _interopRequireDefault(_navigator);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.MainLayer = _main2.default;\nexports.MapLayer = _map2.default;\nexports.NavigatorLayer = _navigator2.default;\n\n//# sourceURL=webpack:///./src/line_chart/layers/index.js?");

/***/ }),

/***/ "./src/line_chart/layers/main.js":
/*!***************************************!*\
  !*** ./src/line_chart/layers/main.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Main = function () {\n   function Main(_ref) {\n      var height = _ref.height,\n          offset = _ref.offset,\n          scale = _ref.scale;\n\n      _classCallCheck(this, Main);\n\n      this.height = height;\n      this.scale = scale;\n      this.element = new _elements.Rectangle({ x: offset, h: height, color: 'rgba(200, 100, 100, 0.5)' });\n   }\n\n   _createClass(Main, [{\n      key: 'update',\n      value: function update(data) {\n         var children = [];\n\n         for (var index = 0; index <= data.length; index++) {\n\n            var rect = new _elements.Circle({\n               x: index * this.scale.x,\n               y: index % 2 ? 10 : this.height - 10,\n               r: 10,\n               color: 'rgba(0, 0, 0, 0.4)'\n            });\n\n            children.push(rect);\n         }\n\n         this.element.children = children;\n         this.element.w = this.element.children.length * 100;\n      }\n   }, {\n      key: 'offset',\n      get: function get() {\n         return this.element.x;\n      },\n      set: function set(value) {\n         this.element.x = value;\n      }\n   }]);\n\n   return Main;\n}();\n\nexports.default = Main;\n\n//# sourceURL=webpack:///./src/line_chart/layers/main.js?");

/***/ }),

/***/ "./src/line_chart/layers/map.js":
/*!**************************************!*\
  !*** ./src/line_chart/layers/map.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nvar _navigator = __webpack_require__(/*! ./navigator.js */ \"./src/line_chart/layers/navigator.js\");\n\nvar _navigator2 = _interopRequireDefault(_navigator);\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Map = function (_Event) {\n   _inherits(Map, _Event);\n\n   function Map(_ref) {\n      var width = _ref.width,\n          height = _ref.height,\n          ratio = _ref.ratio;\n\n      _classCallCheck(this, Map);\n\n      var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));\n\n      _this.width = width;\n      _this.height = height;\n      _this.ratio = ratio;\n      _this.map_items = [];\n\n      _this.navigator = new _navigator2.default({ width: width, height: height });\n      _this.navigator.on('offset', function () {\n         _this.emit('offset', _this.main_offset);\n      });\n\n      _this.data_element = new _elements.Rectangle({ w: width, h: height, children: _this.map_items });\n\n      _this.element = new _elements.Rectangle({\n         w: width,\n         h: height,\n         color: 'rgba(110, 110, 100, 0.1)',\n         children: [_this.data_element, _this.navigator.element]\n      });\n      return _this;\n   }\n\n   _createClass(Map, [{\n      key: 'update',\n      value: function update(data) {\n         var map_items = [];\n\n         for (var index = 0; index <= data.length; index++) {\n\n            var rect = new _elements.Circle({\n               x: index * this.scale.x,\n               y: index % 2 ? 5 : this.height - 5, //  * this.scale.y\n               r: 5,\n               color: 'rgba(0, 0, 0, 0.4)'\n            });\n\n            map_items.push(rect);\n         }\n\n         this.data_element.children = map_items;\n      }\n   }, {\n      key: 'main_offset',\n      get: function get() {\n         var sx = this.scale.x * this.width / this.navigator.width;\n         return -this.navigator.offset * (sx / this.scale.x);\n      }\n   }, {\n      key: 'main_scale',\n      get: function get() {\n         return {\n            x: this.scale.x * this.width / this.navigator.width,\n            y: 0\n         };\n      }\n   }, {\n      key: 'scale',\n      get: function get() {\n\n         return {\n            x: 50,\n            y: this.ratio\n         };\n      }\n   }]);\n\n   return Map;\n}(_core.Event);\n\nexports.default = Map;\n\n//# sourceURL=webpack:///./src/line_chart/layers/map.js?");

/***/ }),

/***/ "./src/line_chart/layers/navigator.js":
/*!********************************************!*\
  !*** ./src/line_chart/layers/navigator.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Navigator = function (_Event) {\n   _inherits(Navigator, _Event);\n\n   function Navigator(_ref) {\n      var width = _ref.width,\n          height = _ref.height;\n\n      _classCallCheck(this, Navigator);\n\n      var _this = _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call(this));\n\n      var start_w = 300;\n      var start_x = width - start_w;\n\n      _this.navigator = new _elements.Rectangle({ x: start_x, w: start_w, h: height, draggable: { x: true } });\n\n      _this.navigator.on('dragging', function (mouse) {\n         left.w = _this.offset;\n         right.x = _this.offset + _this.width;\n         _this.emit('offset');\n      });\n\n      var left = new _elements.Rectangle({ w: start_x, h: height, color: 'rgba(0, 0, 0, 0.1)' });\n      var right = new _elements.Rectangle({ x: _this.offset + _this.width, w: width, h: height, color: 'rgba(0, 0, 0, 0.1)' });\n\n      _this.element = new _elements.Rectangle({\n         w: width,\n         h: height,\n         children: [left, _this.navigator, right]\n      });\n      return _this;\n   }\n\n   _createClass(Navigator, [{\n      key: 'width',\n      get: function get() {\n         return this.navigator.w;\n      },\n      set: function set(value) {\n         this.navigator.w = value;\n      }\n   }, {\n      key: 'offset',\n      get: function get() {\n         return this.navigator.x;\n      },\n      set: function set(value) {\n         this.navigator.x = value;\n      }\n   }]);\n\n   return Navigator;\n}(_core.Event);\n\nexports.default = Navigator;\n\n//# sourceURL=webpack:///./src/line_chart/layers/navigator.js?");

/***/ }),

/***/ "./src/line_chart/line_chart.js":
/*!**************************************!*\
  !*** ./src/line_chart/line_chart.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n   value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _core = __webpack_require__(/*! core */ \"./src/core/index.js\");\n\nvar _layers = __webpack_require__(/*! ./layers */ \"./src/line_chart/layers/index.js\");\n\nvar _elements = __webpack_require__(/*! elements */ \"./src/elements/index.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar LineChart = function () {\n   function LineChart(id, width, height) {\n      var _this = this;\n\n      _classCallCheck(this, LineChart);\n\n      var map_height = 80; // размер миникарты\n      var main_height = 200; // размер графика\n      var ratio = map_height / main_height; // соотношение\n\n      // Создаем миникарту  \n      this.map = new _layers.MapLayer({ width: width, height: map_height, ratio: ratio });\n\n      // Получаем данные для начального позиционирования графика\n      var offset = this.map.main_offset;\n      var scale = this.map.main_scale;\n\n      // Создаем график\n      this.main = new _layers.MainLayer({ height: main_height, offset: offset, scale: scale });\n\n      // Слушаем события миникарты и обновляем график\n      this.map.on('offset', function (value) {\n         return _this.main.offset = value;\n      });\n\n      new _core.Scaffold({\n         id: id,\n         width: width,\n         height: height,\n         children: [new _elements.Position({\n            y: 54,\n            children: [this.main.element]\n         }), new _elements.Position({\n            y: height - map_height,\n            children: [this.map.element]\n         })]\n      });\n   }\n\n   _createClass(LineChart, [{\n      key: 'setData',\n      value: function setData(data) {\n         this.map.update(data);\n         this.main.update(data);\n      }\n   }]);\n\n   return LineChart;\n}();\n\nexports.default = LineChart;\n\n//# sourceURL=webpack:///./src/line_chart/line_chart.js?");

/***/ })

/******/ });