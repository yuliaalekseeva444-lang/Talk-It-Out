// mapMechanics.js
import { getCardFrontByLevel, getCardBackByLevel, findWinner } from './helpers.js';
import { players } from './playerSelection.js';
import { characterImages } from './characterImages.js';
import { gameQuestions } from './gameQuestions.js';
import { playClick } from './sound.js';

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

const mapPositionCoordinates = [
    [75, 9], [50, 17], [25, 25],
    [25, 41], [50, 50], [75, 58],
    [75, 75], [50, 83], [25, 92]
];

const characterImageKeys = {
    'Panicked Speaker': 'pufferfish',
    'The Fugitive': 'crab',
    'The Clown': 'dolphin',
    'Invisible': 'flatfish',
    'Writer': 'eel'
};

function setupPlayersPositions() {
    players.forEach(player => {
        playerPositions[player] = 0;
        playerStars[player] = 0;
    });
}

function displayMap(playerMap) {
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.remove("hidden")

    players.forEach((player, index) => {
        const playerId = 'player-' + index
        let playerDiv = mapContainer.querySelector('div#' + playerId);
        if (playerDiv == null) {
            playerDiv = document.createElement('div');
            playerDiv.id = playerId;
            playerDiv.className = 'player-div';

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

        const coords = mapPositionCoordinates[currentPosition]

        playerDiv.style.left = coords[0] + '%';
        playerDiv.style.bottom = coords[1] + '%';
    });

    mapContainer.onclick = function () {
        playClick();
        nextPlayer();
    }
}

function moveToPlayerScreen() {
    document.getElementById('map-container').classList.add('hidden');
    document.getElementById('player-question').classList.remove('hidden');
    displayPlayerQuestions();
}

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
    playerQuestionCover.style.backgroundImage = 'url(' + getCardBackByLevel(player, character, playerPositions[player]) + ')';
    playerQuestionContainer.style.backgroundImage = 'url(' + getCardFrontByLevel(player, character, playerPositions[player]) + ')';

    playerQuestionContainer.appendChild(playerQuestionCover);


    playerQuestionCover.onclick = function () {
        playClick();

        playerQuestionCover.remove();

        playerQuestionContainer.innerHTML = '';

        const questionImage = document.createElement('img');
        questionImage.className = 'question-card';
        questionImage.src = getCardFrontByLevel(player, character, playerPositions[player]);

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
        questionText.className = 'question-text';
        questionText.innerHTML = questionTextContent;

        playerQuestionContainer.appendChild(questionText);

        const nextButton = document.createElement('button');
        nextButton.className = 'next-button';
        nextButton.innerText = 'Next';
        nextButton.onclick = function () {
            playClick();
            playerQuestionContainer.classList.add('hidden');
            addPosition(player)
            displayMap(player);
        }

        const skipButton = document.createElement('button');
        skipButton.className = 'skip-button';
        skipButton.innerText = 'Skip';
        skipButton.onclick = function () {
            playClick();
            playerQuestionContainer.classList.add('hidden');
            displayMap(player);
        }

        playerQuestionContainer.appendChild(nextButton);
        playerQuestionContainer.appendChild(skipButton);

    };
}

function addPosition(player) {
    playerPositions[player] = Math.min(mapLevels.length * 3, playerPositions[player] + 1);
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (currentPlayerIndex === 0) {
        moveToScoreScreen();
    } else {
        displayPlayerQuestions();
        moveToPlayerScreen();
    }
}

function moveToScoreScreen() {
    document.getElementById('map-container').classList.add('hidden');
    document.getElementById('player-question').classList.add('hidden');
    document.getElementById('score-screen').classList.remove('hidden');
    displayScoring();
}

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
            playClick();
            playerStars[player] = playerStars[player] + 1;
            scoreContainer.classList.add('hidden');
            checkWinner();
        };
        scoreContainer.appendChild(playerButton);
    });
}

function checkWinner() {
    const winner = findWinner(players, playerPositions, playerStars, mapLevels);
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

function resetGame() {
    location.reload();
}

// Export characterImageKeys and moveToPlayerScreen for other modules
export { characterImageKeys, setupPlayersPositions, moveToPlayerScreen };
