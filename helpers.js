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
}