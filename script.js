const canvas = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const colorButton = document.querySelector("button");
const ctx = canvas.getContext("2d");

let askChangeColor = false;
const tileSize = 20;
const tileCount = canvas.width / tileSize;
let snake = [{ x: 14, y: 14 }];
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};
let velocity = { x: 0, y: 0 };
let score = 0;
let highScore = 0;
let num=1;


const drawBoard = () => {
  for (let y = 0; y < tileCount; y++) {
    for (let x = 0; x < tileCount; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? "white" : "lightgreen";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
};

const changeBackgroundColor = () => {
  const colors = [
    "aqua",
    "lightblue",
    "lightgreen",
    "lightyellow",
    "lightcoral",
    "lightpink",
  ];
  document.body.style.backgroundColor = colors[num % colors.length];
  num++
};

const drawSnake = () => {
  snake.forEach((segment) => {
    ctx.fillStyle = "green";
    ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
  });
};

const drawFood = () => {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
};

const updateScoreDisplay = () => {
  scoreDisplay.textContent = `Score: ${score}`;
  highScore = Math.max(score, highScore);
  highScoreDisplay.textContent = `High Score: ${highScore}`;
};

const updateSnakePosition = () => {
  const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScoreDisplay();
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
    if (askChangeColor) changeBackgroundColor();
  } else {
    snake.pop();
  }
};

const checkCollision = () => {
  const head = snake[0];

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
};

const resetGame = () => {
  snake = [{ x: 14, y: 14 }];
  velocity = { x: 0, y: 0 };
  score = 0;
  updateScoreDisplay();
};

const gameLoop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  drawSnake();
  drawFood();
  updateSnakePosition();
  checkCollision();
};

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (velocity.y === 0) velocity = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (velocity.y === 0) velocity = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (velocity.x === 0) velocity = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (velocity.x === 0) velocity = { x: 1, y: 0 };
      break;
  }
});

colorButton.addEventListener("click", () => {
  askChangeColor = !askChangeColor;
  if (askChangeColor) {
    colorButton.classList.add("button-active");
  } else {
    colorButton.classList.remove("button-active");
  }
});

setInterval(gameLoop, 100);
