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