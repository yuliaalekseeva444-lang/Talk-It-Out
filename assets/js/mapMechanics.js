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

const coordinates = [
    [75, 9], [50, 17], [25, 25],
    [25, 41], [50, 50], [75, 58],
    [75, 75], [50, 83], [50, 92]
];

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

    // displayMap();
}

// Displays the map along with player icons positioned appropriately.
function displayMap(playerMap) {
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.remove("hidden")

    players.forEach((player, index) => {
        playerId = 'player-' + index
        let playerDiv = mapContainer.querySelector('div #' + playerId);
        if (playerDiv == null) {
            playerDiv = document.createElement('div');
            playerDiv.id = playerId;
            playerDiv.style.position = 'absolute';

            const playerIcon = document.createElement('img');
            playerIcon.src = playerIcons[player];
            playerIcon.alt = player;
            playerIcon.style.width = '18vw'; // Increased size
            playerIcon.style.height = 'auto';
            playerIcon.style.display = 'block';
            playerIcon.style.margin = '-50% -50%';
            playerIcon.style.filter = 'drop-shadow(5px 5px 5px rgba(255, 255, 0, 0.8))'; // Glow effect

            const playerInfo = document.createElement('div');
            playerInfo.style.textAlign = 'center';
            //  playerInfo.innerText = `${player} ★ ${currentPosition}`;

            playerDiv.appendChild(playerIcon);
            playerDiv.appendChild(playerInfo);

            //  relativeContainer.appendChild(playerDiv);
            mapContainer.appendChild(playerDiv);
        }


        if (index === currentPlayerIndex) {
            playerDiv.classList.remove('hidden')
        } else {
            playerDiv.classList.add('hidden')
        }

        const currentPosition = playerPositions[player];

        const coords = coordinates[currentPosition]

        playerDiv.style.left = coords[0] + '%';
        playerDiv.style.bottom = coords[1] + '%'; // Added 20% from the top
    });


    mapContainer.onclick = function () {
        nextPlayer();
    }
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

    const characterKey = characterImageKeys[player];
    const character = characterImages[characterKey];

    if (!character) {
        console.error(`Character images not found for ${player}`);
        return;
    }

    const playerQuestionCover = document.createElement('div');
    playerQuestionCover.className = 'playerQuestionCover';
    //document.getElementById('player-question-cover');
    playerQuestionCover.style.backgroundImage = 'url(' + getCardBack(player, character) + ')';
    playerQuestionContainer.style.backgroundImage = 'url(' + getCardFront(player, character) + ')';

    playerQuestionContainer.appendChild(playerQuestionCover);


    playerQuestionCover.onclick = function () {

        playerQuestionCover.remove(); // Remove the cover

        playerQuestionContainer.innerHTML = '';

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
        questionText.style.top = '25%'; // Adjusted for better fit
        questionText.style.left = '10%'; // Center text within card
        questionText.style.color = '#4682b4';
        questionText.style.fontSize = '7vw';
        questionText.style.fontWeight = 'bold';
        questionText.style.padding = '5vw';
        questionText.style.width = '80%'; // Fits within card size
        questionText.style.boxSizing = 'border-box';
        questionText.innerHTML = questionTextContent;

        playerQuestionContainer.appendChild(questionText);

        const nextButton = document.createElement('button');
        nextButton.style.position = 'absolute';
        nextButton.style.bottom = '20px';
        nextButton.style.left = '50%';
        nextButton.style.transform = 'translateX(-50%)';
        nextButton.style.display = 'block';
        nextButton.style.margin = '0 auto';
        nextButton.style.maxWidth = '80%';
        nextButton.innerText = 'Next';
        nextButton.onclick = function () {
            playerQuestionContainer.classList.add('hidden');
            addPosition(player)
            displayMap(player);
            //  moveToMapScreen();
        }
        // nextButton.onclick = nextPlayer;

        //    questionWrapper.appendChild(nextButton);

        // playerQuestionContainer.innerHTML = '';
        playerQuestionContainer.appendChild(nextButton);
    };

    //  questionWrapper.appendChild(questionButton);
    //  playerQuestionContainer.appendChild(questionWrapper);
}

function addPosition(player) {
    console.log("add position to " + player)
    playerPositions[player] = Math.min(mapLevels.length * 3, playerPositions[player] + 1);
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
        moveToPlayerScreen();
    }
}

// Moves to the score screen to handle player voting.
function moveToScoreScreen() {
    document.getElementById('map-container').classList.add('hidden');
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
        playerButton.onclick = function () {
            // playerPositions[player] = Math.min(mapLevels.length * 3, playerPositions[player] + 1);
            //   displayMap();
            scoreContainer.classList.add('hidden');
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
    // displayMap()
    moveToPlayerScreen();

    // moveToMapScreen();
}

// Reloads the page to reset the game to its initial state.
function resetGame() {
    location.reload();
}
