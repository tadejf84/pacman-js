const directions = [
    'blockBelow',
    'blockAbove',
    'blockRight',
    'blockLeft'
];

/**
 * Ghosts Class
 * 
 */
class Ghosts {

    constructor () {
        this.posX = null;
        this.posY = null;
        this.ghost = null;
        this.offset = 0;
        this.dir = null;
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
        this.posY = this.ghost.offsetTop;
        this.row = Math.floor(this.ghost.offsetTop / 20);
        this.column = Math.floor(this.ghost.offsetLeft / 20);


        const adjacent = Helpers.checkAdjacentBlocks(GRID, this.row, this.column);
        const adjacentMoves = [];
        for (const [key, value] of Object.entries(adjacent)) {
            if( value !== 2) {
                adjacentMoves.push(key);
            }
        }
        this.dir = adjacentMoves[Math.floor(Math.random() * adjacentMoves.length)];
    }

    move () {

        if( this.offset <= 19 ) {
            this.getDirection(this.dir);
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
        if ( dir === 'blockRight') {      
            this.ghost.style.left = (this.posX - 1) + "px";
            this.posX = this.posX - 1;
        } else if ( dir === 'blockBelow' ) {    // Move to top
            this.ghost.style.top = (this.posY - 1) + "px";
            this.posY = this.posY - 1;
        } else if ( dir === 'blockLeft' ) {    // Move to right
            this.ghost.style.left = (this.posX + 1) + "px";
            this.posX = this.posX + 1;
        } else if ( dir === 'blockAbove') {    // Move to bottom
            this.ghost.style.top = (this.posY + 1) + "px";
            this.posY = this.posY + 1;
        }
    }
}
