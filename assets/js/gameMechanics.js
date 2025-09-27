// gameMechanics.js
import { getCardFrontByLevel, getCardBackByLevel, findWinner } from './helpers.js';
import { moveToPlayerScreen } from './mapMechanics.js';

let currentLevelIndex = 0;
let currentStage = 0;

function initializeGame() {
    currentLevelIndex = 0;
    currentStage = 0;
    // Other initialization if necessary
}

function proceedToNextLevel(character) {
    if (character) {
        displayCurrentCard(character);
    } else {
        displayCharacterSelectionPrompt();
    }
}

function displayCurrentCard(character) {
    const levelType = determineLevelType();
    const cardFront = getCardFrontByLevel(character, levelType);

    if (cardFront) {
        displayCardFront(cardFront);
    } else {
        showWinnerScreen();
    }
}

function determineLevelType() {
    return mapLevels[currentLevelIndex];
}

function displayCardFront(cardFront) {
    const cardContainer = document.getElementById('player-question');
    cardContainer.innerHTML = '';
    const cardImage = document.createElement('img');
    cardImage.src = cardFront;
    cardContainer.appendChild(cardImage);
}

function showWinnerScreen() {
    // Logic for winner screen
}

function displayCharacterSelectionPrompt() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Please select a character to continue</h2>';
}

export { initializeGame };