import "./style.css";

import Stats from "stats.js";
import Sketch from "./src/sketch";

let stats, prevTime;
let sketch;

init();
animate();

function init() {
  sketch = new Sketch();

  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  window.onresize = onWindowResize;
  onWindowResize(); // set initial size
}

function animate(time) {
  if (prevTime === undefined) prevTime = time;
  const deltaTime = Math.max(time - prevTime, 0);
  prevTime = time;

  if (stats) stats.begin();

  sketch.render(time / 1000.0, deltaTime / 1000.0);

  if (stats) stats.end();

  requestAnimationFrame(animate);
}

function onWindowResize() {
  sketch.resize({
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: window.devicePixelRatio,
  });
}

window.onkeydown = function (evt) {
  if (evt.key == "s") {
    saveFrame();
  }
};

function download(dataURL, name) {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = name;
  link.click();
}

function saveFrame() {
  let canvas = document.getElementById("render-canvas");
  var dataURL = canvas.toDataURL("image/png");
  download(dataURL, "image");
}
