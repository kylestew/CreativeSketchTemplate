const settings = {
  // clearColor: "black",
};

function update() {}

function render(ctx) {
  // const side = Math.min(width, height);
  // ctx.fillStyle = "white";
  // ctx.strokeStyle = "purple";

  ctx.rect(0.1, 0.1, 1.8, 1.8);
  ctx.stroke();
  ctx.fill();
}

export { settings, update, render };
