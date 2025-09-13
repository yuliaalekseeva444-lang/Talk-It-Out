// Removing unused or redundant code and refactoring existing structures to improve efficiency and readability.

// Initialize the game when "Play" is clicked
function initializeGame(character) {
    currentLevelIndex = 0;
    currentStage = 0;
    proceedToNextLevel(character);
}

// Proceeds to the next stage or level in the game.
function proceedToNextLevel(character) {
    if (character) {
        // Update and display the current card based on the player's progress
        displayCurrentCard(character);
    } else {
        // If character not selected, prompt user to choose
        displayCharacterSelectionPrompt();
    }
}

// Displays the current card based on player progress
function displayCurrentCard(character) {
    const levelType = determineLevelType();
    const cardFront = getCardFront(character, levelType);

    if (cardFront) {
        displayCardFront(cardFront);
    } else {
        endGame();
    }
}

// Determine the current level type (e.g., Depth, Shallow, Shore)
function determineLevelType() {
    return mapLevels[currentLevelIndex];
}

// Retrieves the front card image based on character and level type
function getCardFront(character, levelType) {
    switch (levelType) {
        case 'Depth':
            return character.getDepthCardFront();
        case 'Shallow':
            return character.getShallowCardFront();
        case 'Shore':
            return character.getShoreCardFront();
        default:
            return '';
    }
}

// Displays the front card
function displayCardFront(cardFront) {
    const cardContainer = document.getElementById('player-question');
    cardContainer.innerHTML = '';
    const cardImage = document.createElement('img');
    cardImage.src = cardFront;
    cardContainer.appendChild(cardImage);
    cardContainer.style.display = 'block';
}

// Ends the game when the final stage is completed
function endGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Congratulations! You completed all levels!</h2>';
}

// Stub function to prompt character selection. Implementation needed according to game design.
function displayCharacterSelectionPrompt() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Please select a character to continue</h2>';
}
