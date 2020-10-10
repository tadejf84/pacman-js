// Initial score
let score = 0;

// Draw gameboard
const gameboard = new GameBoard();

// Draw Pacman
const pacman = new Pacman();

// Event listeners
document.querySelector('#start').addEventListener('click', startGame );

/**
 * Start game
 * 
 */
function startGame() {
    pacman.activate();
}


// function detectCollision(el1, el2) {
//     var x1 = el1.offsetLeft;
//     var x2 = el2.offsetLeft;
//     var y1 = el1.offsetTop;
//     var y2 = el2.offsetTop;
//     if( x1 >= x2 && x1 < (x2 + 20) && y1 >= y2 && y1 < (y2+20) ) {
//         return true;
//     } else {
//         return false;
//     }
// }
