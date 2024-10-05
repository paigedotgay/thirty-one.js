import { buildDeck } from "./deck";
import { getLosingPlayerIndices, setHighestAndLowestScores } from "./evaluator";
import { shuffleArray } from "big-brain";

/**
 * Creates the basic skeleton of the gamestate, including a shuffled deck
 * 
 * @returns {object} The basic gamestate with a shuffled deck.
 */
function newGamestate() {
    return {
        "activePlayerIndex": 0,
        "awaiting": null,
        "deck": shuffleArray(buildDeck()),
        "discard": null,
        "round": 0,
        "knockingPlayerIndex": null,
        "players": [],
        "lowestScore": null,
        "highestScore": null,
    }
}

/**
 * Returns a new instance of the gamestate with a player added.
 * 
 * @param {object} gamestate
 * @param {string} playerName
 * @returns {object} Edited Gamestate
 */
function addPlayer(gamestate, playerName) {
    const oldPlayerList = gamestate.players;
    return {
        ...gamestate,
        players: [
            ...oldPlayerList,
            { name: playerName, hand: [], handPoints: 0, lives: 5, }
        ]
    }
}

/**
 * Returns a new instance of gamestate where the player at `playerIndex` has one less life.
 * 
 * @param {object} gamestate
 * @param {number} playerIndex
 * @returns {object} Edited gamestate
 */
function decLife(gamestate, playerIndex) {
    // "But paige," I hear you say, "doesn't this iterate over all players?"
    // You are right, but it's already weird to read.
    // I could do slicing, and maybe I will later, but that feels worse somehow.
    // Plus we have a maximum of 8 players, any slowing should be unnoticeable.
    return {
        ...gamestate,
        players: gamestate.players.map((player, index) =>
            index != playerIndex
                ? player
                : { ...player, lives: player.lives - 1 }
        )
    };
}

/**
 * Returns a new instance of the game state where each player for whom 
 * {@link willPlayerLoseLife()} returns true has their life decreased by one.
 * 
 * @param {object} gamestate 
 * @returns {object} Edited gamestate.
 */
function score(gamestate) {
    const { players } = gamestate
    const awaiting = "END_ROUND";
    const scoredGamestate = setHighestAndLowestScores(gamestate);
    const losingPlayerIndices = getLosingPlayerIndices(scoredGamestate);
    const updatedPlayers = [...players.keys()]
        .map((playerIndex) => losingPlayerIndices.includes(playerIndex)
            ? {...players[playerIndex], lives: players[playerIndex].lives - 1}
            : players[playerIndex])

    return { ...scoredGamestate, awaiting, players: updatedPlayers };
}

/**
 * Returns a new instance of the gamestate where gamestate.activePlayer is incremented (or reset if at end).
 * @param {object} gamestate 
 * @returns {object} Edited gamestate
 */
function nextPlayer(gamestate) {
    const { activePlayerIndex } = gamestate
    return {...gamestate, 
        activePlayerIndex: activePlayerIndex == gamestate.players.length - 1
        ? 0
        : gamestate.activePlayerIndex + 1,
    }
}