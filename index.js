import Stats from "stats.js";

import { createApp } from "./src/state";
import { init as initGUI } from "./src/gui";
import { settings, update, render } from "./src/sketch";

let app;
let ctx;
let stats;

let videoStream, mediaRecorder, recordedChunks;

function resetCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function download(dataURL, name) {
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = name;
  link.click();
}

function downloadCanvas() {
  var dataURL = ctx.canvas.toDataURL("image/png");
  download(dataURL, "image");
}

function _update(time) {
  update({
    time,
    state: app.getState(),
  });
}

function _render() {
  ctx.fillStyle = settings.clearColor || "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.save();

  // defaults
  ctx.fillStyle = "#F0F";
  ctx.strokeStyle = "black";

  render({
    ctx: ctx,
    width: ctx.canvas.width,
    height: ctx.canvas.height,
    state: app.getState(),
  });

  ctx.restore();
}

function init() {
  app = createApp();

  initGUI(app);

  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resetCanvas();

  // TODO: refactor this to be cleaner
  videoStream = canvas.captureStream(30);
  var options = { mimeType: "video/webm; codecs=vp9" };
  mediaRecorder = new MediaRecorder(videoStream, options);
  recordedChunks = [];
  mediaRecorder.ondataavailable = function (event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
      var blob = new Blob(recordedChunks, { type: "video/webm" });
      var videoURL = URL.createObjectURL(blob);
      download(videoURL, "video");
      recordedChunks = [];
    }
  };

  if (settings.animated === true) {
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
  }

  function animationLoop(time) {
    if (stats) stats.begin();

    _update(time);
    _render();

    if (stats) stats.end();

    if (settings.animated === true) requestAnimationFrame(animationLoop);
  }

  if (settings.animated === true) {
    requestAnimationFrame(animationLoop);
  } else {
    const postUpdate = () => {
      _update();
      _render();
    };
    app.subscribe(postUpdate);
    postUpdate();
  }
}

window.onload = function () {
  init();
};

window.onresize = function () {
  resetCanvas();
  _render();
};

window.onkeydown = function (evt) {
  if (evt.key == "s") {
    downloadCanvas();
  } else if (evt.key == "r") {
    if (mediaRecorder.state == "recording") {
      mediaRecorder.stop();
    } else {
      mediaRecorder.start();
      console.log("recording...");
    }
  }
};
