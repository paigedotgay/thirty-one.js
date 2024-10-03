# thirty-one.js
A WIP JavaScript translation of [my Clojure library](https://github.com/paigedotgay/thirty-one)

Until I have this more fleshed out, please refer to the documentation in the repo above (I tried to make it thorough).

## Quick Notes
I'm trying to get this as close to a 1:1 translation as possible so I can get a better understanding of functional programming in JavaScript. 
Because of this, there are some "quirks" to the code. For instance: 
- A lot of things that **could** be classes, such as cards, players, and the gamestate, will not be classes.
- I'll use expressions instead of statements whenever possible, for example, favoring ternaries over if/else.
- All variables should only exist within the local scope of a function. 
- All functions (with the exception of the deck shuffler) should be pure.
- No mutation.