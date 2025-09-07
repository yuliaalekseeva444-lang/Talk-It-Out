// refactoredNotes.js
function setupEventListeners() {
    const rulesButton = document.getElementById('rules-button');
    const charactersButton = document.getElementById('characters-button');
    const helpModal = document.getElementById('help-modal');
    const charactersModal = document.getElementById('characters-modal');
    const closeButtons = document.querySelectorAll('.close-button');

    rulesButton.addEventListener('click', function() {
        toggleDisplay(helpModal, true);
    });

    charactersButton.addEventListener('click', function() {
        toggleDisplay(charactersModal, true);
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
