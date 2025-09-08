// characterImages.js
function extractImagesFromGrid(imagePath, rows, cols, spriteWidth, spriteHeight, outputWidth, outputHeight) {
    const image = new Image();
    image.src = imagePath;

    function getImage(row, col) {
        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        const context = canvas.getContext('2d');
        context.drawImage(image, col * spriteWidth, row * spriteHeight, spriteWidth, spriteHeight, 0, 0, outputWidth, outputHeight);
        return canvas.toDataURL();
    }

    return {
        getShoreCard: function() {
            return getImage(0, 0);
        },
        getShoreQuestions: function() {
            return Array.from({ length: cols - 1 }, (_, i) => getImage(0, i + 1));
        },
        getShallowCard: function() {
            return getImage(1, 0);
        },
        getShallowQuestions: function() {
            return Array.from({ length: cols - 1 }, (_, i) => getImage(1, i + 1));
        },
        getDepthCard: function() {
            return getImage(2, 0);
        },
        getDepthQuestions: function() {
            return Array.from({ length: cols - 1 }, (_, i) => getImage(2, i + 1));
        },
    };
}

const characterImages = {
    crab: {
        getShoreCard: function() { return 'assets/cards/crab/back_shore.png'; },
        getShoreQuestions: function() { return ['assets/cards/crab/front_shore.png']; },
        getShallowCard: function() { return 'assets/cards/crab/back_shallow.png'; },
        getShallowQuestions: function() { return ['assets/cards/crab/front_shallow.png']; },
        getDepthCard: function() { return 'assets/cards/crab/back_depth.png'; },
        getDepthQuestions: function() { return ['assets/cards/crab/front_depth.png']; }
    },
    dolphin: {
        getShoreCard: function() { return 'assets/cards/dolphin/back_shore.png'; },
        getShoreQuestions: function() { return ['assets/cards/dolphin/front_shore.png']; },
        getShallowCard: function() { return 'assets/cards/dolphin/back_shallow.png'; },
        getShallowQuestions: function() { return ['assets/cards/dolphin/front_shallow.png']; },
        getDepthCard: function() { return 'assets/cards/dolphin/back_depth.png'; },
        getDepthQuestions: function() { return ['assets/cards/dolphin/front_depth.png']; }
    },
    pufferfish: {
        getShoreCard: function() { return 'assets/cards/pufferfish/back_shore.png'; },
        getShoreQuestions: function() { return ['assets/cards/pufferfish/front_shore.png']; },
        getShallowCard: function() { return 'assets/cards/pufferfish/back_shallow.png'; },
        getShallowQuestions: function() { return ['assets/cards/pufferfish/front_shallow.png']; },
        getDepthCard: function() { return 'assets/cards/pufferfish/back_depth.png'; },
        getDepthQuestions: function() { return ['assets/cards/pufferfish/front_depth.png']; }
    },
    eel: {
        getShoreCard: function() { return 'assets/cards/eel/back_shore.png'; },
        getShoreQuestions: function() { return ['assets/cards/eel/front_shore.png']; },
        getShallowCard: function() { return 'assets/cards/eel/back_shallow.png'; },
        getShallowQuestions: function() { return ['assets/cards/eel/front_shallow.png']; },
        getDepthCard: function() { return 'assets/cards/eel/back_depth.png'; },
        getDepthQuestions: function() { return ['assets/cards/eel/front_depth.png']; }
    },
    flatfish: {
        getShoreCard: function() { return 'assets/cards/flatfish/back_shore.png'; },
        getShoreQuestions: function() { return ['assets/cards/flatfish/front_shore.png']; },
        getShallowCard: function() { return 'assets/cards/flatfish/back_shallow.png'; },
        getShallowQuestions: function() { return ['assets/cards/flatfish/front_shallow.png']; },
        getDepthCard: function() { return 'assets/cards/flatfish/back_depth.png'; },
        getDepthQuestions: function() { return ['assets/cards/flatfish/front_depth.png']; }
    }
};

