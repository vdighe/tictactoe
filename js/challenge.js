// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';
/**
 * Winning combination is 3 horizontal, 3 verticle, and 2 diagonal
 */
const WINNING_COMBINATION = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

const SCORE = { 'x': 0, 'o': 0 };
const WINNER_HORN = new Audio('./extras/TicTacToe.mp3');
const SYMBOLS = ['x', 'o'];
/*
 * 3 X 3 Grid to keep track of the game
 */
let gameData = new Array(9);
let gameBoard;
let turns;

/*
* 0 ==> Means Computer;
* 1 ==> Means Human;
*/
let playOption = 0;
/**
 * Update the score based on sessionStorage and then update UI
 */

function updateScoreBoard(winner) {
    let newScore = JSON.parse(sessionStorage.getItem('score'));
    newScore[winner] = newScore[winner] + 1;

    /*
     * More than three times. then blow the horn and reset the score
     */
    if (newScore[winner] === 3) {
        WINNER_HORN.play();
        newScore[winner] = 0;
    }
    sessionStorage.setItem('score', JSON.stringify(newScore));
    updateScore();
}
/**
 * Update the score for UI
 */
function updateScore() {
    document.querySelector(`#gameScore #player-x-score`).innerHTML =
        JSON.parse(sessionStorage.getItem('score')).x;
    document.querySelector(`#gameScore #player-o-score`).innerHTML =
        JSON.parse(sessionStorage.getItem('score')).o;

}
/**
 * Check what option user has chosen.
 * @param {Radio Buttom} radio 
 */
function OnClickOption(radio) {
    playOption = radio.value;
    // inject the checked value
    const optionValue = document.querySelector('.gameOptions');

    let fieldset = document.querySelector('fieldset');

    fieldset.style.display = 'none';
    playOption = document.querySelector("input[name=option]:checked").value;

    fieldset.style.display = 'none';
    let h2Ele = document.createElement('h2');
    h2Ele.innerHTML = 'Play Against ' + ((playOption == 0) ? 'Computer ' : 'Human');
    optionValue.appendChild(h2Ele);

    //fieldSet.classList.add("game-on");
}


/**
 * Reset the game
 */
function resetGame() {
    updateScore();
    gameBoard.resetGame();
    document.querySelectorAll(".square").forEach((square) => {
        square.innerText = '';
    });
}

/**
 * When the game is won, or drawn, disable the clicks
 */
function disableGame() {
    document.querySelectorAll(".square").forEach((square) => {
        square.style.pointerEvents = 'none';
    });
}

/**
 * Bring maximum combinations of players 
 * in the array of 3's based on what an user
 * has played so far.
 * @param {*} arra 
 * @param {*} arra_size 
 */
function subset(arra, arra_size) {
    let result_set = [],
        result;
    for (var x = 0; x < Math.pow(2, arra.length); x++) {
        result = [];
        let i = arra.length - 1;
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(arra[i]);
            }
        } while (i--);
        if (result.length === arra_size) {
            result.sort();
            result_set.push(result);
        }
    }
    return result_set;
}

/**
 * Check if two arrays are exactly equal
 * @param {Array} a 
 * @param {*Array} b 
 */
function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

/**
 * Check if the array has any winning combination
 * @param {*} array 
 */
function isInWinArray(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < WINNING_COMBINATION.length; j++) {
            if (arrayEquals(array[i], WINNING_COMBINATION[j]))
                return true;
        }
    }
    return false;
}
/** Not Used  */
function checkSquare(ele) {
    let ret = (gameBoard.gameStatus) || (ele.innerText === null) ||
        (ele.innerText === '') ? true : false;
    return (ele)
}

/**
 * Based on the current GameBoard, find empty spaces array
 * 0...9 
 * GET EMPTY SPACES
 * */
function getEmptySpaces(gameData) {
    let EMPTY = [];
    for (let id = 0; id < gameData.length; id++) {
        if (!gameData[id]) EMPTY.push(id);
    }
    return EMPTY;
}

/**
 * isWinner: check for a winner
 * Based on the players current game,
 * see if it is one of the winning combination
 */

function isWinner(gameData, player) {
    for (let i = 0; i < WINNING_COMBINATION.length; i++) {
        let won = true;
        for (let j = 0; j < WINNING_COMBINATION[i].length; j++) {
            let id = WINNING_COMBINATION[i][j];
            won = gameData[id] == player && won;
        }
        if (won) {
            return true;
        }
    }
    return false;
}
/**
 * isTie
 * Check if the game is a draw
 * @param {*} gameData 
 */

function isTie(gameData) {
    let isGameBoardFull = true;
    for (let i = 0; i < gameData.length; i++) {
        isGameBoardFull = gameData[i] && isGameBoardFull;
    }
    if (isGameBoardFull) {
        return true;
    }
    return false;
}

/**
 *  
 * The MINIMAX algorithm to play as Computer.
 *  
 */
function minimax(gameData, PLAYER) {

    // Return condition for the base:
    // +10 for computer, and -10 for player
    // if the tie, then return 0

    if (isWinner(gameData, SYMBOLS[0])) return { evaluation: -10 };
    if (isWinner(gameData, SYMBOLS[1])) return { evaluation: +10 };
    if (isTie(gameData)) return { evaluation: 0 };

    // Empty Spaces
    let EMPTY_SPACES = getEmptySpaces(gameData);

    // SAVE ALL MOVES AND THEIR EVALUATIONS
    let moves = [];
    // LOOP OVER THE EMPTY SPACE TO EVALUATE
    for (let i = 0; i < EMPTY_SPACES.length; i++) {
        let id = EMPTY_SPACES[i];
        let backup = gameData[id];
        gameData[id] = PLAYER;

        let move = {}
        move.id = id;
        // THE EVALUATION
        if (PLAYER === SYMBOLS[1]) { //Meaning computer
            move.evaluation = minimax(gameData, SYMBOLS[0]).evaluation;
        } else {
            move.evaluation = minimax(gameData, SYMBOLS[1]).evaluation;
        }
        // Restore space
        gameData[id] = backup;

        //Save the move
        moves.push(move);
    }
    let bestMove;
    if (PLAYER === SYMBOLS[1]) {
        // MAXIMIZER
        let bestEvaluation = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].evaluation > bestEvaluation) {
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    } else {
        // MINIMIZER
        let bestEvaluation = +Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].evaluation < bestEvaluation) {
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}

/**
 * 
 * Draw the move on the game board
 * *
 */
function drawOnBoard(square, player) {
    square.classList.add(player.symbol);
    square.innerText = player.symbol;
    square.style.pointerEvents = 'none';

    // Remove item 'seven' from array
    let nextSymbol = SYMBOLS.filter((e) => { return e !== player.symbol })

    /*ADD SYMBOL  */
    document.querySelector('#gameInfo #gameTurn').classList.remove(player.symbol);
    document.querySelector('#gameInfo #gameTurn').classList.add(nextSymbol);
    player.clicksArr.push(parseInt(square.id));
}

/**
 * Game is a draw/tie
 * 
 */
function gameDrawn() {

    document.querySelector('#gameMessages').classList.add('draw');
    // Go thru SYMBOLS array

    SYMBOLS.forEach((symbol) => {
        document.querySelector('#gameInfo #gameTurn').classList.remove(symbol);
    })
    //document.querySelector('#gameInfo #gameTurn').classList.remove(player.symbol);
    //document.querySelector('#gameInfo #gameTurn').classList.remove(computer.symbol);
    document.querySelector('#gameInfo #gameTurn').classList.add('t');
}
/**
 * User should be allowed to click only when 
 * the game is to begin.
 * @param {*} event 
 */
function onSquareClick(event) {
    let className = '';
    let square = event.target;

    let player = gameBoard.getPlayer(turns);
    let computer = gameBoard.getPlayer((turns + 1 % 2));

    if (!gameBoard.gameStatus)
        return;
    if (gameData[square.id])
        return;
    if (!gameBoard.isBoardFull() && gameData[square.id] !== null)
        gameData[square.id] = player.symbol;
    drawOnBoard(square, player);
    if (player.isWinner()) {
        updateScoreBoard(player.symbol);
        document.querySelector('#gameMessages').classList.add(`player-${player.symbol}-win`);
        /**
         * Make it flash flash
         */
        document.querySelector('#gameMessages').classList.add('flash');
        gameBoard.gameStatus = false;
        disableGame();
        return;
    }
    /**
     * Check if the game is a draw, then update messages
     */
    if (gameBoard.isGameOver()) {
        gameBoard.gameStatus = false;
        gameDrawn();
        disableGame();
        return;
    }

     /**
       * Opponent is computer         
       */
    if (playOption == 0) {
        //GET THE MOVE
        let id = minimax(gameData, computer.symbol).id;
        gameData[id] = computer.symbol;
        // Get the corresponding square from UI and draw on it
        let nextSquare = document.querySelectorAll('.square')[id];
        drawOnBoard(nextSquare, computer);
        if (computer.isWinner()) {
            updateScoreBoard(computer.symbol);
            document.querySelector('#gameMessages').classList.add(`player-${computer.symbol}-win`);
            /**
             * Make it flash flash
             */
            document.querySelector('#gameMessages').classList.add('flash');
            gameBoard.gameStatus = false;
            disableGame();
            return;
        }
    } else {
        turns = (++turns % 2);
    }
}

function onReset(event) {
    resetGame();
}


/**
 * Begin the game with player X
 */
class Player {
    constructor(symbol, isTurn = false) {
        this.symbol = symbol;
        this.isTurn = isTurn;
        this.clicksArr = [];
        this.combsArr = [];
    }
    play() {
        this.isTurn = !this.isTurn;
    }
    getClickCnt() {
        return this.clicksArr.length;
    }
    getSymbol() {
        return this.symbol;
    }
    isWinner() {
        if (this.clicksArr.length >= 3) {
            this.combsArr = subset(this.clicksArr, 3);
            if (isInWinArray(this.combsArr)) {
                return true;
            }
        }
        return false;
    }
    reset() {
        let len = this.clicksArr.length;
        this.clicksArr.splice(0, len);
    }
}

/**
 * GameBoard class with two encapsulated player class
 */
class GameBoard {
    constructor(SYMBOLS) {
        this.playerX = new Player(SYMBOLS[0], true);
        this.playerO = new Player(SYMBOLS[1], false);
        this.gameStatus = true;
        this.index = 0;
    }

    isBoardFull() {
        if (this.getGameClicks() > 8)
            return true;
        else
            return false;
    }
    isGameOver() {
        if (this.gameStatus && this.isBoardFull())
            return true;
        else
            return false;
    }
    getGameClicks() {
        let sum = this.playerX.getClickCnt()
            + this.playerO.getClickCnt();
        return sum;
    }

    getPlayer(index) {
        return ((index === 0) ? this.playerX : this.playerO);
    }
    resetGame() {
        this.playerX.reset();
        this.playerO.reset();
    }

}
/**
 * Main Function
 */
function gameInit() {

    console.log('Welcome to Tic Tac Toe 2020');
    let buttonAll = document.querySelectorAll(".square");
    turns = 0;

    buttonAll.forEach((button) => {
        button.addEventListener('click', onSquareClick);
    });
    document.querySelector("#reset").addEventListener('click', onReset);
    if (sessionStorage.getItem('score') === null)
        sessionStorage.setItem('score', JSON.stringify(SCORE));
    updateScore();
    gameBoard = new GameBoard(SYMBOLS);
}
// BEGINS
gameInit();