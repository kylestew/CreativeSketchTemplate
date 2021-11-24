import { circle } from "@thi.ng/geom";
import { fit } from "@thi.ng/math";

const settings = {
  animated: true,
  clearColor: "black",
};

let circ;

function update(time) {
  let rad = fit(Math.sin(time / 1000), -1, 1, 0.2, 0.8);
  circ = circle([0, 0], rad);
}

function render({ ctx, canvasScale }) {
  ctx.beginPath();
  let [x, y] = circ.pos;
  ctx.arc(x, x, circ.r, 0, 2 * Math.PI, false);
  // ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeWidth(9);
  ctx.strokeStyle = "#fff";
  ctx.stroke();
}

export { settings, update, render };
