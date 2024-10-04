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
 * Returns True if the game should move to the scoring phase.
 * 
 * This is True if:
 * - a player has 31 points in hand.
 * - the knocking player is taking their next turn.
 * - the deck is empty.
 * @param {object} gamestate
 * @returns {boolean}
 */
function isTimeToScore(gamestate) {
    const { activePlayer, knockingPlayerIndex, deck } = gamestate;
    return Boolean(blitzingPlayers(gamestate).length
        || activePlayer == knockingPlayerIndex
        || !deck.length);
}

/**
 * Returns True if the player at playerIndex should lose a life.
 * 
 * This is True if:
 * - The player has the lowest score.
 * - The player knocked and doesn't have the highest score.
 * - Someone besides the player has 31 points in hand.
 * @param {object} gamestate 
 * @param {number} playerIndex 
 * @returns {boolean}
 */
function isPlayerLosingLife(gamestate, playerIndex) {
    const { knockingPlayerIndex, players } = gamestate;
    const allScores = players.map((player) => player.handPoints);
    const lowestScore = Math.min(...allScores);
    const highestScore = Math.max(...allScores);
    const blitzPlayers = blitzingPlayers(gamestate);
    const player = players[playerIndex];
    const playerScore = player.handPoints;
    
    // Conditions for losing a round.
    const hasLowestScore = playerScore == lowestScore;
    const failedKnock = playerIndex == knockingPlayerIndex && playerScore != highestScore;
    const lostToBlitz = blitzPlayers.length && !blitzPlayers.includes(player);
    
    return hasLowestScore || failedKnock || lostToBlitz;
}
