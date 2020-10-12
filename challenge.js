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
let symbols = ['x', 'o'];
let gameBoard;
let turns;
const SCORE = { 'x': 0, 'o': 0 };
const WINNER_HORN = new Audio('./TicTacToe.mp3');
let gameData  = new Array(9);

/**
 * Update the score based on localStore and then update UI
 */

function updateScoreBoard(winner) {
    let newScore = JSON.parse(sessionStorage.getItem('score'));
    newScore[winner] = newScore[winner] + 1;

    /*
     * More than three times. then blow the horn and reset the score
     */
    if (newScore[winner]  === 3) {
        WINNER_HORN.play();
        newScore[winner] =0;
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
function gameInit() {

    console.log('Welcome to Tic tac Toe 2020');
    let buttonAll = document.querySelectorAll(".square");
    turns = 0;
    buttonAll.forEach((button) => {
        button.addEventListener('click', onSquareClick);
    });
    document.querySelector("#reset").addEventListener('click', onReset);
    if (sessionStorage.getItem('score') === null)
        sessionStorage.setItem('score', JSON.stringify(SCORE));
    updateScore();
    gameBoard = new GameBoard(symbols);
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

function disableGame() {
    document.querySelectorAll(".square").forEach((square) => {
        square.style.pointerEvents = 'none';
    });
}


/**
 * Bring maximum combinations of players 
 * in the array of 3's
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

function checkSquare(ele) {
    let ret = (gameBoard.gameStatus) || (ele.innerText === null) || (ele.innerText === '') ? true : false;
    return (ele)
}

// GET EMPTY SPACES
function getEmptySpaces(gameData){
    let EMPTY = [];
    for( let id = 0; id < gameData.length; id++){
        if(!gameData[id]) EMPTY.push(id);
    }
    return EMPTY;
}

 /**
  * check for a winner
     const WINNING_COMBINATION = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];
  */
 function isWinner(gameData, player){
    for(let i = 0; i < WINNING_COMBINATION.length; i++){
        let won = true;
        for(let j = 0; j < WINNING_COMBINATION[i].length; j++){
            let id = WINNING_COMBINATION[i][j];
            won = gameData[id] == player && won;
        }
        if(won){
            return true;
        }
    }
    return false;
}
// Check for a tie game
function isTie(gameData){
    let isBoardFill = true;
    for(let i = 0; i < gameData.length; i++){
        isBoardFill = gameData[i] && isBoardFill;
    }
    if(isBoardFill){
        return true;
    }
    return false;
}

// MINIMAX
function minimax(gameData, PLAYER){
    // BASE
    
    if ( isWinner(gameData, symbols[0])) return { evaluation : -10};
    if ( isWinner(gameData, symbols[1])) return { evaluation : +10};
    if ( isTie(gameData))  return {evaluation :0};
  
    // LOOK FOR EMPTY SPACES
    let EMPTY_SPACES = getEmptySpaces(gameData); 

    // SAVE ALL MOVES AND THEIR EVALUATIONS
    let moves = [];
    // LOOP OVER THE EMPTY SPACE TO EVALUATE
    for (let i=0; i < EMPTY_SPACES.length; i++){
        let id = EMPTY_SPACES[i];
        let backup = gameData[id];
        gameData[id]=PLAYER;

        let move = {}
        move.id = id;
        // THE EVALUATION
        if (PLAYER === symbols[1]) { //Meaning computer
            move.evaluation = minimax(gameData, symbols[0]).evaluation;
        } else {
            move.evaluation = minimax(gameData, symbols[1]).evaluation;
        }
        // Restore space
        gameData[id] = backup;

        //Save the move
        moves.push(move);

    }
    let bestMove;
    if(PLAYER === symbols[1]){
        // MAXIMIZER
        let bestEvaluation = -Infinity;
        for(let i = 0; i < moves.length; i++){
            if( moves[i].evaluation > bestEvaluation ){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }else{
        // MINIMIZER
        let bestEvaluation = +Infinity;
        for(let i = 0; i < moves.length; i++){
            if( moves[i].evaluation < bestEvaluation ){
                bestEvaluation = moves[i].evaluation;
                bestMove = moves[i];
            }
        }
    }
    return bestMove;
}

/**
 * Draw the move on board
 * *
 */
function drawOnBoard(square, player) {
    square.classList.add(player.symbol);
    square.innerText = player.symbol;
    square.style.pointerEvents = 'none';
    /*ADD SYMBOL
    document.querySelector('#gameInfo #gameTurn').classList.remove(player.symbol);
    document.querySelector('#gameInfo #gameTurn').classList.add(nextPlayer.symbol);
    */
    player.clicksArr.push(parseInt(square.id));
}
/**
 * User should be allowed to play only when the game is to begin.
 * @param {*} event 
 */
function onSquareClick(event) {
    let className = '';
    let square = event.target;

    let player = gameBoard.getPlayer(turns);      
    let computer = gameBoard.getPlayer((turns+1 % 2));

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
     * Check if the game is a draw
     */
    if (gameBoard.isGameOver()) {
        gameBoard.gameStatus = false;
        document.querySelector('#gameMessages').classList.add('draw');
        document.querySelector('#gameInfo #gameTurn').classList.remove(player.symbol);
        document.querySelector('#gameInfo #gameTurn').classList.remove(computer.symbol);
        document.querySelector('#gameInfo #gameTurn').classList.add('t');
        disableGame();
        return;
    }

    /**
     * Otherwise let computer play
     */
    let id = minimax( gameData, computer.symbol).id;
    gameData[id] = computer.symbol;
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
}

function onReset(event) {
    resetGame();
}


/**
 * Begin the game with player one
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


class GameBoard {
    constructor(symbols) {
        this.playerX = new Player('x', true);
        this.playerO = new Player('o', false);
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
          return ((index === 0)? this.playerX : this.playerO);
    }
    resetGame() {
        this.playerX.reset();
        this.playerO.reset();
    }

}
gameInit();