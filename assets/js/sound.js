// sound.js
// Shared audio player for click/interaction sounds with randomized selection

const audioSources = [
    'assets/audio/bubbles.mp3',
    'assets/audio/bubble-pop.mp3'
];

const audioPool = audioSources.map(src => {
    const a = new Audio(src);
    a.preload = 'auto';
    return a;
});

// Helper to get a random audio from the pool
function getRandomAudio() {
    const idx = Math.floor(Math.random() * audioPool.length);
    return audioPool[idx];
}

// Call this once after a user gesture if browsers block playback before interaction
function initSound() {
    // Attempt a quick short play on each audio to unlock in some browsers
    audioPool.forEach(a => {
        try {
            a.volume = 0.1;
            const p = a.play();
            if (p !== undefined) {
                p.then(() => {
                    a.pause();
                    a.currentTime = 0;
                    a.volume = 1.0;
                }).catch(() => {
                    // ignore; will play after user gesture
                });
            }
        } catch (e) {
            // ignore unlocking errors
        }
    });
}

function playClick() {
    try {
        const a = getRandomAudio();
        a.currentTime = 0; // Reset so repeated clicks restart sound
        a.play();
    } catch (e) {
        // fails silently if autoplay blocked; will work after user gesture
        console.warn('Click sound play failed', e);
    }
}

export { initSound, playClick };
