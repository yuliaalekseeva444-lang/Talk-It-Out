document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('play-button').addEventListener('click', function() {
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        showLevel();
    });

    document.getElementById('rules-button').addEventListener('click', function() {
        document.getElementById('help-modal').classList.remove('hidden');
    });

    document.getElementById('characters-button').addEventListener('click', function() {
        document.getElementById('characters-modal').classList.remove('hidden');
    });

    document.querySelector('.close-button').addEventListener('click', function() {
        document.getElementById('help-modal').classList.add('hidden');
        document.getElementById('characters-modal').classList.add('hidden');
    });
}
