// Game variables
let currentPlayer;
let gameActive = true;
let gameState;
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Display player's turn
const playerDisplay = document.getElementById("player-display");

// Add event listeners to cells
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell));
});

// Add event listener to restart button
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);

// Start the game
function startGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
}

// Handle cell click
function handleCellClick(cell) {
  const cellIndex = parseInt(cell.dataset.index);
  if (!gameActive || gameState[cellIndex] !== "") {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    playerDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    playerDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.textContent = `Player ${currentPlayer}'s turn`;

  if (currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

// Check for a win
function checkWin() {
  for (let condition of winningConditions) {
    let a = gameState[condition[0]];
    let b = gameState[condition[1]];
    let c = gameState[condition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      return true;
    }
  }

  return false;
}

// Check for a draw
function checkDraw() {
  return !gameState.includes("");
}

// Restart the game
function restartGame() {
  startGame();
}

// Generate random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Minimax algorithm with alpha-beta pruning
function minimax(board, depth, alpha, beta, maximizingPlayer) {
  const scores = {
    X: 1,
    O: -1,
    draw: 0
  };

  if (checkWin()) {
    return scores[currentPlayer];
  } else if (checkDraw()) {
    return scores["draw"];
  }

  if (maximizingPlayer) {
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = currentPlayer;
        let score = minimax(board, depth + 1, alpha, beta, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
    }

    return bestScore;
  } else {
    let bestScore = Infinity;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = currentPlayer === "X" ? "O" : "X";
        let score = minimax(board, depth + 1, alpha, beta, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
    }

    return bestScore;
  }
}

// Get empty cells
function getEmptyCells() {
  const emptyCells = [];
  gameState.forEach((cell, index) => {
    if (cell === "") {
      emptyCells.push(index);
    }
  });
  return emptyCells;
}

// Computer move
function computerMove() {
  const emptyCells = getEmptyCells();

  // Check if the human player can win and block the move
  currentPlayer = "X";
  for (let i = 0; i < emptyCells.length; i++) {
    const move = emptyCells[i];
    gameState[move] = currentPlayer;
    if (checkWin()) {
      gameState[move] = currentPlayer === "X" ? "O" : "X";
      const cell = cells[move];
      cell.textContent = gameState[move];
      playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
      return;
    }
    gameState[move] = "";
  }
  currentPlayer = "O";

  // Check if the computer can win
  for (let i = 0; i < emptyCells.length; i++) {
    const move = emptyCells[i];
    gameState[move] = currentPlayer;
    if (checkWin()) {
      const cell = cells[move];
      cell.textContent = currentPlayer;
      playerDisplay.textContent = "Computer wins!";
      return;
    }
    gameState[move] = "";
  }

  // If no winning moves, use the minimax algorithm
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < emptyCells.length; i++) {
    const move = emptyCells[i];
    gameState[move] = currentPlayer;
    const score = minimax(gameState, 0, -Infinity, Infinity, false);
    gameState[move] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  gameState[bestMove] = currentPlayer;
  const cell = cells[bestMove];
  cell.textContent = currentPlayer;

  if (checkWin()) {
    playerDisplay.textContent = "Computer wins!";
    return;
  }

  if (checkDraw()) {
    playerDisplay.textContent = "It's a draw!";
    return;
  }

  currentPlayer = "X";
  playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
}


// Start the game initially
startGame();
