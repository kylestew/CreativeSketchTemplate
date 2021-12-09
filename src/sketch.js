import { ImageSampler } from "../snod/sampler";
import { rectThatFits, insetRect } from "../snod/util";

const settings = {
  animated: false,
  clearColor: "black",
};

let sampler = new ImageSampler("./assets/tex04.jpg");

function update({ time, state }) {
  // console.log("image loaded: ", img.width, img.height);
  // console.log("update:", state);
  // let rad = fit(state.radius, 0.0, 1.0, 0.2, 0.8);
  // circ = circle([0, 0], rad);
}

function render({ ctx, width, height, state }) {
  let [x, y, w, h] = insetRect(
    rectThatFits([sampler.width, sampler.height], [width, height]),
    40
  );
  ctx.drawImage(sampler.img, x, y, w, h);
}

export { settings, update, render };
