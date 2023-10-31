import Sketch from "./src/sketch";
import createState from "./src/state";
import createGUI from "./src/gui";

import Stats from "stats.js";

let state, sketch;
let stats, prevTime;

async function init() {
    // create initial state
    state = watchState(await createState());

    // pass to new sketch
    sketch = new Sketch(state);

    // make on scroon controls
    createGUI(state);

    // stay fullscreen
    window.onresize = onWindowResize;
    onWindowResize(); // set initial size

    // fun extras
    capture = new CCapture({ format: "png" });
    stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);

    // start RAF
    animate();
}
init();

function animate(time) {
    if (isNaN(time)) time = 0;
    if (prevTime === undefined) prevTime = time;
    const deltaTime = Math.max(time - prevTime, 0);
    prevTime = time;

    if (stats) stats.begin();

    sketch.render(time / 1000.0, deltaTime / 1000.0, state);

    if (isCapturing) {
        let canvas = document.getElementById("render-canvas");
        capture.capture(canvas);
    } else if (saveNextFrame) {
        saveFrame();
        saveNextFrame = false;
    }

    if (stats) stats.end();

    requestAnimationFrame(animate);
}

function stateDidUpdate() {
    sketch.updateState(state);
}

function watchState(state) {
    // use a Proxy to publish state change events
    const proxiedState = new Proxy(state, {
        set(obj, prop, value) {
            // apply update
            Reflect.set(obj, prop, value);

            stateDidUpdate();

            return true;
        },
    });
    return proxiedState;
}

let resizeTimer;
function onWindowResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // stay fullscreen
        sketch.resize({
            width: window.innerWidth,
            height: window.innerHeight,
            dpr: window.devicePixelRatio,
        });
    }, 250); // Adjust time to suit. Smaller numbers for more responsiveness, larger for less
}

let capture = false;
let isCapturing = false;
let saveNextFrame = false;

window.onkeydown = function (evt) {
    if (evt.key == "s") {
        saveNextFrame = true;
    } else if (evt.key == "r" && !evt.metaKey) {
        if (!isCapturing) {
            isCapturing = true;
            capture.start();
            console.log("recording...");
        } else {
            isCapturing = false;
            capture.stop();
            capture.save();
            console.log("recording ended");
        }
    }
};

function download(dataURL, name) {
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = name;
    link.click();
}

function saveFrame() {
    let canvas = document.getElementById("render-canvas");
    var dataURL = canvas.toDataURL("image/png");
    download(dataURL, "image");
}
