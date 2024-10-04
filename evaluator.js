/**
 * Stringifies a players hand.
 * @param {object} gamestate
 * @param {number} playerIndex
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
    return gamestate.players.filter((player) => player.handPoints == 31);
}

/**
 * Returns true if the game should move to the scoring phase.
 * 
 * This is true if:
 * - a player has 31 points in hand.
 * - the knocking player is taking their next turn.
 * - the deck is empty.
 * @param {object} gamestate 
 */
function isTimeToScore(gamestate) {
    const { activePlayer, knockingPlayer, deck } = gamestate;
    return Boolean(blitzingPlayers(gamestate).length
        || activePlayer == knockingPlayer
        || !deck.length);
}
