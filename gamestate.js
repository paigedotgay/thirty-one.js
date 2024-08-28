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
 * Decreases a player's life by 1
 * @param {*} gamestate current gamestate
 * @param {*} playerIndex the index of the player to lose life
 */
function decLife(gamestate, playerIndex) {
    /**
     * TODO:
     * ok so tbh I'm not sure how I'm gonna do this part.
     * I'm trying to do this in a 100% functional way
     * but js doesn't seem to like that very much.
     * 
     * might do some weird destructuring and restructuring thing
     * like let { players, ...rest } = gamestate;
     * players[playerIndex].life--;
     * return {players, ...rest};
     * 
     * but that middle line feels awfully side-effect-y.
     * need to think more.
     */
}
