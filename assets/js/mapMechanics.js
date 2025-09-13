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

// Sets initial positions for players and displays the map.
function setupPlayersPositions() {
    players.forEach(player => {
        playerPositions[player] = 0; // Start at level 'Depth'
    });

    displayMap();
}

// Displays the map along with player icons positioned appropriately.
function displayMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = `<img src='assets/map.png' alt='Map' style='width:100%'>`;
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.style.position = 'absolute';

        const currentPosition = playerPositions[player];
        const level = Math.floor(currentPosition / 3);
        const positionInLevel = currentPosition % 3;

        playerDiv.style.left = `${10 + index * 10}%`;
        playerDiv.style.bottom = `${level * 10 + positionInLevel * 3 + 10}%`;

        const playerIcon = document.createElement('img');
        playerIcon.src = playerIcons[player];
        playerIcon.alt = player;
        playerIcon.style.width = '50px';
        playerIcon.style.height = '50px';
        playerIcon.style.display = 'block';
        playerIcon.style.margin = '0 auto';

        const playerInfo = document.createElement('div');
        playerInfo.style.textAlign = 'center';
        playerInfo.innerText = `${player} ★ ${currentPosition}`;

        playerDiv.appendChild(playerIcon);
        playerDiv.appendChild(playerInfo);

        mapContainer.appendChild(playerDiv);
    });
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
    playerQuestionContainer.innerHTML = '';
    const player = players[currentPlayerIndex];

    const characterIndex = characterNames.indexOf(player);
    const character = characterImages[Object.keys(characterImages)[characterIndex]];

    const questionButton = document.createElement('button');
    questionButton.style.display = 'block';
    questionButton.style.margin = '20px auto';
    questionButton.innerText = `Ask ${player} a Question`;

    questionButton.onclick = function() {
        const questionImage = document.createElement('img');
        questionImage.className = 'question-card';
        questionImage.src = getQuestionCard(player, character);
        playerQuestionContainer.innerHTML = '';

        const questionText = document.createElement('div');
        questionText.style.position = 'absolute';
        questionText.style.top = '50%';
        questionText.style.left = '50%';
        questionText.style.transform = 'translate(-50%, -50%)';
        questionText.style.color = '#fff';
        questionText.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        questionText.style.padding = '10px';
        questionText.style.borderRadius = '5px';
        questionText.innerHTML = getQuestionText(player, character, questionImage.src);

        const questionWrapper = document.createElement('div');
        questionWrapper.style.position = 'relative';
        questionWrapper.appendChild(questionImage); // Corrected this line.
        questionWrapper.appendChild(questionText);

        playerQuestionContainer.appendChild(questionWrapper);

        const nextButton = document.createElement('button');
        nextButton.style.display = 'block';
        nextButton.style.margin = '20px auto';
        nextButton.innerText = 'Next';
        nextButton.onclick = nextPlayer;

        playerQuestionContainer.appendChild(nextButton);
    };

    playerQuestionContainer.appendChild(questionButton);
}

// Retrieves the text for a question based on the player's current position and image src.
function getQuestionText(player, character, imagePath) {
    let questions = [];
    switch (imagePath) {
        case character.getDepthCardFront():
            questions = character.getDepthQuestions();
            break;
        case character.getShallowCardFront():
            questions = character.getShallowQuestions();
            break;
        case character.getShoreCardFront():
            questions = character.getShoreQuestions();
            break;
    }
    return questions[0]; // Just taking the first question for now
}

// Retrieves a question card based on the player's current position.
function getQuestionCard(player, character) {
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
