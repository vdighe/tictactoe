# tictactoe
## Tic Tac Toe Game
Design a fun game 'Tic Tac Toe' with HTML, CSS and Javascript.

## Setup
Use the standard browsers and mobile screen to access the game page.

## Dependencies

## Installation

## Getting Started.
#### The game is designed based on the user stories.
##### Features and Rules
* One can start a new tic tac game
* The game always starts with X first, and then O, and so on.
* The choice is to play against Computer vs Human at the begining of the game.
* If you play against the human, then a message is shown after each turn.
* One can not click the same square twice
* A message is shown when the game is won, lost or a tie.
* There is an option of \'Reset\' the game without refreshing the page. 

##### Extra Features
* Keeps track of multiple game rounds, with win or lose counter.
* After three successful wins, an audio is played, and the score is then reset.
* An AI component is added (Opponent player as Computer) to play against. 

#### Code layout and description page 
* There are three main files.
1. index.html
    * Works on the presentation logic. Draw the game board. The play options for opponent are either computer or human. 
2. js/challenge.js
    * Main logic for the game.
3. styles/style.css
4. Design: 
https://github.com/vdighe/tictactoe/blob/main/extras/TicTacToeBasic.png
5. MINIMAX Algorithm: 
  * Rough sketch
  



#### Planning, Bonus Features, Issues and Fixes
* Worked on the rough hand drawn sketch. Started with PixArt and Grid (10X10) project code base.
* Spent good amount of time updating the stylesheet (Need to learn to get the basic MVP working before putting time on enhancing the Stylesheet). Encountered some glitches in drawing the symbols in the grid. Redesigned the grid with simple block format.
* Developed the logic for checking the winning combination.
* Added logic for taking turns to play, disable clicks, and show the next turn to play.
* Added logic for making the storage (used session storage).
* Added logic for playing an audio file when a player wins 3 times, and then reset the winner's score to 0
* Added logic for AI (Computer plays). Used the MINIMAX Algorithm. To apply minimax algorithm in two-player games, here were the basic assumptions:
  * The O (or the Compter) is the maximizing player, and the X is the minimizing player. In short, the maximizing player will choose to move that will maximize or with highest score. 
  * This is a recursive algorithm, that takes shortest path for the maximizer.
  * Evaluation:
    * The tie: Score = 0
    * O wins: Score = 10
    * X wins: Score = -10

* ISSUES: The radio button shows(by default) the computer as an opponent player. However, only when either of the radio buttons are clicked, the radio button block goes aways, and a message is shown. "Play Against Computer" or "Play Against Human"

### Future corrections and additions
* Make the code modular and based on object oriented design.
* Keep the scores of the game drawn, and make the score card visibly appealing.
* Highlight the winning three squares with a color to flash for few secs.
* Test the compatibility with various mobile screen and correct if there are any issues.
* Enhance to play against online opponent.
* Give user choice to customize the tokens.

## Copyright and attribution

Copyright (c) 2016 DataMade. Released under the MIT License.  https://vdighe.github.io/tictactoe/