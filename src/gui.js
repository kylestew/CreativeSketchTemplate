import * as dat from "dat.gui";

function createGUI(state) {
  const gui = new dat.GUI();

  var optionsFolder = gui.addFolder("Options");
  optionsFolder.open();

  optionsFolder
    .addColor(state, "backgroundColor")
    .name("Background Color")
    .onChange(state.updateFn);

  // optionsFolder.add(state, "cubeSize")
}

export default createGUI;
