// mapMechanics.js
let currentPlayerIndex = 0;
let playerPositions = {};
const mapLevels = ['Depth', 'Shallow', 'Shore'];

function setupPlayersPositions() {
    players.forEach(player => {
        playerPositions[player] = 0; // Start level at 'Depth'
    });

    displayMap();
}

function displayMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = `<img src='assets/map.png' alt='Map' style='width:100%'>`;
    players.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.style.position = 'absolute';
        playerDiv.style.left = `${10 + index * 10}%`;
        playerDiv.style.bottom = `${playerPositions[player] * 30 + 10}%`;
        playerDiv.innerText = `${player} ★`;
        mapContainer.appendChild(playerDiv);
    });
    mapContainer.onclick = moveToPlayerScreen;
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

    const characterIndex = characterNames.indexOf(player);
    const character = characterImages[Object.keys(characterImages)[characterIndex]];

    const questionButton = document.createElement('button');
    questionButton.innerText = `Ask ${player} a Question`;

    questionButton.onclick = function() {
        alertQuestion(player, character);
    };

    playerQuestionContainer.appendChild(questionButton);
}

function alertQuestion(player, character) {
    let questions = [];
    const stars = playerPositions[player];
    if (stars <= 2) {
        questions = character.getDepthQuestions();
    } else if (stars <= 5) {
        questions = character.getShallowQuestions();
    } else {
        questions = character.getShoreQuestions();
    }
    const question = questions.shift();
    alert(`Question for ${player}: ${question ? question : 'No question available'}`);
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
            playerPositions[player] = Math.min(mapLevels.length - 1, playerPositions[player] + 1);
            displayMap();
            checkWinner();
        };
        scoreContainer.appendChild(playerButton);
    });
}

function checkWinner() {
    for (let player of players) {
        if (playerPositions[player] >= mapLevels.length * 3) {
            alert(`${player} wins!`);
            resetGame();
            break;
        }
    }
    moveToMapScreen();
}

function resetGame() {
    location.reload();
}
