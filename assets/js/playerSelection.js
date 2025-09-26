// playerSelection.js
let players = [];
const characterNames = ['Panicked Speaker', 'The Fugitive', 'The Clown', 'Invisible', 'Writer'];

// Shows the player selection screen.
function showPlayerSelection() {
    document.getElementById('main-menu').classList.add('hidden');
    const ps = document.getElementById('player-selection')
    ps.classList.remove('hidden');

    const dv = document.createElement('div')
    dv.classList.add('checkbox-buttons"')

    characterNames.forEach(name => {
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        checkbox.type = 'checkbox';
        checkbox.name = name;
        checkbox.id = name;
        let clz = characterImageKeys[name]
        checkbox.classList.add(clz)
        label.classList.add(clz)

        const txt = document.createTextNode(name)
        label.appendChild(txt)

        label.htmlFor = checkbox.id;
        dv.appendChild(checkbox);
        dv.appendChild(label);
        checkbox.onchange = function () {
            selectPlayers()
        }
    })
    ps.appendChild(dv)
    selectPlayers()
}

// Selects players based on the given number and initializes their positions.
function selectPlayers() {
    players = [];

    const inputs = document.getElementsByTagName('input')

    for (let input of inputs) {
        if (input.type === "checkbox") {
            if (input.checked) {
                players.push(input.id)
            }
            console.log(input.id, input.checked);
        }
    }


    const startGameBtn = document.getElementById('start-game')
    startGameBtn.innerText = `${players.length} players`
    if (players.length < 2 ) {
        startGameBtn.classList.add('not-enough')
        startGameBtn.innerText = `Not enough players`
        startGameBtn.enabled = false;
    } else {
        startGameBtn.classList.remove('not-enough')
        startGameBtn.enabled = true;
    }


    //console.log(num + " players selected and players are: " + players + "")
    // startTheGame();


    // const shuffledNames = characterNames.sort(() => Math.random() - 0.5);
    // for (let i = 0; i < num; i++) {
    //     players.push(shuffledNames[i]);
    // }
    // console.log(num + " players selected and players are: " + players + "")
    // setupPlayersPositions();
    // startTheGame();
}

// Loads the map screen after player selection.
function startTheGame() {
    if (players.length < 2) {
        return
    }

    document.getElementById('player-selection').classList.add('hidden');
    // const mapContainer = document.getElementById('map-container');
    // mapContainer.classList.remove('hidden');
    // mapContainer.addEventListener('click', moveToPlayerScreen);
    // displayMap();
    //nextPlayer();
    setupPlayersPositions();
    moveToPlayerScreen();
}

// Moves from the score screen back to the map screen.
function moveToMapScreen() {
    document.getElementById('score-screen').classList.add('hidden');
    document.getElementById('map-container').classList.remove('hidden');
}
