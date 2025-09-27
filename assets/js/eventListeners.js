import { showPlayerSelection, startTheGame } from './playerSelection.js';

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Sets up all required event listeners for the game.
function setupEventListeners() {

    const playButton = document.getElementById('play-button');
    const rulesButton = document.getElementById('rules-button');
    const charactersButton = document.getElementById('characters-button');
    const startGameButton = document.getElementById('start-game');

    if (playButton) {
        playButton.addEventListener('click', showPlayerSelection);
    }
    if (rulesButton) {
        rulesButton.addEventListener('click', () => toggleModal('help-modal', false));
    }
    if (charactersButton) {
        charactersButton.addEventListener('click', () => toggleModal('characters-modal', false));
    }
    if (startGameButton) {
        startGameButton.addEventListener('click', startTheGame);
    }

    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal('help-modal', true);
            toggleModal('characters-modal', true);
        });
    });

    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            const depth = e.target.dataset.depth;
            const questions = getQuestions(category, depth);
            displayQuestions(questions);
        });
    });
}

// Displays questions in the player-question div.
function displayQuestions(questions) {
    const questionDiv = document.getElementById('player-question');
    questionDiv.innerHTML = '';
    questionDiv.classList.remove('hidden');

    questions.forEach(question => {
        const questionP = document.createElement('p');
        questionP.textContent = question;
        questionDiv.appendChild(questionP);
    });
}

// Starts the game when the play button is clicked.
function startGame() {
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    if (mainMenu && gameContainer) {
        mainMenu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        currentPlayerIndex = 0; // Reset player index
        currentStage = 0; // Reset stage
        setupPlayersPositions();
        displayMap();
    }
}

// Toggles visibility of modals.
function toggleModal(modalId, hide) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden', hide);
    }
}

// Retrieves questions based on category and depth
function getQuestions(category, depth) {
    // Logic to retrieve questions from gameQuestions, if needed
    return gameQuestions[category] ? gameQuestions[category][depth] || [] : [];
}
