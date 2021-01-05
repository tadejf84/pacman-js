class Helpers {

    /**
     * Get adjacent block types
     * 
     * @param {array} grid 
     * @param {number} row 
     * @param {number} column 
     * 
     * @returns {object} adjacent block types
     * 
     */
    static checkAdjacentBlocks(grid, row, column) {
        let blockAbove,
            blockBelow,
            blockLeft,
            blockRight;

        const gridRowCount = grid.length;
        const gridColumnCount = grid[0].length;

        if(row != 0) blockAbove = grid[row-1][column];
        if(row != gridRowCount - 1) blockBelow = grid[row+1][column];
        if(column != 0) blockLeft = grid[row][column-1];
        if(column != gridColumnCount - 1) blockRight = grid[row][column+1];

        return { blockAbove, blockBelow, blockLeft, blockRight };
    }


    static getAvailableAdjacentBlocks(GRID, row, column) {
        const adjacent = Helpers.checkAdjacentBlocks(GRID, row, column);
        const adjacentMoves = [];

        for (const [key, value] of Object.entries(adjacent) ) 
        {
            if( value != 2 ) 
            {
                adjacentMoves.push(key);
            }
        }

        return adjacentMoves;
    }

    static getAvailableAdjacentBlocksWithoutOpposite(GRID, row, column, dir) {
        const adjacent = Helpers.checkAdjacentBlocks(GRID, row, column);
        let oppositeDir;

        if ( dir === 'blockRight' ) 
        {      
            oppositeDir = 'blockLeft';
        } 
        // Move to top
        else if ( dir === 'blockBelow' ) 
        {   
            oppositeDir = 'blockAbove';
        } 
        // Move to right
        else if ( dir === 'blockLeft' ) 
        {    
            oppositeDir = 'blockRight';
        } 
        // Move to bottom
        else if ( dir === 'blockAbove' ) 
        {
            oppositeDir = 'blockBelow';
        }

        delete adjacent[oppositeDir]; 

        const adjacentMoves = [];

        for (const [key, value] of Object.entries(adjacent) ) 
        {
            if( value != 2 ) 
            {
                adjacentMoves.push(key);
            }
        }

        return adjacentMoves;
    }
}