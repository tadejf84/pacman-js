const gameBoardEl = document.querySelector('#gameBoard');

/**
 * Define Game Board Grid
 * 
 * 1 - normal block with dot
 * 2 - wall
 * 3 - empty block
 * 4 - ghost lair
 * 5 - energizers
 * 6 - ghosts spot
 * 7 - pacman spot
 * 
 */
const GRID = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2],
    [2, 5, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 5, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 3, 3, 3, 3],
    [3, 3, 3, 3, 2, 1, 2, 1, 2, 2, 2, 4, 2, 2, 2, 1, 2, 1, 2, 3, 3, 3, 3],
    [2, 2, 2, 2, 2, 1, 2, 1, 2, 4, 6, 6, 6, 6, 2, 1, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 2, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2],
    [3, 3, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 3, 3, 3, 3],
    [2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 1, 2],
    [2, 5, 1, 2, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 2, 1, 5, 2],
    [2, 2, 1, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 2, 2],
    [2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2],
    [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

// Grid constants
const GRID_BLOCK_SIZE = 20;
const GRID_ROW_COUNT = GRID.length;
const GRID_COLUMN_COUNT = GRID[0].length;

/**
 * Game Board Class
 * 
 */
class GameBoard {

    constructor(){
        this.blocks = null;

        // Drag Grid on Init
        this.draw(); 
    }


    /**
     * Draw grid
     * 
     */
    draw() {

        // Create CSS grid
        gameBoardEl.style.gridTemplateColumns = `repeat(${GRID_COLUMN_COUNT}, ${GRID_BLOCK_SIZE}px)`;

        // Append blocks to grid
        for( let i = 0; i < GRID_ROW_COUNT; i++ ) {
            for(let j = 0; j < GRID_COLUMN_COUNT; j++ ) {
                this.drawBlock(i, j);
            }
        }

        // Add classes to blocks
        this.blocks = document.querySelectorAll('.grid-block');
        this.blocks.forEach(block => {
            this.addBlockClass(block);
        });
    }


    /**
     * Draw grid block
     * 
     * @param {number} row 
     * @param {number} column 
     * 
     */
    drawBlock(row, column) {
        const div = document.createElement('div');
        div.classList.add('grid-block');
        div.style.height = `${GRID_BLOCK_SIZE}px`;
        div.style.width = `${GRID_BLOCK_SIZE}px`;
        div.setAttribute("data-row", row);
        div.setAttribute("data-column", column);
        gameBoardEl.append(div);
    }


    /**
     * Add classes to grid blocks
     * 
     * @param {object} block 
     */
    addBlockClass(block) {

        // Get block row and column
        const row = +block.dataset.row;
        const column = +block.dataset.column;

        // Get type of adjacent blocks
        const { blockAbove, blockBelow, blockLeft, blockRight } = Helpers.checkAdjacentBlocks(GRID, row, column);
            
        // Draw dots
        if ( GRID[row][column] === 1 ) 
        {
            block.classList.add('dot')
        }

        // Draw walls
        if( GRID[row][column] === 2 ) 
        {
            block.classList.add('wall');

            if(blockAbove === 2 && blockBelow === 2 && blockLeft === 2 && blockRight === 2) 
            {
                block.classList.add('wall--around');
            }
            else if(blockAbove === 2 && blockBelow === 2 && blockRight === 2) 
            {
                block.classList.add('wall--center-left');
            }
            else if(blockAbove === 2 && blockBelow === 2 && blockLeft === 2) 
            {
                block.classList.add('wall--center-right');
            }
            else if (blockAbove === 2 && blockLeft === 2 && blockRight === 2)
            {
                block.classList.add('wall--bottom-middle');
            } 
            else if (blockBelow === 2 && blockLeft === 2 && blockRight === 2)
            {
                block.classList.add('wall--top-middle');
            } 
            else if (blockAbove === 2 && blockRight === 2)
            {
                block.classList.add('wall--bottom-left');
            } 
            else if (blockAbove === 2 && blockLeft === 2)
            {
                block.classList.add('wall--bottom-right');
            } 
            else if (blockBelow === 2 && blockRight === 2)
            {
                block.classList.add('wall--top-left');
            } 
            else if (blockBelow === 2 && blockLeft === 2)
            {
                block.classList.add('wall--top-right');
            } 
            else if (blockRight === 2 && blockLeft === 2)
            {
                block.classList.add('wall--middle');
            }
            else if (blockAbove === 2 && blockBelow === 2)
            {
                block.classList.add('wall--center');
            } 
            else if (blockAbove === 2)
            {
                block.classList.add('wall--bottom');
            }
            else if (blockBelow === 2)
            {
                block.classList.add('wall--top');
            }
            else if (blockLeft === 2)
            {
                block.classList.add('wall--right');
            }
            else if (blockRight === 2)
            {
                block.classList.add('wall--left');
            }
        }

        // Draw energizers
        if ( GRID[row][column] === 5 ) 
        {
            block.classList.add('energizer');
        }

        // Draw ghost holders
        if ( GRID[row][column] === 6 ) {
            block.classList.add('ghost-holder');
        }

        // Draw pacman holder
        if ( GRID[row][column] === 7 ) {
            block.classList.add('pacman-holder');
        }
    }
}


