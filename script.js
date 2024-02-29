import dictionary from "./dictionary.js";
import answerList from "./answerList.js";

const guessGrid = document.querySelector("[data-guess-grid]");
const keyboard = document.querySelector("[data-keyboard]");
const alertContainer = document.querySelector("[data-alert-container]");
const WORD_LENGTH = 5;
const index = Math.floor(Math.random() * answerList.length);
const randomWord = answerList[index];

console.log(randomWord)

startGame()

function startGame() {
    document.addEventListener("click", mouseClick);
    document.addEventListener("keydown", keyClick);
}

function endGame() {
    document.addRemoveListener("click", mouseClick);
    document.addRemoveListener("keydown", keyClick);
}

function mouseClick(e) {
    if (e.target.matches("[data-key]")) {
    enterLetter(e.target.dataset.key);
    } else if (e.target.matches("[data-enter]")) {
      enterLetter(e);
    } else if (e.target.matches("[data-delete]")) {
      deleteKey();
    }
}

function keyClick(e) {
    if (e.key === "Enter") {
        submitGuess();
    } else if (e.key === "Backspace" || e.key === "Delete") {
        deleteLetter();
    } else if (e.key.match(/^[a-z]$/)) {
        enterLetter(e.key);
    }
}

function enterLetter(key) {
    const activeTiles = getActiveTiles();
    if (activeTiles.length >= WORD_LENGTH) return;
    const nextTile = guessGrid.querySelector(":not([data-letter])");
    nextTile.dataset.letter = key.toLowerCase();
    nextTile.textContent = key;
    nextTile.dataset.state = "active";
}

function deleteLetter() {
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
    if (lastTile == null) return
    lastTile.textContent = ""
    delete lastTile.dataset.state
    delete lastTile.dataset.letter
}

function submitGuess() {
    const activeTiles = [...getActiveTiles()]
    if (activeTiles.length !== WORD_LENGTH) {
        showAlert("Not enough letters");
        shakeTiles();
        return;
    }
}

function flipTile() {

}

function getActiveTiles() {
    return guessGrid.querySelectorAll("[data-state='active']");
}

function showAlert(message, duration = 1000) {
    const alert = document.createElement("div")
    alert.textContent = message
    alert.classList.add("alert")
    alertContainer.prepend(alert)
    if (duration == null) return
  
    setTimeout(() => {
      alert.classList.add("hide")
      alert.addEventListener("transitionend", () => {
        alert.remove()
      })
    }, duration)
}

function shakeTiles() {

}

function checkWin() {

}

function danceTiles() {

}
