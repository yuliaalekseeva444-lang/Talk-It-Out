// mapMechanics.js
let currentPlayerIndex = 0;
let playerPositions = {};
const mapLevels = ['Depth', 'Shallow', 'Shore'];

const playerIcons = {
    'Panicked Speaker': 'assets/icons/pufferfish-icon.png',
    'The Fugitive': 'assets/icons/crab-icon.png',
    'The Clown': 'assets/icons/dolphin-icon.png',
    'Invisible': 'assets/icons/flatfish-icon.png',
    'Writer': 'assets/icons/eel-icon.png'
};

// Map player names to lowercase keys to match character images
const characterImageKeys = {
    'Panicked Speaker': 'pufferfish',
    'The Fugitive': 'crab',
    'The Clown': 'dolphin',
    'Invisible': 'flatfish',
    'Writer': 'eel'
};

// Sets initial positions for players and displays the map.
function setupPlayersPositions() {
    players.forEach(player => {
        playerPositions[player] = 0; // Start at the beginning
    });

    displayMap();
}

// Displays the map along with player icons positioned appropriately.
function displayMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = `<img src='assets/map.png' alt='Map' style='width:100%; height:auto;'>`;

    const relativeContainer = document.createElement('div');
    relativeContainer.style.position = 'relative';
    relativeContainer.style.width = '100%';
    relativeContainer.style.height = '100%';
    mapContainer.appendChild(relativeContainer);

    const mapImage = mapContainer.querySelector('img');
    mapImage.onload = function() {
        const mapHeight = mapImage.clientHeight;
        const starHeight = mapHeight / 9; // Total 9 stars, 9 sections vertically

        players.forEach((player, index) => {
            const playerDiv = document.createElement('div');
            playerDiv.style.position = 'absolute';

            const currentPosition = playerPositions[player];

            playerDiv.style.left = `${(index + 1) * 15}%`;
            playerDiv.style.bottom = `${currentPosition * starHeight}px`;

            const playerIcon = document.createElement('img');
            playerIcon.src = playerIcons[player];
            playerIcon.alt = player;
            playerIcon.style.width = '10vw';
            playerIcon.style.height = 'auto';
            playerIcon.style.display = 'block';
            playerIcon.style.margin = '0 auto';

            const playerInfo = document.createElement('div');
            playerInfo.style.textAlign = 'center';
            playerInfo.innerText = `${player} ★ ${currentPosition}`;

            playerDiv.appendChild(playerIcon);
            playerDiv.appendChild(playerInfo);

            relativeContainer.appendChild(playerDiv);
        });
    };

    mapContainer.onclick = moveToPlayerScreen;
}

// Moves the view from the map screen to the player question screen.
function moveToPlayerScreen() {
    document.getElementById('map-container').classList.add('hidden');
    document.getElementById('player-question').classList.remove('hidden');
    displayPlayerQuestions();
}

// Displays the question interface for the current player.
function displayPlayerQuestions() {
    const playerQuestionContainer = document.getElementById('player-question');
    playerQuestionContainer.style.width = '100vw';
    playerQuestionContainer.style.height = '100vh';
    playerQuestionContainer.style.position = 'relative';
    playerQuestionContainer.innerHTML = '';
    const player = players[currentPlayerIndex];

    const characterKey = characterImageKeys[player];
    const character = characterImages[characterKey];

    if (!character) {
        console.error(`Character images not found for ${player}`);
        return;
    }

    const cardBackImage = document.createElement('img');
    cardBackImage.className = 'card-back';
    cardBackImage.src = getCardBack(player, character);
    cardBackImage.style.display = 'block';
    cardBackImage.style.margin = '0 auto';
    cardBackImage.style.maxWidth = '90vw';
    playerQuestionContainer.appendChild(cardBackImage);

    const questionWrapper = document.createElement('div');
    questionWrapper.style.position = 'absolute';
    questionWrapper.style.width = '100%';
    questionWrapper.style.height = '100%';
    questionWrapper.style.top = '0';
    questionWrapper.style.left = '0';

    const questionButton = document.createElement('button');
    questionButton.style.position = 'absolute';
    questionButton.style.bottom = '20px';
    questionButton.style.left = '50%';
    questionButton.style.transform = 'translateX(-50%)';
    questionButton.style.display = 'block';
    questionButton.style.margin = '0 auto';
    questionButton.style.maxWidth = '80%';
    questionButton.innerText = `Ask ${player} a Question`;

    questionButton.onclick = function() {
        const questionImage = document.createElement('img');
        questionImage.className = 'question-card';
        questionImage.src = getCardFront(player, character);
        questionImage.style.display = 'block';
        questionImage.style.margin = '0 auto';
        questionImage.style.maxWidth = '80vw';

        const questionLevelIndex = Math.floor(playerPositions[player] / 3);
        const questionLevel = mapLevels[questionLevelIndex >= mapLevels.length ? mapLevels.length - 1 : questionLevelIndex];
        const questionTextArray = gameQuestions[characterKey][questionLevel.toUpperCase()];

        if (!questionTextArray) {
            console.error(`No questions found for ${characterKey} at level ${questionLevel}`);
            return;
        }

        const randomQuestionIndex = Math.floor(Math.random() * questionTextArray.length);
        const questionTextContent = questionTextArray[randomQuestionIndex];

        const questionText = document.createElement('div');
        questionText.style.position = 'absolute';
        questionText.style.top = '20%';
        questionText.style.left = '50%';
        questionText.style.transform = 'translateX(-50%)';
        questionText.style.color = '#4682b4';
        questionText.style.fontSize = '1.2em';
        questionText.style.fontWeight = 'bold';
        questionText.style.padding = '0 10px';
        questionText.style.width = 'calc(100% - 20px)';
        questionText.innerHTML = questionTextContent;

        questionWrapper.innerHTML = '';
        questionWrapper.appendChild(questionImage);
        questionWrapper.appendChild(questionText);

        const nextButton = document.createElement('button');
        nextButton.style.position = 'absolute';
        nextButton.style.bottom = '20px';
        nextButton.style.left = '50%';
        nextButton.style.transform = 'translateX(-50%)';
        nextButton.style.display = 'block';
        nextButton.style.margin = '0 auto';
        nextButton.style.maxWidth = '80%';
        nextButton.innerText = 'Next';
        nextButton.onclick = nextPlayer;

        questionWrapper.appendChild(nextButton);

        playerQuestionContainer.innerHTML = '';
        playerQuestionContainer.appendChild(questionWrapper);
    };

    questionWrapper.appendChild(questionButton);
    playerQuestionContainer.appendChild(questionWrapper);
}

// Retrieves the front card based on the player's current position.
function getCardFront(player, character) {
    const stars = playerPositions[player];
    let cardFront = '';
    if (stars < 3) {
        cardFront = character.getDepthCardFront();
    } else if (stars < 6) {
        cardFront = character.getShallowCardFront();
    } else {
        cardFront = character.getShoreCardFront();
    }
    return cardFront;
}

// Retrieves the back card based on the player's current position.
function getCardBack(player, character) {
    const stars = playerPositions[player];
    let cardBack = '';
    if (stars < 3) {
        cardBack = character.getDepthCardBack();
    } else if (stars < 6) {
        cardBack = character.getShallowCardBack();
    } else {
        cardBack = character.getShoreCardBack();
    }
    return cardBack;
}

// Proceeds to the next player; if all players have been processed, moves to the score screen.
function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (currentPlayerIndex === 0) {
        moveToScoreScreen();
    } else {
        displayPlayerQuestions();
    }
}

// Moves to the score screen to handle player voting.
function moveToScoreScreen() {
    document.getElementById('player-question').classList.add('hidden');
    document.getElementById('score-screen').classList.remove('hidden');
    displayScoring();
}

// Displays players for voting and updates their scores based on votes.
function displayScoring() {
    const scoreContainer = document.getElementById('score-screen');
    scoreContainer.innerHTML = '';
    players.forEach(player => {
        const playerButton = document.createElement('button');
        playerButton.innerText = `Vote for ${player}`;
        playerButton.onclick = function() {
            playerPositions[player] = Math.min(mapLevels.length * 3, playerPositions[player] + 1);
            displayMap();
            checkWinner();
        };
        scoreContainer.appendChild(playerButton);
    });
}

// Checks if any player has won based on their score and resets the game if a winner is found.
function checkWinner() {
    for (let player of players) {
        if (playerPositions[player] > (mapLevels.length * 3 - 1)) {
            alert(`${player} wins!`);
            resetGame();
            break;
        }
    }
    moveToMapScreen();
}

// Reloads the page to reset the game to its initial state.
function resetGame() {
    location.reload();
}
