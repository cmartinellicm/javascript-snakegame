let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direction = "right";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

function createBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function creteSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Create food at a random spot
function drawFood() {
  context.fillStyle = "red";
  // context.fillRect(food.x, food.y, box, box);
  context.beginPath();
  context.arc(16 + food.x, 16 + food.y, box / 2, 0, Math.PI * 2, true);
  context.fill();
}

document.addEventListener("keydown", update);

function update(event) {
  // Update direction based on pressed key
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
  // Pause game
  if (event.keyCode == 32) alert("Game paused. Press ok to continue!");
}

function startGame() {
  createBG();
  creteSnake();
  drawFood();

  //Check if snake is out of canvas
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  // End game if snake's head touches its body
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game Over ☠︎");
    }
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //Make snake's head move according to direction
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  // If snake doesn't eat food it stays the same size, otherwise snake will grow and food will appear elsewhere
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(startGame, 100);
