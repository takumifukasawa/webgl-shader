(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CanvasViewer = require('./../view/CanvasViewer.js');

var _CanvasViewer2 = _interopRequireDefault(_CanvasViewer);

var _Plane = require('./../model/Plane.js');

var _Plane2 = _interopRequireDefault(_Plane);

var _Shader = require('./../model/Shader.js');

var _Shader2 = _interopRequireDefault(_Shader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var CanvasController = function () {
  function CanvasController() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, CanvasController);

    this.update = this.update.bind(this);
    this.lastTimeStamp = performance.now();

    this.initialize();
    this.start();
  }

  _createClass(CanvasController, [{
    key: 'initialize',
    value: function initialize() {
      _CanvasViewer2.default.makeCanvas('.wrapper', 'my-canvas', CANVAS_WIDTH, CANVAS_HEIGHT);

      var normalShader = new _Shader2.default({
        vertexShader: document.getElementById('v-shader').textContent,
        fragmentShader: document.getElementById('f-shader').textContent
      });

      this.plane = new _Plane2.default({
        width: CANVAS_WIDTH, height: CANVAS_HEIGHT,
        uniforms: {
          time: {
            type: 'f',
            value: 0.0
          },
          resolution: {
            type: 'v2',
            value: new THREE.Vector2(CANVAS_WIDTH, CANVAS_HEIGHT)
          }
        },
        vertexShader: normalShader.vertexShader,
        fragmentShader: normalShader.fragmentShader
      });

      _CanvasViewer2.default.addObject(this.plane.meshObject);
    }
  }, {
    key: 'start',
    value: function start() {
      this.update();
    }
  }, {
    key: 'stop',
    value: function stop() {
      cancelAnimationFrame(this.requestID);
    }
  }, {
    key: 'setClock',
    value: function setClock(clock) {
      this.clock = clock;
    }
  }, {
    key: 'update',
    value: function update(timeStamp) {
      var deltaTime = timeStamp - this.lastTimeStamp;

      this.requestID = requestAnimationFrame(this.update);
      this.plane.update(timeStamp, deltaTime);
      _CanvasViewer2.default.update();
    }
  }]);

  return CanvasController;
}();

exports.default = new CanvasController();

},{"./../model/Plane.js":3,"./../model/Shader.js":4,"./../view/CanvasViewer.js":5}],2:[function(require,module,exports){
'use strict';

var _CanvasController = require('./../controller/CanvasController.js');

var _CanvasController2 = _interopRequireDefault(_CanvasController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function Main() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, Main);
};

new Main();

},{"./../controller/CanvasController.js":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plane = function () {
  function Plane() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Plane);

    this.width = opts.width || null;
    this.height = opts.height || null;

    this.geometry = new THREE.PlaneGeometry(this.width, this.height);
    this.material = new THREE.ShaderMaterial({
      uniforms: opts.uniforms || {},
      vertexShader: opts.vertexShader || '',
      fragmentShader: opts.fragmentShader || ''
    });

    this._mesh = new THREE.Mesh(this.geometry, this.material);
  }

  _createClass(Plane, [{
    key: 'update',
    value: function update(timeStamp, deltaTime) {
      this.material.uniforms.time.value = timeStamp / 1000;
    }
  }, {
    key: 'clone',
    value: function clone() {
      return new THREE.Mesh(this.geometry, this.material);
    }
  }, {
    key: 'meshObject',
    get: function get() {
      return this._mesh;
    }
  }]);

  return Plane;
}();

exports.default = Plane;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shader = function () {
  function Shader() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Shader);

    this._vertexShader = opts.vertexShader || null;
    this._fragmentShader = opts.fragmentShader || null;
  }

  _createClass(Shader, [{
    key: "vertexShader",
    get: function get() {
      return this._vertexShader;
    }
  }, {
    key: "fragmentShader",
    get: function get() {
      return this._fragmentShader;
    }
  }]);

  return Shader;
}();

exports.default = Shader;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasViewer = function () {
  function CanvasViewer() {
    _classCallCheck(this, CanvasViewer);
  }

  _createClass(CanvasViewer, [{
    key: "makeCanvas",
    value: function makeCanvas(root, classSelector, width, height) {
      this.width = width;
      this.height = height;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.domElement.classList.add(classSelector);
      this.renderer.setSize(this.width, this.height);

      this.scene = new THREE.Scene();

      this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 1, 1000);
      this.camera.position.z = 1;
      this.scene.add(this.camera);

      this.root = document.querySelector(root);
      this.root.appendChild(this.renderer.domElement);
    }
  }, {
    key: "addObject",
    value: function addObject(obj) {
      this.scene.add(obj);
    }
  }, {
    key: "update",
    value: function update() {
      this.renderer.render(this.scene, this.camera);
    }
  }]);

  return CanvasViewer;
}();

exports.default = new CanvasViewer();

},{}]},{},[2])
//# sourceMappingURL=index.js.map
