import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Sketch {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.domElement.id = "render-canvas";
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(55, 1, 0.01, 100);
    this.camera.position.set(0, 0, 5);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 20;
    this.controls.enabled = true;

    this.scene = this._createScene(this.render);
  }

  resize({ width, height, dpr }) {
    this.size = [width, height];
    this.renderer.setPixelRatio = dpr;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  _createScene(renderer) {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff00ff);
    return scene;
  }

  _update(time, deltaTime) {}

  render(time, deltaTime) {
    this._update(time, deltaTime);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Sketch;
