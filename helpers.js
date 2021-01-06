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


    /**
     * Get available adjacent blocks - blocks that are not walls
     * 
     * @param {array} grid 
     * @param {number} row 
     * @param {number} column 
     * 
     * @returns {array} available adjacent blocks
     */
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


    /**
     * Get available directions to move ghosts
     * 
     * @param {array} grid 
     * @param {number} row 
     * @param {number} column 
     * @param {string} dir
     * @param {string} oppositeDir
     * 
     * @returns {array} available directions
     */
    static getAvailableDirections(GRID, row, column, dir = null, oppositeDir = null) {
        const adjacentBlocks = Helpers.checkAdjacentBlocks(GRID, row, column);

        let adjacentMoves = [];

        for (const [key, value] of Object.entries(adjacentBlocks) ) 
        {
            if( value != 2 && key !== dir ) 
            {
                if( key === 'blockAbove' )
                {
                    adjacentMoves.push('toTop');
                }
                else if( key === 'blockBelow' )
                {
                    adjacentMoves.push('toBottom');                    
                }
                else if( key === 'blockLeft' )
                {
                    adjacentMoves.push('toLeft');                    
                }
                else if( key === 'blockRight' )
                {
                    adjacentMoves.push('toRight');                    
                }
            }
        }

        if(adjacentMoves.length === 1) return adjacentMoves;
        
        // Remove opposite direction to prevent ghost from switching to opposite direction
        adjacentMoves = adjacentMoves.filter(move => move !== oppositeDir);

        return adjacentMoves;
    }
}