
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bird = {
  x: 80,
  y: 200,
  width: 30,
  height: 30,
  gravity: 0.6,
  lift: -12,
  velocity: 0
};

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

document.addEventListener("keydown", flap);
canvas.addEventListener("click", flap);

function flap() {
  if (!gameOver) {
    bird.velocity = bird.lift;
  } else {
    location.reload();
  }
}

function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
  ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bird.velocity += bird.gravity;
  bird.y += bird.velocity;

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
  }

  if (frame % 100 === 0) {
    let top = Math.random() * 250 + 20;
    let bottom = canvas.height - top - 120;
    pipes.push({ x: canvas.width, top, bottom, width: 50 });
  }

  pipes.forEach((pipe, index) => {
    pipe.x -= 2;

    drawPipe(pipe);

    if (
      bird.x < pipe.x + pipe.width &&
      bird.x + bird.width > pipe.x &&
      (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
    ) {
      gameOver = true;
    }

    if (pipe.x + pipe.width === bird.x) {
      score++;
    }

    if (pipe.x + pipe.width < 0) {
      pipes.splice(index, 1);
    }
  });

  drawBird();

  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  frame++;
  requestAnimationFrame(update);
}

update();
