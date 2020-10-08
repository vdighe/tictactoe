// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';
/**
 * Winning combination is 3 horizontal, 3 verticle, and 2 diagonal
 */
const WINNIG_COMBINATION = [[1,2,3],
                            [4,5,6],
                            [7,8,9],
                            [1,4,7],
                            [2,5,8],
                            [3,6,9],
                            [1,5,9],
                            [3,5,7]];
function init() {
    console.log('Welcome to Tic tac Toe 9000');
    let buttonAll = document.querySelectorAll(".square");
    console.log(buttonAll);

    buttonAll.forEach((button) => {
            button.addEventListener('click', onSquareClick);       
    });
    document.querySelector(".reset").addEventListener('click', onReset);
}
init();
let numberOfPlayers = 2;
let currentPlayer = 0;
const player1Symbol = "X";
const player2Symbol = "O";

class Player {
    constructor(id, symbol, isTurn=false){
        this.id =id;
        this.symbol=symbol;
        this.isTurn = isTurn;
        this.isWinner = false;
    }
    play() {
        this.isTurn = !this.isTurn;
    }
}


function switchTurn() {
    player1.play()
    player2.play()
}

function onSquareClick(event) {
    if ((event.target.innerText === null )|| (event.target.innerText === '' )){
        if (player1.isTurn){
            event.target.innerText = player1.symbol;
            event.target.classList.add('p1');
        }
        else if (player2.isTurn) {
            event.target.innerText = player2.symbol;
            event.target.classList.add('p2');
        }
        switchTurn();
    } else {
        event.target.classList.add('noclick');
    }
}

function onReset(event){
    document.querySelectorAll(".square").forEach((square) => {
        square.innerText ='';
    });
}
/**
 * Begin the game with player one
 */

let player1 = new Player(1,'X');
let player2 = new Player(2,'0');

player1.isTurn = true;
