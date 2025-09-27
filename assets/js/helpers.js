// helpers.js
const getCardFrontByLevel = (player, character, stars) => {
    if (stars < 3) {
        return character.getDepthCardFront();
    } else if (stars < 6) {
        return character.getShallowCardFront();
    } else {
        return character.getShoreCardFront();
    }
}

const getCardBackByLevel = (player, character, stars) => {
    if (stars < 3) {
        return character.getDepthCardBack();
    } else if (stars < 6) {
        return character.getShallowCardBack();
    } else {
        return character.getShoreCardBack();
    }
}

const findWinner = (players, playerPositions, playerStars, mapLevels) => {
    let winner = null;
    for (let player of players) {
        if (playerPositions[player] >= (mapLevels.length * 3 - 1)) {
            if (winner == null || (playerStars[winner] < playerStars[player])) {
                winner = player;
            }
        }
    }
    return winner;
}

// Exporting utility functions
export { getCardFrontByLevel, getCardBackByLevel, findWinner };