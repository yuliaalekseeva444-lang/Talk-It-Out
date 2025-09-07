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
        toggleModal('help-modal', false);
    });

    document.getElementById('characters-button').addEventListener('click', function() {
        toggleModal('characters-modal', false);
    });

    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', function() {
            toggleModal('help-modal', true);
            toggleModal('characters-modal', true);
        });
    });
}

function toggleModal(modalId, hide) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle('hidden', hide);
    }
}
