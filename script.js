// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const scoreDiv = document.getElementById("Score");

// Set the canvas dimensions
canvas.width = 600;
canvas.height = 300;

// Get the canvas context
const ctx = canvas.getContext("2d");

// Initialize the snake
let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 }
];

// Initialize the direction
let dx = 10;
let dy = 0;
let lastDirection = "right";
let score = 0;
let foodX;
let foodY;

// Draw the snake on the canvas
function drawSnake() {
snake.forEach(segment => {
ctx.fillStyle = "lightgreen";
ctx.strokestyle = "darkgreen";
ctx.fillRect(segment.x, segment.y, 10, 10);
ctx.strokeRect(segment.x, segment.y, 10, 10);
  });
}

// Generate a new food location
function generateFood() {
    foodX = Math.floor(Math.random() * (canvas.width/10)) * 10;
    foodY = Math.floor(Math.random() * (canvas.height/10)) * 10;
  }

// Draw the food on the canvas
function drawFood() {
  ctx.fillStyle = "red";
  ctx.strokestyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

// Clear the canvas
function clearCanvas() {
ctx.fillStyle = "white";
ctx.strokestyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);
}
  
  // Check for collision with self
  function didCollide() {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
          return true;
        }
      }
      return false;
}
  
   // Check for collision with canvas border
function didCollideWithCanvas() {
      if (snake[0].x < 0 || snake[0].x > canvas.width - 10) return true;
      if (snake[0].y < 0 || snake[0].y > canvas.height - 10) return true;
      return false;
}
  
  // Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if (didEatFood) {
      score++;
      scoreDiv.textContent = "Score: " + score;
      generateFood();
    } else {
      snake.pop();
    }
}
  
  // Main game loop
function main() {
setTimeout(main, 100);
clearCanvas();
drawFood();
moveSnake();
if (didCollide()) {
    alert("Game Over, starting again!");
    snake = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 }
    ];
    generateFood();
    dx = 10;
    dy = 0;
    score = 0;
    scoreDiv.textContent = "Score: " + score;
    }
    if (didCollideWithCanvas()) {
    alert("Game Over, starting again!");
    snake = [
        { x: 150, y: 150 },
        { x: 140, y: 150 },
        { x: 130, y: 150 },
        { x: 120, y: 150 },
        { x: 110, y: 150 }
    ];
    generateFood();
    dx = 10;
    dy = 0;
    score = 0;
    scoreDiv.textContent = "Score: " + score;
    }
    drawSnake();
}
    
// Start the game
generateFood();
main();

// Handle keyboard events
document.addEventListener("keydown", event => {
    switch (event.keyCode) {
      case 37: // left arrow
        if (lastDirection !== "right") {
          dx = -10;
          dy = 0;
          lastDirection = "left";
        }
        break;
      case 38: // up arrow
        if (lastDirection !== "down") {
          dx = 0;
          dy = -10;
          lastDirection = "up";
        }
        break;
      case 39: // right arrow
        if (lastDirection !== "left") {
          dx = 10;
          dy = 0;
          lastDirection = "right";
        }
        break;
      case 40: // down arrow
        if (lastDirection !== "up") {
          dx = 0;
          dy = 10;
          lastDirection = "down";
        }
        break;
    }
  });


