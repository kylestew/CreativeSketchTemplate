import { ImageSampler } from "../snod/sampler";
import { transformThatFits, insetRect, rgbToHex } from "../snod/util";
import { circle } from "../snod/drawer";

let sampler = new ImageSampler("./assets/tex03.jpg");

function render({ ctx, time, width, height, state }) {
  // transform canvas to fit image
  let trans = transformThatFits(
    [sampler.width, sampler.height],
    insetRect([0, 0, width, height], 40) // cropped border
  );
  ctx.transform(...trans);

  // TODO: TEMP: draw sampling
  for (let y = 0; y < sampler.height; y += 24) {
    for (let x = 0; x < sampler.width; x += 24) {
      ctx.fillStyle = rgbToHex(sampler.colorAt([x, y]));
      ctx.strokeStyle = "white";
      ctx.lineWeight = 4;
      circle(ctx, [x, y], 24, true);
      // ctx.fillRect(x, y, 14, 14);
    }
  }
}

export { render };
