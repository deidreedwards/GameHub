let targetWord;

fetch("words.txt")
  .then(response => response.text())
  .then(data => {
    const words = data.split("\n");
    targetWord = getRandomWord(words);
  })
  .catch(error => console.log(error));

document.getElementById("guess-button").addEventListener("click", handleGuess);

function getRandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

function handleGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toLowerCase();
  guessInput.value = "";

  if (guess.length !== 5) {
    alert("Please enter a 5-letter word.");
    return;
  }

  const feedbackRow = document.getElementById("feedback-row");
  feedbackRow.innerHTML = "";

  for (let i = 0; i < guess.length; i++) {
    const guessLetter = guess[i];
    const targetLetter = targetWord[i];
    const span = document.createElement("span");

    if (guessLetter === targetLetter) {
      span.classList.add("box", "box-correct");
      span.textContent = guessLetter;
    } else if (targetWord.includes(guessLetter)) {
      span.classList.add("box", "box-wrong");
      span.textContent = guessLetter;
    } else {
      span.classList.add("box", "box-incorrect");
      span.textContent = "_";
    }

    feedbackRow.appendChild(span);
  }

  if (guess === targetWord) {
    alert("Congratulations! You guessed the word.");
  }
}
