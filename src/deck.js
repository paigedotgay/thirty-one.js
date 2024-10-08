import { range } from "big-brain.js";

/**
 * Adds important info to a card, including the value and a pretty version of the suit
 * 
 * @param {string|number} face 2-10 or A, J, Q, K
 * @param {string} suit clubs, diamonds, hearts, or spades
 * @returns {object}
 */
function buildCard(face, suit) {
    return {
        "face": face,
        "suit": suit,
        
        "value": (face == "A")
            ? 11
            : ("JQK".includes(face))
                ? 10
                : face,
        
        "name": `${face}${{
            "clubs": "♣︎",
            "diamonds": "♦",
            "hearts": "♥︎",
            "spades": "♠︎"
        }[suit]}`
    }
}

/**
 * Returns an unshuffled array (deck) of cards
 * 
 * @returns {Array<object>}
 */
export function buildDeck() {
    return Array.from((function* () {
        for (let suit of ["clubs", "diamonds", "hearts", "spades"]) {
            for (let face of [...range(2, 11), "J", "Q", "K", "A"]) {
                yield buildCard(face, suit);
            }
        }
    })())
}
