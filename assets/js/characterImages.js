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
    panickedSpeaker: extractImagesFromGrid('assets/character/panicked-speaker.png', 3, 16, 1136, 1089, 100, 100),
    dolphin: extractImagesFromGrid('assets/character/dolphin.png', 3, 16, 1136, 1089, 100, 100),
    flatfish: extractImagesFromGrid('assets/character/flatfish.png', 3, 16, 1136, 1089, 100, 100),
    fugitive: extractImagesFromGrid('assets/character/fugitive.png', 3, 16, 1136, 1089, 100, 100),
    eel: extractImagesFromGrid('assets/character/eel.png', 3, 16, 1136, 1089, 100, 100)
};
