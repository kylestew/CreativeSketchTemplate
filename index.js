import Stats from "stats.js";

import { settings, update, render } from "./sketch";

let ctx, stats;
let canvasScale;

function resetCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

function normalizeCanvas() {
  // scale/translate canvas to [-1, 1] crop
  let scale, xOff, yOff;
  if (ctx.canvas.width > ctx.canvas.height) {
    // height is max side
    scale = ctx.canvas.height / 2;
    xOff = (ctx.canvas.width - ctx.canvas.height) / 2;
    yOff = 0;
  } else {
    scale = ctx.canvas.width / 2;
    xOff = 0;
    yOff = (ctx.canvas.height - ctx.canvas.width) / 2;
  }
  canvasScale = scale;
  ctx.translate(xOff, yOff);
  ctx.scale(scale, scale);
  ctx.strokeWidth(4.0);
}

function init() {
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  resetCanvas();

  // monkey-patch normalized stroke width updates
  ctx.strokeWidth = function (value) {
    this.lineWidth = value / canvasScale;
  };

  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  function mainLoop() {
    update();

    ctx.fillStyle = settings.clearColor || "white";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();

    // defaults
    ctx.fillStyle = "#F0F";
    ctx.strokeStyle = "black";

    normalizeCanvas();
    render(ctx);

    ctx.restore();

    requestAnimationFrame(mainLoop);
  }
  requestAnimationFrame(mainLoop);
}

window.onload = function () {
  init();
};

window.onresize = function () {
  resetCanvas();
};
