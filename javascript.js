const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the dimensions of the canvas
canvas.width = 400;
canvas.height = 400;

// Set the unit size
const unit = 20;

// Create the snake
let snake = [];
snake[0] = { x: unit * 5, y: unit * 5 };

// Create the food
let food = {
    x: Math.floor(Math.random() * canvas.width / unit) * unit,
    y: Math.floor(Math.random() * canvas.height / unit) * unit
};

// Set the initial direction
let direction = 'RIGHT';

// Add event listener for keyboard controls
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction != 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode == 39 && direction != 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction != 'UP') {
        direction = 'DOWN';
    }
}

// Main game loop
function game() {
    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'LEFT') snakeX -= unit;
    if (direction == 'UP') snakeY -= unit;
    if (direction == 'RIGHT') snakeX += unit;
    if (direction == 'DOWN') snakeY += unit;

    // Implement wrap-around logic
    if (snakeX < 0) snakeX = canvas.width - unit;
    if (snakeY < 0) snakeY = canvas.height - unit;
    if (snakeX >= canvas.width) snakeX = 0;
    if (snakeY >= canvas.height) snakeY = 0;

    // Check for collisions with itself
    if (collision({ x: snakeX, y: snakeY }, snake)) {
        clearInterval(gameLoop);
        alert("Game Over");
        return;
    }

    // Check if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * canvas.width / unit) * unit,
            y: Math.floor(Math.random() * canvas.height / unit) * unit
        };
    } else {
        snake.pop();
    }

    // Add new head
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'black';
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(food.x, food.y, unit, unit);
}

// Check for collisions with itself
function collision(head, array) {
    for (let i = 1; i < array.length; i++) { // Start from 1 to skip the head itself
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let gameLoop = setInterval(game, 100);
