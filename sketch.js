import { circle } from "@thi.ng/geom";

const settings = {
  // animated: true,
  // clearColor: "black",
};

let circ;

function update(time) {
  console.log(time);
  circ = circle([0, 0], 0.25);
}

function render({ ctx, canvasScale }) {
  ctx.beginPath();
  let [x, y] = circ.pos;
  ctx.arc(x, x, circ.r, 0, 2 * Math.PI, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.strokeWidth(9);
  ctx.strokeStyle = "#003300";
  ctx.stroke();
}

export { settings, update, render };
