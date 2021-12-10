import { ImageSampler } from "../snod/sampler";
import { transformThatFits, insetRect, rgbToHex } from "../snod/util";
import { polygon } from "@thi.ng/geom";
import grids from "../snod/grids";
import { subdiv } from "./lib/subdiv";

let sampler = new ImageSampler("./assets/tex03.jpg");

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

function render({ ctx, time, width, height, state }) {
  // transform canvas to fit image
  let trans = transformThatFits(
    [sampler.width, sampler.height],
    insetRect([0, 0, width, height], 40) // cropped border
  );
  ctx.transform(...trans);
  // new canvas size
  width = sampler.width;
  height = sampler.height;

  // setup base grid geometry
  // let baseGeo = grids.diamond(width, height, 2);
  let baseGeo = [
    polygon([
      [0, height],
      [width / 2, 0],
      [width, height],
    ]),
  ];

  // tessellate -> tint pipeline
  let tessedPolys = subdiv(baseGeo);
  console.log(tessedPolys);

  const renderPoly = (poly) => {
    // console.log(poly);
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
  tessedPolys.map(renderPoly);
}

export { render };
