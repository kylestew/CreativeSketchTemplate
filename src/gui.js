import * as dat from "dat.gui";
import { Actions } from "./state";

function init(app) {
  const state = app.getState();
  const gui = new dat.GUI();

  var folder1 = gui.addFolder("Geometry");

  var circRadius = folder1
    .add(state, "radius")
    .name("Circle Radius")
    .min(0)
    .max(1)
    .step(0.01)
    .listen();
  folder1.open();

  circRadius.onChange((val) => {
    app.dispatch({ type: Actions.UpdateParam, payload: { radius: val } });
  });
}

export { init };
