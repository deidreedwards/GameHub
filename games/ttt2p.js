// Game variables
let currentPlayer = "X";
let playerPiece = ""; // Added variable for player's chosen piece
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning conditions
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

// Function to set player's chosen piece
function setPlayerPiece(piece) {
  playerPiece = piece;
  currentPlayer = playerPiece;
  playerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

// Display player's turn
const playerDisplay = document.getElementById("player-display");
playerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;

// Handle cell click
function handleCellClick(cell, cellIndex) {
  if (gameState[cellIndex] !== "" || !gameActive) {
    return;
  }
  
  gameState[cellIndex] = currentPlayer;
  cell.innerHTML = currentPlayer;
  cell.removeEventListener("click", handleCellClick);
  
  if (checkWin()) {
    playerDisplay.innerHTML = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  
  if (checkDraw()) {
    playerDisplay.innerHTML = "It's a draw!";
    gameActive = false;
    return;
  }
  
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  playerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
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
  currentPlayer = playerPiece; // Set current player as the chosen piece
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.addEventListener("click", () => handleCellClick(cell, cell.dataset.index));
  });
  
  playerDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

// Add event listeners to cells
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleCellClick(cell, cell.dataset.index));
});

// Add event listener to restart button
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);
