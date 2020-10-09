// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';
/**
 * Winning combination is 3 horizontal, 3 verticle, and 2 diagonal
 */
const WINNING_COMBINATION = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[1, 5, 9],
[3, 5, 7]];
let symbols = ['x', 'o'];
let gameBoard;
let turns;

function gameInit() {
    console.log('Welcome to Tic tac Toe 9000');
    let buttonAll = document.querySelectorAll(".square");
    turns = 0;
    buttonAll.forEach((button) => {
        button.addEventListener('click', onSquareClick);
    });
    document.querySelector("#reset").addEventListener('click', onReset);
    gameBoard = new GameBoard(symbols);
}

/**
 * Reset the game
 */
function resetGame() {
    gameBoard.players.forEach((one) => {
        let len = one.clicksArr.length;
        one.clicksArr.splice(0, len);

    });
    document.querySelectorAll(".square").forEach((square) => {
        square.innerText = '';
    });
}

function disableGame() {
    document.querySelectorAll(".square").forEach((square) => {
        square.style.pointerEvents = 'none';
    });
}

function switchTurn(next) {
    gameBoard.next.play();
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

function checkSquare(ele){
    let ret = (gameBoard.gameStatus) || (ele.innerText === null) || (ele.innerText === '')? true:false;
    console.log(`checkSqure ${ret}`);
    return (ele)
}
/**
 * User should be allowed to play only when the game is to begin.
 * @param {*} event 
 */
function onSquareClick(event) {

    let square = event.target;
    let player = gameBoard.getPlayer(turns);
    console.log(player);
    let className ='';
    turns = (++turns % 2);
    console.log(turns);
    let nextPlayer = gameBoard.getPlayer(turns);
    console.log(nextPlayer);
    /**
     * Check if the game is on and the blank square
     */
    if (checkSquare(square)) {
        if(player.isTurn){
            player.play();
            square.classList.add(player.symbol);
            square.innerText = player.symbol;
            document.querySelector('#gameInfo #gameTurn').classList.remove(player.symbol);
            document.querySelector('#gameInfo #gameTurn').classList.add(nextPlayer.symbol);
            player.clicksArr.push(parseInt(event.target.id));
            if (player.isWinner()){
                className = `player-${player.symbol}-win`;
                console.log(`${className}`);;
                document.querySelector('#gameMessages').classList.add(className);
                console.log(document.querySelector('#gameMessages'));
                gameBoard.gameStatus = false;
                disableGame();
            }
        }
        nextPlayer.play();
        square.style.pointerEvents = 'none';
    }
    if (gameBoard.isGameOver()) {
        gameBoard.gameStatus = false;
        document.querySelector('#gameMessages').classList.add('draw');
        disableGame();
    }
}

function onReset(event) {
    resetGame();
}
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
    isWinner() {
        if (this.clicksArr.length >= 3) {
            this.combsArr = subset(this.clicksArr, 3);
            if (isInWinArray(this.combsArr)) {
                return true;
            }
        }
        return false;
    }
}

/**
 * Begin the game with player one
 */
class GameBoard {
    constructor(symbols) {
        this.players = [];
        for (let i = 0; i < symbols.length; i++)
            this.players[i] = new Player(symbols[i]);
        this.players[0].isTurn = true;
        this.gameStatus = true;
        this.index = 0;
    }
  
    isGameOver() {
        if (this.gameStatus && (this.getGameClicks() >= 9))
            return true;
        else
            return false;
    }
    getGameClicks() {
        let sum =0;
        this.players.forEach((one) =>{ sum += one.getClickCnt();
        });
        return sum;
    }
    getPlayer(index) {
        return this.players[index];
    }
}
gameInit();