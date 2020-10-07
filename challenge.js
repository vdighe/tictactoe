// Enable strict mode to eliminate some JavaScript silent errors 
// by changing them to throw errors. And help JavaScript engines 
// to perform optimizations to run our code faster.
'use strict';
function init() {
    console.log('Welcome to Tic tac Toe 9000');
    var buttonAll = document.querySelectorAll(".square");
    console.log(buttonAll);
    let i=1;
    buttonAll.forEach((button) => {
            button.setAttribute("id", i++);
            button.addEventListener('click', (e) => {
                let id = button.getAttribute('id');
                button.innerText =id;
                console.log(`Clicked ${id}`);})
    });
}
init();


function onSquareClick(event) {
    console.log(event);

}
/*
const buttonContainer = document.querySelector(".js-control-panel");
buttonContainer.addEventListener('click',(e) => {
    if (e.target.classList.contains('js-button')){
     console.log(event.target);
        let id = e.target.getAttribute('id');
        console.log(`A button clicked! ${id} `);
       
       buttonAll.forEach((ele, indx)=> {
            if (ele ===  event.target){
                console.log(`Button number: ${indx+1}`);
            }
        })
    }
        
});
*/