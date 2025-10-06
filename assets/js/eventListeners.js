// eventListeners.js
import { showPlayerSelection, startTheGame } from './playerSelection.js';
import { playClick } from './sound.js';

function setupEventListeners() {
    const playButton = document.getElementById('play-button');
    const rulesButton = document.getElementById('rules-button');
    const charactersButton = document.getElementById('characters-button');
    const charactersButton2 = document.getElementById('characters-button-2');
    const startGameButton = document.getElementById('start-game');

    if (playButton) {
        playButton.addEventListener('click', (e) => { playClick(); showPlayerSelection(e); });
    }
    if (rulesButton) {
        rulesButton.addEventListener('click', (e) => { playClick(); toggleModal('help-modal', false); });
    }
    if (charactersButton) {
        charactersButton.addEventListener('click', (e) => { playClick(); toggleModal('characters-modal', false); });
    }
    if (charactersButton2) {
        charactersButton2.addEventListener('click', (e) => {
            playClick();
            toggleModal('characters-modal', false); });
    }
    if (startGameButton) {
        startGameButton.addEventListener('click', (e) => { playClick(); startTheGame(e); });
    }

    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            playClick();
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