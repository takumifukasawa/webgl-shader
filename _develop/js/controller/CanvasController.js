import CanvasViewer from './../view/CanvasViewer.js';
import Plane from './../model/Plane.js';
import Shader from './../model/Shader.js';

const CANVAS_WIDTH = 465;
const CANVAS_HEIGHT = 465;

class CanvasController {
  constructor(opts = {}) {
    this.update = this.update.bind(this);
    this.lastTimeStamp = performance.now();

    this.initialize();
    this.start();
  }

  initialize() {
    CanvasViewer.makeCanvas('.wrapper', 'my-canvas', CANVAS_WIDTH, CANVAS_HEIGHT);
    
    const normalShader = new Shader({
      vertexShader: document.getElementById('v-shader').textContent,
      fragmentShader: document.getElementById('f-shader').textContent
    });

    this.plane = new Plane({
      width: CANVAS_WIDTH, height: CANVAS_HEIGHT,
      uniforms: {
        time: {
          type: 'f',
          value: 0.0
        },
        resolution: {
          type: 'v',
          value: new THREE.Vector2(CANVAS_WIDTH, CANVAS_HEIGHT)
        }
      },
      vertexShader: normalShader.vertexShader,
      fragmentShader: normalShader.fragmentShader
    });
    
    CanvasViewer.addObject(this.plane.meshObject);
  }

  start() {
    this.update();
  }
  stop() {
    cancelAnimationFrame(this.requestID);
  }
  setClock(clock) {
    this.clock = clock;
  }

  update(timeStamp) {
    const deltaTime = timeStamp - this.lastTimeStamp; 
    
    this.requestID = requestAnimationFrame(this.update);
    this.plane.update(timeStamp, deltaTime);
    CanvasViewer.update();
  }
}

export default new CanvasController();
