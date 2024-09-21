import { buildDeck } from "./deck"
import { shuffleArray } from "big-brain"

/**
 * Creates the basic skeleton of the gamestate, including a shuffled deck
 * @returns {Object} The basic gamestate with a shuffled deck.
 */
function newGamestate() {
    return {
        "activePlayer": 0,
        "awaiting": null,
        "deck": shuffleArray(buildDeck()),
        "discard": null,
        "round": 0,
        "knockingPlayer": null,
        "players": [],
    }
}

/**
 * Subtracts a life from the player at `playerIndex`.
 * @param {*} gamestate current gamestate
 * @param {*} playerIndex the index of the player to lose life
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
