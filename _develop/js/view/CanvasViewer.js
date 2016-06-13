class CanvasViewer {
  constructor() {
    this.update = this.update.bind(this);
  }

  makeCanvas(root, classSelector, width, height) {
    this.width = width;
    this.height = height;
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.domElement.classList.add(classSelector);
    this.renderer.setSize(this.width, this.height);

    this.scene = new THREE.Scene();
    
    this.camera = new THREE.OrthographicCamera(this.width/-2, this.width/2, this.height/2, this.height/-2, 1, 1000);
    this.camera.position.z = 1;
    this.scene.add(this.camera);

    this.root = document.querySelector(root);
    this.root.appendChild(this.renderer.domElement);
  }

  addObject(obj) {
    this.scene.add(obj);
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

  update() {
    this.requestID = requestAnimationFrame(this.update);

    this.renderer.render(this.scene, this.camera);
  }
}

export default new CanvasViewer();
