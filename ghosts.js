// const directions = [
//     'blockBelow',
//     'blockAbove',
//     'blockRight',
//     'blockLeft'
// ];

/**
 * Ghosts Class
 * 
 */
class Ghosts {

    constructor () {
        this.posX = null;
        this.posY = null;
        this.ghost = null;
        this.offset = 1;
        this.dir = null;
        this.row = null;
        this.column = null;
        this.inLair = true;
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
            if( value != 2) {
                adjacentMoves.push(key);
            }
        }
        this.dir = adjacentMoves[Math.floor(Math.random() * adjacentMoves.length)];
    }

    move () {

        // Leave lair first
        if( this.inLair === true )
        {
            this.dir = 'blockRight';

            if(this.offset >= 20) 
            {
                this.dir = 'blockAbove';
            }

            if(this.offset >= 60) {
                this.dir = 'blockLeft';   
                this.inLair = false;  
                this.offset = 0;
                return;
            }
            this.getDirection(this.dir);
            this.offset++;
            this.row = Math.floor(this.ghost.offsetTop / 20);
            this.column = Math.floor(this.ghost.offsetLeft / 20);
            return;
        }
        

        const adjacentBlocks = Helpers.checkAdjacentBlocks(GRID, this.row, this.column);

        console.log(adjacentBlocks[this.dir]);

        if( this.offset === 20 && adjacentBlocks[this.dir] == 2 ) 
        {
            const adjacentMoves = Helpers.getAvailableAdjacentBlocks(GRID, this.row, this.column);
            this.dir = adjacentMoves[Math.floor(Math.random() * adjacentMoves.length)];
            this.getDirection(this.dir);
            this.offset = 0;
        }
        else if( this.offset === 20 && adjacentBlocks[this.dir] != 2 )
        {
            const available = Helpers.getAvailableAdjacentBlocksWithoutOpposite(GRID, this.row, this.column, this.dir);
            this.dir = available[Math.floor(Math.random() * available.length)];
            this.offset = 0;
        }
        else if( this.offset < 20 ) 
        {
            this.getDirection(this.dir);
            this.offset++;
        }

        this.row = Math.floor(this.ghost.offsetTop / 20);
        this.column = Math.floor(this.ghost.offsetLeft / 20);
    }

    getDirection(dir) {
        if ( dir === 'blockRight' ) 
        {      
            this.ghost.style.left = (this.posX + 1) + "px";
            this.posX = this.posX + 1;
        } 
        // Move to top
        else if ( dir === 'blockBelow' ) 
        {   
            this.ghost.style.top = (this.posY + 1) + "px";
            this.posY = this.posY + 1;
        } 
        // Move to right
        else if ( dir === 'blockLeft' ) 
        {    
            this.ghost.style.left = (this.posX - 1) + "px";
            this.posX = this.posX - 1;
        } 
        // Move to bottom
        else if ( dir === 'blockAbove') 
        {
            this.ghost.style.top = (this.posY - 1) + "px";
            this.posY = this.posY - 1;
        }
    }
}
