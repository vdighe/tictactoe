# tictactoe
## Tic Tac Toe Game
Design a fun game 'Tic Tac Toe' with HTML, CSS and Javascript.

## Setup
Use the standard browsers and mobile screen to access the game page.

## Dependencies

## Installation

## Getting Started.
* The game is designed based on the user stories.
* User Stories
. As a user, I should be able to start a new tic tac toe game
. As a user, I should be able to click on a square to add X first and then O, and so on
. As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
. As a user, I should not be able to click the same square twice
. As a user, I should be shown a message when I win, lose or tie
. As a user, I should not be able to continue playing once I win, lose, or tie
. As a user, I should be able to play the game again without refreshing the page
* Potential Extra Tic Tac Toe Features
. Keep track of multiple game rounds with a win, lose and tie counter
. Allow players to customize their tokens (X, O, name, picture, etc)
. Use localStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity
. Involve Audio in your game
. Create an AI opponent: teach JavaScript to play an unbeatable game against you
. Make your site fully responsive so that it is playable from a mobile phone
. Get inventive with your styling e.g. use hover effects or animations
* Super Potential Extra Tic Tac Toe Features
. Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.
Based on the user stories, the game was designed.
* As a user, I should be able to start a new tic tac toe game
  The game starts as the page is loaded, or if user clicks on Play Again button
* As a user, I should be able to click on a square to add X first and then O, and so on
  Game starts with X, and then O
* As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next
  Only when one is playing against human.
* As a user, I should not be able to click the same square twice
  Clicks are disabled when the squares are full, or game is over (unless the user clicks on Play Again button)
* As a user, I should be shown a message when I win, lose or tie
  After three wins, the audio plays, and then resets the score to 0
* As a user, I should not be able to continue playing once I win, lose, or tie
  Yes, only when Reset is clicked or page is loaded again
* As a user, I should be able to play the game again without refreshing the page
  There is a reset or Play Again button

### Code layout and description page 
Currently, there are three main files.
1. index.html
    Works on the presentation logic. Draw the game board. The play options for opponent are either computer or human. 
2. js/challenge.js
3. styles/style.css

### Planning, Bonus Features, Issues and Fixes
* Worked on the rough hand drawn sketch. Started with PixArt and Grid (10X10) project code base.
* Spent good amount of time updating the stylesheet (Need to learn to get the basic MVP working before putting time on enhancing the Stylesheet). Encountered some glitches in drawing the symbols in the grid. Redesigned the grid with simple block format.
* Developed the logic for winning combination check.
* Added logic for taking turns to play, disable clicks, and show the next turn to play.
* Added logic for making the storage (used session storage). Had to spend time to get the logic working.
* Added logic for playing an audio file when a player wins 3 times. Reset the score to 0
* Added logic for AI (Computer plays), used the MINMAX algorithm. Took lot of time to get to work.
* Made both Computer(AI) or manual mode to play as an opponent.
* Added radio button option to choose either Computer or Human to play against you.
* ISSUE: The radio button shows(by default) the computer as an opponent player. However, only when either of the radio buttons are clicked, the radio button block goes aways, and a message is shown. "Play Against Computer" or "Play Against Human"

### Future corrections and additions
* Make the code modular and based on object oriented design.
* Make the score card visibly appealing.
* Highlight the winning three squares with a color to flash for few secs.
* Test against the mobile screens, and correct.
* Enhance to play against online opponent.
* Give user choice to customize the tokens.

## Copyright and attribution

Copyright (c) 2016 DataMade. Released under the MIT License.  https://vdighe.github.io/tictactoe/