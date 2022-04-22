const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const { floor, random, PI } = Math;

const pick = (arr) => arr[floor(random() * arr.length)];

const randomColor = () => pick(['white', 'cyan', 'orange', 'deepskyblue', 'deeppink', 'yellow'])

const bugs = Array.from({ length: 900 }, () => ({
  color: randomColor(),
  x: (random() < .5 ? 0 : 1) * (innerWidth - 1),
  y: (random() < .5 ? 0 : 1) * (innerHeight - 1),
  angle: random() * 2 * PI,
  phi: 1 + random() * 5,
}));

function move(bug) {
  const xr = Math.cos(bug.angle);
  const yr = Math.sin(bug.angle);
  bug.x += xr;
  bug.y += yr;
  bug.angle += .03 * Math.sin(performance.now() * 1e-3 * bug.phi);
  if (bug.x >= innerWidth && xr > 0) {
    bug.x = 0;
  }
  if (bug.y >= innerHeight && yr > 0) {
    bug.y = 0;
  }
  if (bug.x < 0 && xr < 0) {
    bug.x = innerWidth - 1;
  }
  if (bug.y < 0 && yr < 0) {
    bug.y = innerHeight - 1;
  }
}

function render(bug) {
  ctx.fillStyle = bug.color;
  ctx.fillRect(bug.x - 2, bug.y - 2, 5, 5);
}

function setSize() {
  Object.assign(canvas, {
    width: innerWidth,
    height: innerHeight
  });
}

function loop(t = 0) {
  ctx.fillStyle='rgba(0,0,0,.05)'
  ctx.fillRect(0,0, canvas.width, canvas.height);
  for (const bug of bugs) {
    move(bug);
    render(bug);
  }
  requestAnimationFrame(loop);
}

setSize();
loop();
window.addEventListener('resize', setSize, false);