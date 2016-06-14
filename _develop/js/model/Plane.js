export default class Plane {
  constructor(opts = {}) {
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

  get meshObject() {
    return this._mesh;
  }

  update(timeStamp, deltaTime) {
    this.material.uniforms.time.value = timeStamp / 1000;
  }

  clone() {
    return new THREE.Mesh(this.geometry, this.material);
  }
}
