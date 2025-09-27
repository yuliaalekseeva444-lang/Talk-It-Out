// mapMechanics.js
let currentPlayerIndex = 0;
let playerPositions = {};
let playerStars = {};
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
    [75, 75], [50, 83], [25, 92]
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
        playerStars[player] = 0;
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
            playerDiv.className = 'player-div'

            const playerIcon = document.createElement('img');
            playerIcon.src = playerIcons[player];
            playerIcon.alt = player;
            playerIcon.className = 'player-icon';

            const playerInfo = document.createElement('div');
            playerInfo.className = 'player-info';

            playerDiv.appendChild(playerIcon);
            playerDiv.appendChild(playerInfo);

            mapContainer.appendChild(playerDiv);
        }

        if (player === playerMap) {
            playerDiv.classList.remove('hidden')
        } else {
            playerDiv.classList.add('hidden');
        }

        const currentPosition = playerPositions[player];

        const coords = coordinates[currentPosition]

        playerDiv.style.left = coords[0] + '%';
        playerDiv.style.bottom = coords[1] + '%';
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
        questionText.style.top = '25%';
        questionText.style.left = '10%';
        questionText.style.color = '#4682b4';
        questionText.style.fontSize = '7vw';
        questionText.style.fontWeight = 'bold';
        questionText.style.padding = '5vw';
        questionText.style.width = '80%';
        questionText.style.boxSizing = 'border-box';
        questionText.innerHTML = questionTextContent;

        playerQuestionContainer.appendChild(questionText);

        const nextButton = document.createElement('button');
        nextButton.style.position = 'absolute';
        nextButton.style.bottom = '20px';
        nextButton.style.left = '25%';
        nextButton.style.transform = 'translateX(-50%)';
        nextButton.style.display = 'block';
        nextButton.style.margin = '0 auto';
        nextButton.style.maxWidth = '80%';
        nextButton.innerText = 'Next';
        nextButton.onclick = function () {
            playerQuestionContainer.classList.add('hidden');
            addPosition(player)
            displayMap(player);
        }

        const skipButton = document.createElement('button');
        skipButton.style.position = 'absolute';
        skipButton.style.bottom = '20px';
        skipButton.style.left = '75%';
        skipButton.style.transform = 'translateX(-50%)';
        skipButton.style.display = 'block';
        skipButton.style.margin = '0 auto';
        skipButton.style.maxWidth = '80%';
        skipButton.innerText = 'Skip';
        skipButton.onclick = function () {
            playerQuestionContainer.classList.add('hidden');
            displayMap(player);
        }

        playerQuestionContainer.appendChild(nextButton);
        playerQuestionContainer.appendChild(skipButton);

    };
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
    const voteFor = document.createElement('h2');
    voteFor.innerText = 'Vote for:';
    scoreContainer.appendChild(voteFor);

    players.forEach(player => {
        const playerButton = document.createElement('button');
        const icon = document.createElement("img")
        icon.src = playerIcons[player];
        icon.width = "24"
        icon.height = "24"
        icon.style.marginRight = "15px"
        icon.alt = player;
        playerButton.appendChild(icon);
        const text = document.createTextNode(player);
        playerButton.appendChild(text);

        playerButton.onclick = function () {
            playerStars[player] = playerStars[player] + 1;
            scoreContainer.classList.add('hidden');
            checkWinner();
        };
        scoreContainer.appendChild(playerButton);
    });
}

// Checks if any player has won based on their score and resets the game if a winner is found.
function checkWinner() {
    let winner = null
    for (let player of players) {
        if (playerPositions[player] >= (mapLevels.length * 3 - 1)) {
            if (winner == null || playerStars[winner] < playerStars[player]) {
            winner = player
            }
        }
    }
    if (winner != null) {
        displayWinnerScreen(winner);
    } else {
        moveToPlayerScreen();
    }
}

function displayWinnerScreen(winner) {
    const winnerScreen = document.getElementById('winner-screen');
    winnerScreen.classList.remove('hidden');
    const winnerName = document.getElementById('winner-name');
    const winnerVotes = document.getElementById('winner-votes');

    if (winnerName && winnerVotes) {
        winnerName.textContent = `${winner}`;
        winnerVotes.textContent = `${playerStars[winner]} stars`;

        winnerName.className = 'winner-name';

        const winnerIcon = document.createElement('img');
        winnerIcon.src = playerIcons[winner];
        winnerIcon.className = 'winner-icon';

        winnerName.prepend(winnerIcon);
    }

    const otherPlayersList = document.getElementById('other-players');
    otherPlayersList.innerHTML = '';
    players.filter(player => player !== winner).forEach(player => {
        const playerItem = document.createElement('li');
        playerItem.className = 'other-player-item';

        const playerIcon = document.createElement('img');
        playerIcon.src = playerIcons[player];
        playerIcon.className = 'other-player-icon';

        playerItem.appendChild(playerIcon);
        playerItem.appendChild(document.createTextNode(`${player} - Stars: ${playerStars[player]}`));

        otherPlayersList.appendChild(playerItem);
    });
}

// Reloads the page to reset the game to its initial state.
function resetGame() {
    location.reload();
}
