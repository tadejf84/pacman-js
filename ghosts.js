const directions = [
    'up',
    'down',
    'left',
    'right'
];

/**
 * Ghosts Class
 * 
 */
class Ghosts {

    constructor () {
        this.posX = null;
        this.ghost = null;
        this.offset = 0;
        this.dir = directions[Math.floor(Math.random() * directions.length)];
        this.row = null;
        this.column = null;
        this.draw();
    }

    draw () {
        const ghostHolder = document.querySelector('.ghost-holder');
        const div = document.createElement('div');
        div.classList.add('ghost');
        ghostHolder.appendChild(div);
        this.ghost = document.querySelector('.ghost');
        this.posX = this.ghost.offsetLeft;
        this.row = Math.floor(this.ghost.offsetTop / 20);
        this.column = Math.floor(this.ghost.offsetLeft / 20);
    }

    move () {

        if( this.offset <= 19 ) {
            const newPos = this.posX + 1;
            this.getDirection(this.dir);
            this.posX = newPos;
            this.offset++;
        } else {
            const adjacent = Helpers.checkAdjacentBlocks(GRID, this.row, this.column);

            const adjacentMoves = [];
            for (const [key, value] of Object.entries(adjacent)) {
                if( value !== 2) {
                    adjacentMoves.push(key);
                }
            }
  
            this.dir = adjacentMoves[Math.floor(Math.random() * adjacentMoves.length)];
            this.offset = 0;
        }

        this.row = Math.floor(this.ghost.offsetTop / 20);
        this.column = Math.floor(this.ghost.offsetLeft / 20);
    }

    getDirection(dir) {
        const { blockAbove, blockBelow, blockLeft, blockRight } = Helpers.checkAdjacentBlocks(GRID, this.row, this.column);
        if ( dir === 'blockRight' ) {      
            this.ghost.style.left = (this.ghost.offsetLeft - 1) + "px";
        } else if ( dir === 'blockBelow' ) {    // Move to top
            this.ghost.style.top = (this.ghost.offsetTop - 1) + "px";
        } else if ( dir === 'blockLeft' ) {    // Move to right
            this.ghost.style.left = (this.ghost.offsetLeft + 1) + "px";
        } else if ( dir === 'blockAbove') {    // Move to bottom
            this.ghost.style.top = (this.ghost.offsetTop + 1) + "px";
        }
    }
}
