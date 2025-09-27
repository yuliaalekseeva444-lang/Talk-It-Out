// gameMechanics.js
import { getCardFrontByLevel, getCardBackByLevel, findWinner } from './helpers.js';

let currentLevelIndex = 0;
let currentStage = 0;

function initializeGame(character) {
    currentLevelIndex = 0;
    currentStage = 0;
    proceedToNextLevel(character);
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
    cardContainer.style.display = 'block';
}

function showWinnerScreen() {
    const winnerScreen = document.getElementById('winner-screen');
    winnerScreen.classList.remove('hidden');

    const winner = findWinner(players, playerPositions, playerStars, mapLevels);
    document.getElementById('winner-name').textContent = winner;
    document.getElementById('winner-image').src = characterImages[winner.toLowerCase()]['getShoreCardFront']();
    document.getElementById('winner-stars').textContent = `Stars: ${Math.floor(Math.random() * 10)}`;

    const otherPlayersList = document.getElementById('other-players');
    otherPlayersList.innerHTML = '';
    for (let i = 1; i < players.length; i++) {
        const playerItem = document.createElement('li');
        playerItem.textContent = `${players[i]} - Stars: ${Math.floor(Math.random() * 10)}`;
        otherPlayersList.appendChild(playerItem);
    }
}

function displayCharacterSelectionPrompt() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Please select a character to continue</h2>';
}