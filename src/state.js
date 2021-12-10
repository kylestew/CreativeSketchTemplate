import { createStore } from "redux";

const initState = {
  radius: 0.25,
  chickens: 3,
};

const AppActions = {
  UpdateParam: "UpdateParam",
};

function appReducer(state = initState, action) {
  // console.log("reducer:", state, action);
  switch (action.type) {
    default:
      return state;
  }
}

function createApp() {
  return createStore(appReducer);
}

export { AppActions, createApp };
