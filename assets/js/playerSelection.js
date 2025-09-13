// playerSelection.js
let players = [];
const characterNames = ['Panicked Speaker', 'The Fugitive', 'The Clown', 'Invisible', 'Writer'];

// Shows the player selection screen.
function showPlayerSelection() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('player-selection').classList.remove('hidden');
}

// Selects players based on the given number and initializes their positions.
function selectPlayers(num) {
    players = [];
    const shuffledNames = characterNames.sort(() => Math.random() - 0.5);
    for (let i = 0; i < num; i++) {
        players.push(shuffledNames[i]);
    }
    console.log(num + " players selected and players are: " + players + "")
    setupPlayersPositions();
    loadMapScreen();
}

// Loads the map screen after player selection.
function loadMapScreen() {
    document.getElementById('player-selection').classList.add('hidden');
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.remove('hidden');
    mapContainer.addEventListener('click', moveToPlayerScreen);
    displayMap();
}

// Moves from the score screen back to the map screen.
function moveToMapScreen() {
    document.getElementById('score-screen').classList.add('hidden');
    document.getElementById('map-container').classList.remove('hidden');
}
