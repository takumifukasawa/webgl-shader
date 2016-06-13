export default class Shader {
  constructor(opts = {}) {
    this._vertexShader = opts.vertexShader || null;
    this._fragmentShader = opts.fragmentShader || null;
  }
  get vertexShader() {
    return this._vertexShader;
  }
  get fragmentShader() {
    return this._fragmentShader;
  }
}
