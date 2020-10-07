// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';
function init() {
    console.log('Welcome to Tic tac Toe 9000');
    let buttonAll = document.querySelectorAll(".square");
    console.log(buttonAll);
    let i=0;
    buttonAll.forEach((button) => {
            button.setAttribute("id", ++i);    
            button.addEventListener('click', onSquareClick);       
    });
    document.querySelector(".restart").addEventListener('click', onReset);
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
    }
    play() {
        this.isTurn = !this.isTurn;
    }
}

let player1 = new Player(1,'X',true);
let player2 = new Player(2,'0',false);

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
        square.classList.remove('p1');
        square.classList.remove('p2');
        square.classList.remove('noclick');

    });
}