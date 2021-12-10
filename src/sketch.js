import { ImageSampler } from "../snod/sampler";
import { transformThatFits, insetRect, rgbToHex } from "../snod/util";
import grids from "../snod/grids";

let sampler = new ImageSampler("./assets/tex03.jpg");

// const createBaseGeo = (size) => {
// }

function render({ ctx, time, width, height, state }) {
  // transform canvas to fit image
  let trans = transformThatFits(
    [sampler.width, sampler.height],
    insetRect([0, 0, width, height], 40) // cropped border
  );
  ctx.transform(...trans);

  width = sampler.width;
  height = sampler.height;

  let grid = grids.diamond(width, height, 12);
  console.log(width, height, grid);

  ctx.fillStyle = "#333333";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#FF00Ff";

  const renderPoly = (poly) => {
    ctx.beginPath();
    const p0 = poly.points[0];
    ctx.moveTo(p0[0], p0[1]);
    poly.points.slice(1).map((p) => {
      ctx.lineTo(p[0], p[1]);
    });
    ctx.lineTo(p0[0], p0[1]);
    // ctx.fillStyle = poly.attribs.fill;
    ctx.fill();
    ctx.stroke();
  };

  // clip to picture extends (grids will overflow)
  ctx.beginPath();
  ctx.rect(0, 0, width, height);
  ctx.clip();

  // draw grid
  grid.map(renderPoly);

  // ctx.fillRect(0, 0, width, height);

  // // TODO: TEMP: draw sampling
  // for (let y = 0; y < sampler.height; y += 24) {
  //   for (let x = 0; x < sampler.width; x += 24) {
  //     ctx.fillStyle = rgbToHex(sampler.colorAt([x, y]));
  //     ctx.strokeStyle = "white";
  //     ctx.lineWeight = 4;
  //     circle(ctx, [x, y], 24, true);
  //     // ctx.fillRect(x, y, 14, 14);
  //   }
  // }
}

export { render };
