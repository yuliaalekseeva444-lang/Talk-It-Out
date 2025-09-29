// sound.js
// Shared audio player for click/interaction sounds

const audio = new Audio('assets/audio/bubbles.mp3');
audio.preload = 'auto';

// Call this once after a user gesture if browsers block playback before interaction
function initSound() {
    // Attempt a quick silent play to unlock in some browsers
    audio.volume = 0.1;
    const p = audio.play();
    if (p !== undefined) {
        p.then(() => {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 1.0;
        }).catch(() => {
            // ignore; will play on user gesture
        });
    }
}

function playClick() {
    try {
        // Reset to start so repeated clicks restart sound
        audio.currentTime = 0;
        audio.play();
    } catch (e) {
        // fails silently if autoplay blocked; will work after user gesture
        console.warn('Click sound play failed', e);
    }
}

export { initSound, playClick };
