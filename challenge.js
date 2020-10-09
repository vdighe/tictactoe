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

function gameInit() {
    console.log('Welcome to Tic tac Toe 9000');
    let buttonAll = document.querySelectorAll(".square");
    console.log(buttonAll);

    buttonAll.forEach((button) => {
        button.addEventListener('click', onSquareClick);
    });
    gameStatus = true;
    document.querySelector("#reset").addEventListener('click', onReset);
    player1 = new Player(1, 'X');
    player2 = new Player(2, 'O');
    player1.isTurn = ((Math.floor(Math.random() * 2)===1)?true:false);
    player2.isTurn = !player1.isTurn;
    console.log(`Player1's turn(${player1.isTurn}), Player2's turn (${player2.isTurn})`);
}



/**
 * Reset the game
 */
function resetGame() {

    player1Arr.splice(0, player1Arr.length);
    player2Arr.splice(0, player2Arr.length);
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
    player1.play()
    player2.play()
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
            console.log(result);
            result_set.push(result);
        }
    }
    console.log(result_set);
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
    
    if ((this.gameStatus === true)|| (event.target.innerText === null) || (event.target.innerText === '')) {
        if (player1.isTurn) {
            event.target.innerText = player1.symbol;
            console.log(document.querySelector('#gameInfo #gameTurn').classList);
            document.querySelector('#gameInfo #gameTurn').classList.remove('x');
            document.querySelector('#gameInfo #gameTurn').classList.add('o');
            player1Arr.push(parseInt(event.target.id));
            if (player1Arr.length >= 3) {
                player1Combs = subset(player1Arr, 3);            
                if (isWinner(player1Combs)){
                    console.log ('Player 1 wins');
                    player1.isWinner=true;
                    console.log(document.querySelector('#gameMessages .player-x-win'));
                    document.querySelector('#gameMessages').classList.add('player-x-win');
                    this.gameStatus =false;
                    disableGame();
                }
               // console.log(`Player1 ${player1Arr} ${player1Combs} `);
            }
        }
        else if (player2.isTurn) {
            event.target.innerText = player2.symbol;
            document.querySelector('#gameInfo #gameTurn').classList.remove('o');
            document.querySelector('#gameInfo #gameTurn').classList.add('x');
            player2Arr.push(parseInt(event.target.id));
            if (player2Arr.length >= 3) {
                player2Combs = subset(player2Arr, 3);
                console.log(`Player2 ${player2Arr} ${player2Combs}`);
             
                if (isWinner(player2Combs)){
                    player2.isWinner=true;
                    document.querySelector('#gameMessages').classList.add('player-o-win');
                    this.gameStatus =false;
                    disableGame();
                }
                
            }
        }
        switchTurn();
    }

    //console.log(`After every click ${gameStatus} Player 1(${player1Arr.length}) Player 2(${player2Arr.length})`);
    if (gameStatus && (player1Arr.length + player2Arr.length >=9)) {
        gameStatus = false;
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
    }
    play() {
        this.isTurn = !this.isTurn;
    }
}

/**
 * Begin the game with player one
 */
class GameBoard {


}


gameInit();