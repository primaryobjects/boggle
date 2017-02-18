Boggle Solver
--------

A web-based app for finding all possible dictionary words in a game of [Boggle](https://en.wikipedia.org/wiki/Boggle).

Try the [demo](http://primaryobjects.github.io/boggle/)!

Developed using [React](https://facebook.github.io/react/) js, [Materialize](http://materializecss.com/) CSS, and HTML5 web workers for multi-threaded processing.

How does it work?
---------

The solver uses a tree-based approach for finding all possible words within a game of Boggle.

The first step is to parse a dictionary of English words, used for locating words on the game board. Since Boggle requires solution words to contain at least 3 letters, each dictionary word is stored in a hash, using the first 3 letters as its key. For example, all words that start with "gen" will be stored under the same key.

The second step is to construct a tree from each starting letter on the game board. Each adjacent letter to the starting letter is added as a child node, building up the tree of all possible letter combinations and using a depth-first-search approach for evaluating solution terms. When at least 3 letters in a branch have been located, its checked against a dictionary key. If no key exists, we simply halt any further discovery of child letters for this branch (since the first 3 letters do not match any word from the dictionary, we can discard this combination of letters). Otherwise, we continue down the branch adding any additional adjacent letters, until exhausted.

At each step of discovering adjacent letters beyond 3 characters, we check the string against the dictionary hash. If a word is found, its stored, along with its score.

The process is continued, constructing a tree for each letter across the board, until all game board tiles have been evaluated.

UI Design
---------

The web application interface was built using React.

The primary React application renders a [grid](https://github.com/primaryobjects/boggle/blob/master/src/controls/gridControl.js) control, consisting of inidivudal [cell](https://github.com/primaryobjects/boggle/blob/master/src/controls/cellControl.js) controls. Each cell holds a property for its `x` and `y` location on the board, as well as its letter value. A cell has a maximum length of 1 character and updates its content when a key is pressed.

The `grid` control updates its state when a cell is updated. Additionally, the grid controls UI flow by automatically shifting focus to the next adjacent cell, or wrapping to the next row, or back to the top.

The main React application handles rendering the `grid`, as well as starting the Boggle solver process. Since the tree search process is CPU intensive, the solver is run within a HTML5 web worker. Communication between the solver and the UI is done via message posting from the web worker. In this manner, status and real-time updates of solution words is provided as the letter trees are traversed.

License
----

MIT

Author
----
Kory Becker
http://www.primaryobjects.com/kory-becker
