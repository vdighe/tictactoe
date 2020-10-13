# tictactoe
Tic Tac Toe Game
Design a fun game 'Tic Tac Toe' with HTML, CSS and Javascript

## Setup
Make to work with standard browsers

## Dependencies

## Installation

### Getting Started.
* Based on the user stories, the game was designed.
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

### Code layout and description page Currently, there are three main files.
1. index.html
    Works on the presentation logic. Draw the game board. The play options for opponent are either computer or human. 
2. js/challenge.js
3. styles/style.css

### Planning, Bonus Features, Issues and Fixes
* Worked on the rough handdrawn sketch. Started with PixArt project and Grid (10X10) project code base.
* Spent a lot of time updating the stylesheet (Need to learn to get the basic sketch working before putting time on enhancing the Stylesheet)
* Interesting to develop the logic for winning combination check.
* Added logic for taking turns to play, disable clicks, and show the next turn div.
* Added logic for making the storage (used session storage). Had to spend time to get the logic working.
* Added logic for playing an audio file when a player wins 3 times. Reset the score
* Added logic for AI (Computer plays), used the MINMAX algorithm. Took lot of time to get to work.
* Made both AI or manual mode to play as an opponent.
* Added radio button option to choose either Computer or Human to play.
* In issue found to select Human option when first time clicked or Reset happens

## Copyright and attribution

Copyright (c) 2016 DataMade. Released under the MIT License.