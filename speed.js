// Arrays of words for different difficulty levels
const easyWords = ['apple','actor', 'banana','boxer', 'camel', 'drinks', 'exactly', 'fall', 'gentle', 'hunt','iguana','jester','kite','lion','mice','newt','open','press','quilt','rent','slowly','turn','under','voice','water','xray','yellow','zebra'];
const mediumWords = ['applied','alligator','adventure','chocolate', 'guitar', 'lentil', 'monkey', 'orange', 'piano','quacker', 'rabbit', 'turtle'];
const hardWords = ['butterfly', 'crocodile', 'dolphin', 'koala', 'penguin', 'raccoon', 'shark', 'zebra'];
const extraHardWords = ['albatross','benevolent', 'chimpanzee','distraction','e', 'hedgehog', 'jaguar', 'leopard', 'mongoose', 'panther', 'rhinoceros'];

let startBtn = document.getElementById('start-btn');
let wordDisplay = document.getElementById('word-display');
let userInput = document.getElementById('user-input');
let submitBtn = document.getElementById('submit-btn');
let result = document.getElementById('result');
let scoreDisplay = document.getElementById('score');
let restartBtn = document.getElementById('restart-btn');

let currentLevel = 1; // Starting level
let wordSequence = [];
let currentWordIndex = 0;
let timer;
let score = 0;
let gameStarted = false;

// Function to start the game
function startGame() {
  gameStarted = true;
  startBtn.disabled = true;
  userInput.disabled = false;
  submitBtn.disabled = false;
  displayWords();
  startTimer();
}

// Function to display the words for a given level
function displayWords() {
  let currentWords;

  if (currentLevel === 1) {
    currentWords = easyWords;
  } else if (currentLevel === 2) {
    currentWords = mediumWords;
  } else if (currentLevel === 3) {
    currentWords = hardWords;
  } else {
    currentWords = extraHardWords;
  }

  wordSequence = getRandomWords(currentWords, 5); // Level length set to 5 words
  currentWordIndex = 0;
  wordDisplay.textContent = wordSequence[currentWordIndex];
  userInput.value = '';
  result.textContent = '';
}

// Function to get random words from the word array
function getRandomWords(wordArray, numWords) {
  let randomWords = [];
  for (let i = 0; i < numWords; i++) {
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    randomWords.push(wordArray[randomIndex]);
  }
  return randomWords;
}

// Function to start the timer
function startTimer() {
  clearTimeout(timer);
  timer = setTimeout(function() {
    checkUserInput();
  }, (3.5 + currentLevel * 0.5) * 1000); // Decrease time to 2.5 seconds, increase by 0.5 seconds every level
}

// Function to check user input against the current word
function checkUserInput() {
  let userInputValue = userInput.value.toLowerCase();
  let currentWord = wordSequence[currentWordIndex].toLowerCase();

  if (userInputValue === currentWord) {
    currentWordIndex++;
    score++;

    if (currentWordIndex === wordSequence.length) {
      result.textContent = 'Level complete!';
      scoreDisplay.textContent = 'Score: ' + score;
      setTimeout(displayWords, 2000);
    } else {
      wordDisplay.textContent = wordSequence[currentWordIndex];
      userInput.value = '';
      startTimer();
    }
  } else {
    result.textContent = 'Game Over!';
    showFinalScore();
  }
}

// Function to display the final score
function showFinalScore() {
  gameStarted = false;
  wordDisplay.textContent = '';
  userInput.disabled = true;
  submitBtn.disabled = true;
  startBtn.disabled = false;
  restartBtn.disabled = false;
  scoreDisplay.textContent = 'Final Score: ' + score;
}

// Function to restart the game
function restartGame() {
  currentLevel = 1;
  score = 0;
  scoreDisplay.textContent = 'Score: ' + score;
  restartBtn.disabled = true;
}

// Event listener for start button
startBtn.addEventListener('click', function() {
  if (!gameStarted) {
    startGame();
  }
});

// Event listener for submit button
submitBtn.addEventListener('click', function() {
  checkUserInput();
});

// Event listener for restart button
restartBtn.addEventListener('click', function() {
  restartGame();
});

// Event listener for Enter key press
userInput.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    submitBtn.click();
  }
});

// Start the game
displayWords();
