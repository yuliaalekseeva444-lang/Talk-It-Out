// playerSelection.js
let players = [];
const characterNames = ['Panicked Speaker', 'The Fugitive', 'The Clown', 'Invisible', 'Writer'];

function showPlayerSelection() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('player-selection').classList.remove('hidden');
}

function selectPlayers(num) {
    players = [];
    const shuffledNames = characterNames.sort(() => Math.random() - 0.5);
    for (let i = 0; i < num; i++) {
        players.push(shuffledNames[i]);
    }
    setupPlayersPositions();
    loadMapScreen();
}

function loadMapScreen() {
    document.getElementById('player-selection').classList.add('hidden');
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.remove('hidden');
    mapContainer.addEventListener('click', moveToPlayerScreen);
    displayMap();
}

function moveToMapScreen() {
    document.getElementById('score-screen').classList.add('hidden');
    document.getElementById('map-container').classList.remove('hidden');
}
