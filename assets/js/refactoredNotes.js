// game.js will be split to: 
// - eventListeners.js for DOM & event handling,
// - gameMechanics.js for the game logic,
// - characterImages.js for image extraction logic

// eventListeners.js
function setupEventListeners() {
    const rulesButton = document.getElementById('rules-button');
    const helpModal = document.getElementById('help-modal');
    const closeButton = document.querySelector('.close-button');

    rulesButton.addEventListener('click', function() {
        helpModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });
}

// gameMechanics.js
function showLevel() {
    const levels = ['Bottom', 'Shallow', 'Shore'];
    const gameContainer = document.getElementById('game-container');
    let currentLevelIndex = 0;

    const level = levels[currentLevelIndex];
    gameContainer.innerHTML = `<h2>Level: ${level}</h2><div id="cards"></div>`;
    showCards();
}

function showCards() {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
    const character = characterImages.panickedSpeaker; // Using panickedSpeaker as default
    let cards, questions;

    if (currentLevelIndex === 0) {
        cards = character.getDepthCard();
        questions = character.getDepthQuestions();
    } else if (currentLevelIndex === 1) {
        cards = character.getShallowCard();
        questions = character.getShallowQuestions();
    } else if (currentLevelIndex === 2) {
        cards = character.getShoreCard();
        questions = character.getShoreQuestions();
    }

    const card = document.createElement('img');
    card.className = 'card';
    card.src = cards;
    cardsContainer.appendChild(card);

    questions.forEach((questionSrc, i) => {
        const question = document.createElement('img');
        question.className = 'question';
        question.src = questionSrc;
        question.addEventListener('click', answerQuestion);
        cardsContainer.appendChild(question);
    });
}

function answerQuestion() {
    let currentStage = 0;
    if (currentStage >= 3) {
        currentStage = 0;
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            showLevel();
        } else {
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = '<h2>Congratulations! You reached the shore!</h2>';
        }
    }
}

// characterImages.js
function extractImagesFromGrid(imagePath, rows, cols, outputWidth, outputHeight) {
    const image = new Image();
    image.src = imagePath;

    function getImage(row, col) {
        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        const context = canvas.getContext('2d');
        context.drawImage(image, col * outputWidth, row * outputHeight, outputWidth, outputHeight, 0, 0, outputWidth, outputHeight);
        return canvas.toDataURL();
    }

    return {
        getShoreCard: function() {
            return getImage(0, 0);
        },
        getShoreQuestions: function() {
            return Array.from({ length: cols - 1 }, (_, i) => getImage(0, i + 1));
        },
        getShallowCard: function() {
            return getImage(1, 0);
        },
        getShallowQuestions: function() {
            return Array.from({ length: cols - 1 }, (_, i) => getImage(1, i + 1));
        },
        getDepthCard: function() {
            return getImage(2, 0);
        },
        getDepthQuestions: function() {
            return Array.from({ length: cols - 1 }, (_, i) => getImage(2, i + 1));
        },
    };
}
