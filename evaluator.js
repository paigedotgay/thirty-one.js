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
    return gamestate.players
        .filter((player) => player.handPoints == 31);
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
    const { activePlayerIndex, knockingPlayerIndex, deck } = gamestate;
    return activePlayerIndex == knockingPlayerIndex
        || !!blitzingPlayers(gamestate).length
        || !deck.length;
}

/**
 * Returns a new instance of the gamestate with `lowestScore` set to the lowest score among players.
 * @param {object} gamestate 
 * @returns {object} Edited gamestate
 */
function setLowestScore(gamestate) {
    const allScores = players.map((player) => player.handPoints);
    const lowestScore = Math.min(...allScores);
    return { ...gamestate, lowestScore }
}

/**
 * Returns a new instance of the gamestate with `highestScore` set to the highest score among players.
 * @param {object} gamestate 
 * @returns {object} Edited gamestate
 */
function setHighestScore(gamestate) {
    const allScores = players.map((player) => player.handPoints);
    const highestScore = Math.max(...allScores);
    return { ...gamestate, highestScore }
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
function willPlayerLoseLife(gamestate, playerIndex) {
    const { lowestScore, highestScore, knockingPlayerIndex, players } = gamestate;

    // this... may be the worst thing I've ever written.
    (lowestScore && highestScore)
        ?? (() => {
            throw new Error(
                `${lowestScore
                    ?? lowestScore
                        ? ""
                        : "lowestScore is null "}`
                +
                `${highestScore
                    ?? highestScore
                        ? ""
                        : "highestScore is null"}`)
        })();
        
    const blitzPlayers = blitzingPlayers(gamestate);
    const player = players[playerIndex];
    const playerScore = player.handPoints;

    // Conditions for losing a round.
    const hasLowestScore = playerScore == lowestScore;
    const failedKnock = playerIndex == knockingPlayerIndex && playerScore != highestScore;
    const lostToBlitz = !!blitzPlayers.length && !blitzPlayers.includes(player);

    return hasLowestScore || failedKnock || lostToBlitz;
}

/**
 * Returns the indices of any player who should lose a life.
 * @param {object} gamestate 
 * @returns {Array<number>}
 */
function getLosingPlayerIndices(gamestate) {
    return gamestate.players.keys() //extremely sick way to get the indices of all players.
        .filter((i) => isPlayerLosingLife(gamestate, i));
}

/**
 * Returns the names of all players who should lose a point.
 * @param {object} gamestate 
 * @returns {Array<string>}
 */
function getLosingPlayerNames(gamestate) {
    return getLosingPlayerIndices(gamestate)
        .map((i) => gamestate.players[i].name);
}
