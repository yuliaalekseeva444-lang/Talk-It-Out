// mapMechanics.js
let currentPlayerIndex = 0;
let playerPositions = {};

function setupPlayersPositions() {
    players.forEach(player => {
        playerPositions[player] = 0; // Start at the bottom
    });
}

function displayMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = `<img src='assets/map.png' alt='Map' style='width:100%'>`;
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.innerText = `${player} - Position: ${playerPositions[player]}`;
        mapContainer.appendChild(playerDiv);
    });
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
    const questionButton = document.createElement('button');
    questionButton.innerText = `Ask ${player} a Question`;
    questionButton.onclick = function() {
        const level = levels[playerPositions[player]];
        alert(`Question for ${player} from level: ${level}`);
    };
    playerQuestionContainer.appendChild(questionButton);
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (currentPlayerIndex === 0) {
        moveToScoreScreen();
    } else {
        displayPlayerQuestions();
    }
}

function moveToScoreScreen() {
    document.getElementById('player-question').classList.add('hidden');
    document.getElementById('score-screen').classList.remove('hidden');
    displayScoring();
}

function displayScoring() {
    const scoreContainer = document.getElementById('score-screen');
    scoreContainer.innerHTML = '';
    players.forEach(player => {
        const playerButton = document.createElement('button');
        playerButton.innerText = `Vote for ${player}`;
        playerButton.onclick = function() {
            playerPositions[player]++;
            displayMap();
            checkWinner();
        };
        scoreContainer.appendChild(playerButton);
    });
}

function checkWinner() {
    for (let player of players) {
        if (playerPositions[player] >= 3) {
            alert(`${player} wins!`);
            resetGame();
            break;
        }
    }
    moveToMapScreen();
}

function resetGame() {
    // Reset game to initial state
    location.reload();
}
