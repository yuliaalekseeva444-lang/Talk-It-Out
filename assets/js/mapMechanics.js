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

function setupPlayersPositions() {
    players.forEach(player => {
        playerPositions[player] = 0; // Start at level 'Depth'
    });

    displayMap();
}

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
    questionButton.style.display = 'block';
    questionButton.style.margin = '20px auto';
    questionButton.innerText = `Ask ${player} a Question`;

    questionButton.onclick = function() {
        const questionImage = document.createElement('img');
        questionImage.className = 'question-card';
        questionImage.src = getQuestionCard(player, character);
        playerQuestionContainer.innerHTML = '';
        playerQuestionContainer.appendChild(questionImage);
        playerQuestionContainer.appendChild(nextButton);
    };

    const nextButton = document.createElement('button');
    nextButton.style.display = 'block';
    nextButton.style.margin = '20px auto';
    nextButton.innerText = 'Next';
    nextButton.onclick = nextPlayer;

    playerQuestionContainer.appendChild(questionButton);
}

function getQuestionCard(player, character) {
    const stars = playerPositions[player];
    let questions = [];
    if (stars < 3) {
        questions = character.getDepthQuestions();
    } else if (stars < 6) {
        questions = character.getShallowQuestions();
    } else {
        questions = character.getShoreQuestions();
    }
    return questions[0]; // Just taking the first question card for now
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
            playerPositions[player] = Math.min(mapLevels.length * 3, playerPositions[player] + 1);
            displayMap();
            checkWinner();
        };
        scoreContainer.appendChild(playerButton);
    });
}

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

function resetGame() {
    location.reload();
}
