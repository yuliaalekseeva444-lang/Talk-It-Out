// eventListeners.js
import { showPlayerSelection, startTheGame } from './playerSelection.js';

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
}

function toggleModal(modalId, hide) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden', hide);
    }
}

export { setupEventListeners };