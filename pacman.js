/**
 * Pacman Class
 * 
 */
class Pacman {

    constructor () {
        this.row = null;
        this.column = null;
        this.score = 0;
        this.draw();
    }

    draw () {
        const pacmanHolder = document.querySelector('.pacman-holder');
        const div = document.createElement('div');
        div.classList.add('pacman');
        pacmanHolder.appendChild(div);
        const pacman = document.querySelector('.pacman');
        this.row = Math.floor(pacman.offsetTop / 20);
        this.column = Math.floor(pacman.offsetLeft / 20);
    }


    /**
     * Activate Pacman
     * 
     */
    activate () {
        const pacman = document.querySelector('.pacman');
        pacman.classList.add('active');;
        document.addEventListener('keydown', (e) => {
            this.movePacmanOnKeyPush(e);
        });
    }


    /**
     * Move Pacman
     * 
     * @param {object} e 
     */
    movePacmanOnKeyPush(e) {
        const key = e.keyCode;
        const pacman = document.querySelector('.pacman');

        // Get type of adjacent blocks
        const { blockAbove, blockBelow, blockLeft, blockRight } = Helpers.checkAdjacentBlocks(GRID, this.row, this.column);

        if ( key === 37 && blockLeft !== 2) {           // Move to left
            pacman.style.left = (pacman.offsetLeft - 20) + "px";
            pacman.style.transform = `rotateY(180deg)`;
        } else if (key === 38 && blockAbove !== 2) {    // Move to top
            pacman.style.top = (pacman.offsetTop - 20) + "px";
            pacman.style.transform = `rotate(-90deg)`;
        } else if (key === 39 && blockRight !== 2) {    // Move to right
            pacman.style.left = (pacman.offsetLeft + 20) + "px";
            pacman.style.transform = `rotate(0)`;
        } else if (key === 40 && blockBelow !== 2 && blockBelow !== 4) {    // Move to bottom
            pacman.style.top = (pacman.offsetTop + 20) + "px";
            pacman.style.transform = `rotate(90deg)`;
        }

        this.row = Math.floor(pacman.offsetTop / 20);
        this.column = Math.floor(pacman.offsetLeft / 20);

        // Update score
        this.updateScore(this.row, this.column);
    }


    /**
     * Update score
     * 
     * @param {number} row 
     * @param {number} column
     *  
     */
    updateScore(row, column) {
        const scoreBoard = document.querySelector('#scoreBoard');
        const curBlock = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);

        if(GRID[row][column] === 1 && curBlock.classList.contains('dot')) {
            curBlock.classList.remove('dot');
            this.score = this.score + 10;
            scoreBoard.textContent = this.score;
        }

        if(GRID[row][column] === 5 && curBlock.classList.contains('energizer')) {
            curBlock.classList.remove('energizer');
            this.score = this.score + 50;
            scoreBoard.textContent = this.score;
        }
    }
}