/**
 * Stringifies a players hand
 * @param {object} gamestate - The current gamestate.
 * @param {number} playerIndex - The index of the player.
 * @returns {string}
 */
function handToString(gamestate, playerIndex) {
    return gamestate.players[playerIndex].hand
        .map(card => card.name)
        .join(" ");
}
