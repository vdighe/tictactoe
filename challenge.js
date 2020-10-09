// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';
/**
 * Winning combination is 3 horizontal, 3 verticle, and 2 diagonal
 */
const WINNING_COMBINATION= [[1, 2, 3],
[4, 5, 6],
[7, 8, 9],
[1, 4, 7],
[2, 5, 8],
[3, 6, 9],
[1, 5, 9],
[3, 5, 7]];
const player1Arr = []
const player2Arr = []

let player1Combs =[];
let player2Combs =[];

const MAXCNT=3;
let player1 ;
let player2 ;

let gameStatus = false;
let gameBoard;

function gameInit() {
    console.log('Welcome to Tic tac Toe 9000');
    let buttonAll = document.querySelectorAll(".square");
    console.log(buttonAll);

    buttonAll.forEach((button) => {
        button.addEventListener('click', onSquareClick);
    });
    gameStatus = true;
    document.querySelector("#reset").addEventListener('click', onReset);
    gameBoard = new GameBoard();
}



/**
 * Reset the game
 */
function resetGame() {

    gameBoard.player1.clicksArr.splice(0, gameBoard.player1.clicksArr.length);
    gameBoard.player2.clicksArr.splice(0, gameBoard.player2.clicksArr.length);
 
    document.querySelectorAll(".square").forEach((square) => {
        square.innerText = '';
    });
}

function disableGame() {
    document.querySelectorAll(".square").forEach((square) => {
        square.style.pointerEvents = 'none';
    });
}

function switchTurn() {
    gameBoard.switchTurn();
}

/**
 * Bring maximum combinations of players 
 * in the array of 3's
 * @param {*} arra 
 * @param {*} arra_size 
 */
function subset(arra, arra_size=MAXCNT) {
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
function isWinner(array) {
    
    for (let i=0; i < array.length; i++){
        for (let j=0; j < WINNING_COMBINATION.length; j++){
            if (arrayEquals(array[i], WINNING_COMBINATION[j]))
                return true;
        }
    }
    return false;
}

/**
 * User should be allowed to play only when the game is to begin.
 * @param {*} event 
 */
function onSquareClick(event) {    

    let square= event.target;
    
    if ((gameBoard.gameStatus === true)|| (square.innerText === null) || (square.innerText === '')) {
        if (gameBoard.player1.isTurn) {
            square.classList.add(gameBoard.player1.symbol);
            square.innerText = gameBoard.player1.symbol;
            document.querySelector('#gameInfo #gameTurn').classList.remove('x');
            document.querySelector('#gameInfo #gameTurn').classList.add('o');
            gameBoard.player1.clicksArr.push(parseInt(event.target.id));
            if (gameBoard.player1.clicksArr.length >= 3) {
                gameBoard.player1.combsArr = subset(gameBoard.player1.clicksArr, 3);            
                if (isWinner(gameBoard.player1.combsArr)){
                    console.log ('Player 1 wins');
                    gameBoard.player1.isWinner=true;
                    console.log(document.querySelector('#gameMessages .player-x-win'));
                    document.querySelector('#gameMessages').classList.add('player-x-win');
                    gameBoard.gameStatus =false;
                    disableGame();
                }
            }
        } else if (gameBoard.player2.isTurn) {
            square.classList.add(gameBoard.player2.symbol);
            square.innerText = gameBoard.player2.symbol;
            document.querySelector('#gameInfo #gameTurn').classList.remove('o');
            document.querySelector('#gameInfo #gameTurn').classList.add('x');
            gameBoard.player2.clicksArr.push(parseInt(event.target.id));
            if (gameBoard.player2.clicksArr.length >= 3) {
                gameBoard.player2.combsArr = subset(gameBoard.player2.clicksArr, 3);
             
                if (isWinner(gameBoard.player2.combsArr)){
                    gameBoard.player2.isWinner=true;
                    document.querySelector('#gameMessages').classList.add('player-o-win');
                    gameBoard.gameStatus =false;
                    disableGame();
                }
                
            }
        }
        switchTurn();
    }
    //console.log(`After every click ${gameStatus} Player 1(${player1Arr.length}) Player 2(${player2Arr.length})`);
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
    constructor(id, symbol, isTurn = false) {
        this.id = id;
        this.symbol = symbol;
        this.isTurn = isTurn;
        this.isWinner = false;
        this.clicksArr = [];
        this.combsArr = [];
    }
    play() {
        this.isTurn = !this.isTurn;
    }
    getClickCnt(){
        return this.clicksArr.length;
    }
}

/**
 * Begin the game with player one
 */
class GameBoard {
    constructor(player1,player2){
        this.player1 = new Player(1,'X', true);
        this.player2= new Player(1,'O', false);
        this.gameStatus = true;
    }
    switchTurn() {
        this.player1.play()
        this.player2.play()
    }
    isGameOver() {
        if (this.gameStatus && (this.getGameClicks() >=9))
            return true;
        else
            return false;            

    }
    getGameClicks(){
        return this.player1.getClickCnt() + this.player2.getClickCnt();
    }
}
gameInit();