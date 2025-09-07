// gameMechanics.js
const levels = ['Bottom', 'Shallow', 'Shore'];
let currentLevelIndex = 0;
let currentStage = 0;

function showLevel() {
    const gameContainer = document.getElementById('game-container');

    const level = levels[currentLevelIndex];
    gameContainer.innerHTML = `<h2>Level: ${level}</h2><div id="cards"></div>`;
    showCards();
}

function showCards() {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = '';
    const character = characterImages.panickedSpeaker; // Using panickedSpeaker as default
    let cards, questions;

    if (currentLevelIndex === 0) {
        cards = character.getDepthCard();
        questions = character.getDepthQuestions();
    } else if (currentLevelIndex === 1) {
        cards = character.getShallowCard();
        questions = character.getShallowQuestions();
    } else if (currentLevelIndex === 2) {
        cards = character.getShoreCard();
        questions = character.getShoreQuestions();
    }

    const card = document.createElement('img');
    card.className = 'card';
    card.src = cards;
    card.addEventListener('click', nextStage);
    cardsContainer.appendChild(card);

    questions.forEach((questionSrc, i) => {
        const question = document.createElement('img');
        question.className = 'question';
        question.src = questionSrc;
        question.addEventListener('click', answerQuestion);
        cardsContainer.appendChild(question);
    });
}

function nextStage() {
    if (currentStage < 2) {
        currentStage++;
    } else {
        currentStage = 0;
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            showLevel();
        } else {
            const gameContainer = document.getElementById('game-container');
            gameContainer.innerHTML = '<h2>Congratulations! You reached the shore!</h2>';
        }
    }
    showLevel();
}

function answerQuestion() {
    nextStage();
}
