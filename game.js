document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('game-container');
    const rulesButton = document.getElementById('rules-button');
    const helpModal = document.getElementById('help-modal');
    const closeButton = document.querySelector('.close-button');

    const levels = ['Bottom', 'Shallow', 'Shore'];
    let currentLevelIndex = 0;
    let currentStage = 0;

    function showLevel() {
        const level = levels[currentLevelIndex];
        gameContainer.innerHTML = `<h2>Level: ${level}</h2><div id="cards"></div>`;
        showCards();
    }

    function showCards() {
        const cardsContainer = document.getElementById('cards');
        cardsContainer.innerHTML = '';
        for(let i = 0; i < 3; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerText = `Card ${i + 1} on level ${levels[currentLevelIndex]}`;
            card.addEventListener('click', answerQuestion);
            cardsContainer.appendChild(card);
        }
    }

    function answerQuestion() {
        // Logic for answering a question
        currentStage++;
        if (currentStage >= 3) {
            currentStage = 0;
            currentLevelIndex++;
            if (currentLevelIndex < levels.length) {
                showLevel();
            } else {
                gameContainer.innerHTML = '<h2>Congratulations! You reached the shore!</h2>';
            }
        }
    }

    rulesButton.addEventListener('click', function() {
        helpModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === helpModal) {
            helpModal.style.display = 'none';
        }
    });

    showLevel();
});