// gameMechanics.js
const gameLevels = ['Bottom', 'Shallow', 'Shore'];
let currentLevelIndex = 0;
let currentStage = 0;

// Displays the current level and setups the game container for the given character.
function showLevel(character) {
    const gameContainer = document.getElementById('game-container');

    if (character) { // Check if character is defined
        const level = gameLevels[currentLevelIndex];
        gameContainer.innerHTML = `<h2>Level: ${level}</h2><div id="cards"></div>`;
        showCards(character);
        displayCardWithQuestion(character);
    } else {
        gameContainer.innerHTML = '<h2>Please select a character to continue</h2>';
    }
}

// Shows all cards for a given character at the current level.
function showCards(character) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';

    const cardBack = getCardBack(character);
    displayCard(cardBack, cardsContainer, character);
}

// Returns the back image for a card based on the character and current level index.
function getCardBack(character) {
    if (!character) { // Added guard clause
        return '';
    }
    switch (currentLevelIndex) {
        case 0:
            return character.getDepthCard();
        case 1:
            return character.getShallowCard();
        case 2:
            return character.getShoreCard();
        default:
            return '';
    }
}

// Displays a card and attaches an event listener to flip it when clicked.
function displayCard(back, container, character) {
    const cardImg = document.createElement('img');
    cardImg.className = 'card';
    cardImg.src = back;

    cardImg.addEventListener('click', function handleCardClick() {
        showFront(cardImg, container, character);
    });

    container.appendChild(cardImg);
}

// Flips the card to show the front and prepares the question for the character.
function showFront(cardImg, container, character) {
    const cardFronts = getCardFronts(character);
    if (cardFronts.length > 0) {
        const front = cardFronts[0];
        cardImg.src = front;
        cardImg.removeEventListener('click', function handleCardClick() {
            showFront(cardImg, container, character);
        });
        cardImg.addEventListener('click', nextStage);

        // Alert with the question
        alert(`Question: ${front}`);
    }
    displayCardWithQuestion(character);
}

// Retrieves card fronts for a given character, based on the current level index.
function getCardFronts(character) {
    if (!character) { // Added guard clause
        return [];
    }
    switch (currentLevelIndex) {
        case 0:
            return character.getDepthQuestions();
        case 1:
            return character.getShallowQuestions();
        case 2:
            return character.getShoreQuestions();
        default:
            return [];
    }
}

// Displays a question from the character's card on the game screen.
function displayCardWithQuestion(character) {
    const questionContainer = document.getElementById('player-question');
    let questions = [];
    const cardFronts = getCardFronts(character);
    if (currentLevelIndex < cardFronts.length) {
        questions = cardFronts;
    }
    if (questions.length > 0) {
        const question = questions[Math.floor(Math.random() * questions.length)];
        const questionDiv = document.createElement('div');
        questionDiv.style.position = 'relative';
        questionDiv.style.display = 'inline-block';

        const questionImg = document.createElement('img');
        questionImg.src = character.getDepthCard();
        questionImg.style.width = '100%';
        questionDiv.appendChild(questionImg);

        const questionSpan = document.createElement('span');
        questionSpan.style.position = 'absolute';
        questionSpan.style.top = '40%';
        questionSpan.style.left = '50%';
        questionSpan.style.transform = 'translate(-50%, -50%)';
        questionSpan.style.color = 'white';
        questionSpan.innerText = question;
        questionDiv.appendChild(questionSpan);

        const nextButton = document.createElement('button');
        nextButton.style.position = 'absolute';
        nextButton.style.top = '50%';
        nextButton.style.left = '50%';
        nextButton.style.transform = 'translate(-50%, -50%)';
        nextButton.innerText = 'Next';
        nextButton.onclick = nextStage;
        questionDiv.appendChild(nextButton);

        questionContainer.innerHTML = '';
        questionContainer.appendChild(questionDiv);
        questionContainer.style.display = 'block';
    }
}

// Advances the game to the next stage or level.
function nextStage() {
    if (currentStage < 2) {
        currentStage++;
    } else {
        currentStage = 0;
        currentLevelIndex++;
        if (currentLevelIndex < gameLevels.length) {
            showLevel();
        } else {
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = '<h2>Congratulations! You reached the shore!</h2>';
        }
    }
}

function answerQuestion() {
    nextStage();
}

// Initialize the game when "Play" is clicked
function initializeGame(character) {
    currentLevelIndex = 0;
    currentStage = 0;
    showLevel(character);
}
