import * as dat from "dat.gui";
import { AppActions } from "./state";

function createGUI(app) {
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
    app.dispatch({ type: AppActions.UpdateParam, payload: { radius: val } });
  });
}

export { createGUI };
