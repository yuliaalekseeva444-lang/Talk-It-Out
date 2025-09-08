// refactoredNotes.js
function setupEventListeners() {
    const rulesButton = document.getElementById('rules-button');
    const charactersButton = document.getElementById('characters-button');
    const playButton = document.getElementById('play-button');
    const helpModal = document.getElementById('help-modal');
    const charactersModal = document.getElementById('characters-modal');
    const closeButtons = document.querySelectorAll('.close-button');

    rulesButton.addEventListener('click', function() {
        toggleDisplay(helpModal, true);
    });

    charactersButton.addEventListener('click', function() {
        toggleDisplay(charactersModal, true);
    });

    playButton.addEventListener('click', function() {
        toggleDisplay(helpModal, false);
        const mainMenu = document.getElementById('main-menu');
        const gameContainer = document.getElementById('game-container');
        if (mainMenu && gameContainer) {
            mainMenu.style.display = 'none';
            gameContainer.style.display = 'block';
            currentLevelIndex = 0; // Reset level index
            currentStage = 0; // Reset stage
            showLevel();
        }
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleDisplay(helpModal, false);
            toggleDisplay(charactersModal, false);
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === helpModal || event.target === charactersModal) {
            toggleDisplay(event.target, false);
        }
    });
}

function toggleDisplay(element, show) {
    if (show) {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}
