// main.js
import { initializeGame } from './gameMechanics.js';
import { setupEventListeners } from './eventListeners.js';

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeGame();
});
