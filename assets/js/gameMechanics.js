// gameMechanics.js
const gameLevels = ['Bottom', 'Shallow', 'Shore'];
let currentLevelIndex = 0;
let currentStage = 0;

function showLevel(character) {
    const gameContainer = document.getElementById('game-container');

    const level = gameLevels[currentLevelIndex];
    gameContainer.innerHTML = `<h2>Level: ${level}</h2><div id="cards"></div>`;
    showCards(character);
}

function showCards(character) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    const cardBack = getCardBack(character);
    displayCard(cardBack, cardsContainer, character);
}

function getCardBack(character) {
    switch (currentLevelIndex) {
        case 0:
            return character.getDepthCard();
        case 1:
            return character.getShallowCard();
        case 2:
            return character.getShoreCard();
        default:
            return '';
    }
}

function displayCard(back, container, character) {
    const cardImg = document.createElement('img');
    cardImg.className = 'card';
    cardImg.src = back;

    cardImg.addEventListener('click', function handleCardClick() {
        showFront(cardImg, container, character);
    });

    container.appendChild(cardImg);
}

function showFront(cardImg, container, character) {
    const cardFronts = getCardFronts(character);
    if (cardFronts.length > 0) {
        const front = cardFronts[0];
        cardImg.src = front;
        cardImg.removeEventListener('click', function handleCardClick() {
            showFront(cardImg, container, character);
        });
        cardImg.addEventListener('click', nextStage);
    }
}

function getCardFronts(character) {
    switch (currentLevelIndex) {
        case 0:
            return character.getDepthQuestions();
        case 1:
            return character.getShallowQuestions();
        case 2:
            return character.getShoreQuestions();
        default:
            return [];
    }
}

function nextStage() {
    if (currentStage < 2) {
        currentStage++;
    } else {
        currentStage = 0;
        currentLevelIndex++;
        if (currentLevelIndex < gameLevels.length) {
            showLevel();
        } else {
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = '<h2>Congratulations! You reached the shore!</h2>';
        }
    }
}

function answerQuestion() {
    nextStage();
}

// Initialize the game when "Play" is clicked
function initializeGame(character) {
    currentLevelIndex = 0;
    currentStage = 0;
    showLevel(character);
}
