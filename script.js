
// document.addEventListener("DOMContentLoaded", function() {
//     let winCount = 0;
//     let correctNum = 0;
//     let attempts = 3;
//     let currentAttempt = 0;

//     document.getElementById("startGame").addEventListener("click", startGame);
//     document.getElementById("guessBtn").addEventListener("click", makeGuess);

//     function startGame() {
//         const range = parseInt(document.getElementById("difficulty").value);
//         correctNum = Math.floor(Math.random() * range) + 1;
//         attempts = 3;
//         currentAttempt = 0;
//         document.getElementById("userGuess").value = ""; // Clear previous guess input
//         document.getElementById("feedback").textContent = ""; // Clear feedback
//         document.getElementById("gameArea").style.display = "block"; // Show game area
//     }

//     function makeGuess() {
//         const userGuess = parseInt(document.getElementById("userGuess").value);
//         currentAttempt++;

//         if (userGuess === correctNum) {
//             winCount++;
//             document.getElementById("feedback").textContent = "Correct! You've guessed the number.";
//             updateWinCount();
//             resetGame();
//         } else if (userGuess === correctNum + 1 || userGuess === correctNum - 1) {
//             document.getElementById("feedback").textContent = "Almost there!";
//         } else {
//             document.getElementById("feedback").textContent = "Incorrect guess.";
//         }

//         if (currentAttempt >= attempts && userGuess !== correctNum) {
//             document.getElementById("feedback").textContent = 
//                 "You Lose! The correct number was: " + correctNum;
//             resetGame();
//         }
//     }

//     function resetGame() {
//         if (confirm("Do you want to play again?")) {
//             startGame();
//         } else {
//             document.getElementById("gameArea").style.display = "none";
//         }
//     }

//     function updateWinCount() {
//         document.getElementById("winCountDisplay").textContent = "Win Count: " + winCount;
//     }
// });
let maxRange = 10;
let attempts = 3;
let randomNumber = 0;
let score = 0;

// DOM elements
const welcomeScreen = document.getElementById("welcomeScreen");
const gameArea = document.getElementById("gameArea");
const difficulty = document.getElementById("difficulty");
const userGuess = document.getElementById("userGuess");
const feedback = document.getElementById("feedback");
const winCountDisplay = document.getElementById("winCountDisplay");
const restartGameBtn = document.getElementById("restartGame");

// Start Game Button
document.getElementById("startGame").addEventListener("click", () => {
    welcomeScreen.style.display = "none";  // Hide welcome screen
    gameArea.style.display = "block";  // Show the game area
    initializeGame();
});

// Initialize Game based on Difficulty Level
function initializeGame() {
    maxRange = parseInt(difficulty.value);
    randomNumber = Math.floor(Math.random() * maxRange) + 1;
    attempts = 3;
    feedback.textContent = "";
    userGuess.value = "";
    winCountDisplay.textContent = `Score: ${score}`;
}

// Difficulty Change Event
difficulty.addEventListener("change", initializeGame);

// Check Guess Function
document.getElementById("guessBtn").addEventListener("click", () => {
    const guess = parseInt(userGuess.value);

    if (isNaN(guess) || guess < 1 || guess > maxRange) {
        feedback.textContent = `Please enter a number between 1 and ${maxRange}.`;
        return;
    }

    attempts--;

    if (guess === randomNumber) {
        score++;
        feedback.textContent = `Correct! You guessed the number! Score: ${score}`;
        initializeGame();
    } else if (attempts > 0) {
        feedback.textContent = `Wrong guess! You have ${attempts} attempt(s) left.`;
    } else {
        feedback.textContent = `Out of attempts! The correct number was ${randomNumber}. Score: ${score}`;
        // Reset game after showing correct answer
        setTimeout(initializeGame, 3000); // Wait 3 seconds before resetting
    }

    userGuess.value = "";
});

// Restart Game Button functionality
restartGameBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "block"; // Show welcome screen
    gameArea.style.display = "none";  // Hide game area
    score = 0;  // Reset score
    winCountDisplay.textContent = `Score: ${score}`;
});