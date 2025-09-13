document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Sets up all required event listeners for the game.
function setupEventListeners() {
    const playButton = document.getElementById('play-button');
    const rulesButton = document.getElementById('rules-button');
    const charactersButton = document.getElementById('characters-button');

    if (playButton) {
        playButton.addEventListener('click', startGame);
    }
    if (rulesButton) {
        rulesButton.addEventListener('click', () => toggleModal('help-modal', false));
    }
    if (charactersButton) {
        charactersButton.addEventListener('click', () => toggleModal('characters-modal', false));
    }

    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleModal('help-modal', true);
            toggleModal('characters-modal', true);
        });
    });
}

// Starts the game when the play button is clicked.
function startGame() {
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    if (mainMenu && gameContainer) {
        mainMenu.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        currentLevelIndex = 0; // Reset level index
        currentStage = 0; // Reset stage
        showLevel();
    }
}

// Toggles visibility of modals.
function toggleModal(modalId, hide) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden', hide);
    }
}
