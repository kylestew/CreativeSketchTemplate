import { polygon, tessellate, centroid, arcLength } from "@thi.ng/geom";
import {
  earCut2,
  rimTris,
  quadFan,
  triFan,
  edgeSplit,
} from "@thi.ng/geom-tessellate";

const makePoly = (points) => polygon(points);

function recuriveTess(poly, depth, decisionFn) {
  let polys = tessellate(poly, [triFan]).map(makePoly);
  return polys.flatMap((poly) => {
    if (decision(poly, depth + 1)) {
      return recuriveTess(poly, depth + 1, decisionFn);
    }
    return poly;
  });
}

function decision(poly, depth) {
  console.log(poly);
  return depth < 2;
}

function subdiv(polys, decisionFn) {
  // for each polygon, recursively tesselate based on some sort of decision function

  const tessFn = (poly) => recuriveTess(poly, 0, decisionFn);

  return polys.map(tessFn).flat();
}

export { subdiv };
