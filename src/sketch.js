import { circle } from "@thi.ng/geom";
import { fit } from "@thi.ng/math";
import * as dx from "../snod/drawer";

const settings = {
  animated: false,
  clearColor: "black",
};

let circ;

function update({ time, state }) {
  console.log("update:", state);
  let rad = fit(state.radius, 0.0, 1.0, 0.2, 0.8);
  circ = circle([0, 0], rad);
}

function render({ ctx, canvasScale, state }) {
  console.log("render:", state);
  ctx.strokeWidth(12);
  ctx.strokeStyle = "#fff";
  dx.circle(ctx, circ.pos, circ.r, true);
}

export { settings, update, render };
