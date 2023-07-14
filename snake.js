document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const startButton = document.getElementById("start-button");
    const gridSize = 20;
    const gridWidth = gameBoard.offsetWidth / gridSize;
    const gridHeight = gameBoard.offsetHeight / gridSize;
    const initialSnakeLength = 3;
    const snakeSpeed = 200; // milliseconds
    let snake = [];
    let direction = "right";
    let fruit = generateFruit();
    let score = 0;
    let gameLoop;
  
    // Generate a random fruit position
    function generateFruit() {
      return {
        x: Math.floor(Math.random() * gridWidth),
        y: Math.floor(Math.random() * gridHeight),
      };
    }
  
    // Update the game state
    function update() {
      const head = { x: snake[0].x, y: snake[0].y };
  
      // Update the head position based on the direction
      if (direction === "right") head.x++;
      if (direction === "left") head.x--;
      if (direction === "up") head.y--;
      if (direction === "down") head.y++;
  
      // Check if the snake hits itself or the wall
      if (
        head.x < 0 ||
        head.x >= gridWidth ||
        head.y < 0 ||
        head.y >= gridHeight ||
        snake.some(
          (segment) => segment.x === head.x && segment.y === head.y
        )
      ) {
        clearInterval(gameLoop);
        alert("Game over! Your score: " + score);
        return;
      }
  
      snake.unshift(head); // Add the new head to the snake
  
      // Check if the snake eats the fruit
      if (head.x === fruit.x && head.y === fruit.y) {
        score++;
        fruit = generateFruit();
      } else {
        snake.pop(); // Remove the tail segment
      }
  
      render(); // Render the updated game state
    }
  
    // Render the game state
    function render() {
      gameBoard.innerHTML = ""; // Clear the game board
  
      // Render the snake
      snake.forEach((segment) => {
        const snakeElement = document.createElement("div");
        snakeElement.className = "snake";
        snakeElement.style.left = segment.x * gridSize + "px";
        snakeElement.style.top = segment.y * gridSize + "px";
        gameBoard.appendChild(snakeElement);
      });
  
      // Render the fruit
      const fruitElement = document.createElement("div");
      fruitElement.className = "fruit";
      fruitElement.style.left = fruit.x * gridSize + "px";
      fruitElement.style.top = fruit.y * gridSize + "px";
      gameBoard.appendChild(fruitElement);
    }
  
    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" && direction !== "left")
        direction = "right";
      if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
      if (event.key === "ArrowUp" && direction !== "down") direction = "up";
      if (event.key === "ArrowDown" && direction !== "up") direction = "down";
    });
  
    // Restart the game
    function restartGame() {
      clearInterval(gameLoop);
      snake = [];
      direction = "right";
      fruit = generateFruit();
      score = 0;
    }
  
    // Add event listener to the start button
    startButton.addEventListener("click", () => {
      restartGame();
      snake = [{ x: 0, y: 0 }];
      gameLoop = setInterval(update, snakeSpeed);
    });
  });
  