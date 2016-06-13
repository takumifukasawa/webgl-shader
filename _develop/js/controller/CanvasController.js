import CanvasViewer from './../view/CanvasViewer.js';
import Plane from './../model/Plane.js';
import Shader from './../model/Shader.js';

const CANVAS_WIDTH = 465;
const CANVAS_HEIGHT = 465;

class CanvasController {
  constructor(opts = {}) {
    this.initialize();
    this.start();
  }

  initialize() {
    CanvasViewer.makeCanvas('.wrapper', '.my-canvas', CANVAS_WIDTH, CANVAS_HEIGHT);
    
    const normalShader = new Shader({
      vertexShader: document.getElementById('v-shader').textContent,
      fragmentShader: document.getElementById('f-shader').textContent
    });

    const plane = new Plane({
      width: CANVAS_WIDTH, height: CANVAS_HEIGHT,
      vertexShader: normalShader.vertexShader,
      fragmentShader: normalShader.fragmentShader
    });
    
    CanvasViewer.addObject(plane);


  }

  start() {
    CanvasViewer.start();
  }
}

export default new CanvasController();
