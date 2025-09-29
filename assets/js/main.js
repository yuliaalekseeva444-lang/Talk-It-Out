// main.js
import { initializeGame } from './gameMechanics.js';
import { setupEventListeners } from './eventListeners.js';
import { initSound } from './sound.js';

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeGame();
    initSound();
});
