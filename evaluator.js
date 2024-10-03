/**
 * Stringifies a players hand.
 * @param {object} gamestate - The current gamestate.
 * @param {number} playerIndex - The index of the player.
 * @returns {string}
 */
function handToString(gamestate, playerIndex) {
    return gamestate.players[playerIndex].hand
        .map(card => card.name)
        .join(" ");
}

/**
 * Returns all players who have 31 points in hand.
 * @param {object} gamestate 
 * @returns {Array<object>}
 */
function blitzingPlayers(gamestate) {
    return gamestate.players.filter( (player) => player.handPoints == 31 );
}