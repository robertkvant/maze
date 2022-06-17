'use strict'
const BORDER = {
    TOP: 0b00010,
    RIGHT: 0b00100,
    BOTTOM: 0b01000,
    LEFT: 0b10000
}

export function GenerateMaze(nbrOfRows, nbrOfCols) {

    // Create empty (nbrOfRows x nbrOfCols) array
    const maze = Array.from({ length: nbrOfRows }, e =>
        Array.from({ length: nbrOfCols }, e => 0));

    // Assign each cell on rows 0 -> (rows - 1) with a
    // right and bottom border, except last 
    // cell (only bottom border)
    maze.forEach((row, index) => {
        if (index < nbrOfRows - 1) {
            row.fill(BORDER.RIGHT | BORDER.BOTTOM,
                0, nbrOfCols - 1)
            row[nbrOfCols - 1] = BORDER.BOTTOM;
        }
    });

    // Assign a right border to the cells on 
    // the last row (except last column) 
    maze[nbrOfRows - 1].fill(BORDER.RIGHT,
        0, nbrOfCols - 1)

    
    //Generate maze
    createMaze()


    // Returns adjacent cells row and column position 
    function getNeighbours(row, col) {
        let c = []
        c.push([row - 1, col])
        c.push([row, col + 1])
        c.push([row + 1, col])
        c.push([row, col - 1])
        return c.filter((p) =>
            p.every((n) =>
                n >= 0 &&
                n < maze[0].length)
        )
    }

    // Get random element from array
    function getRandomElement(arr) {
        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand]
    }

    // Return random unvisited neighbour
    function randomUnvisitedNeighbour(row, col, visited) {
        let n = getNeighbours(row, col).filter((a) =>
            visited.every((e) =>
                a[0] !== e[0] ||
                a[1] !== e[1]
            )
        )
        return getRandomElement(n)
    }

    // Remove border between (fromRow,fromCol) and (toRow,toCol)
    function removeBorder(fromRow, fromCol, toRow, toCol) {
        const removeBottomBorder = (r, c) =>
            maze[r][c] = maze[r][c] & ~BORDER.BOTTOM
        const removeRightBorder = (r, c) =>
            maze[r][c] = maze[r][c] & ~BORDER.RIGHT
        //Down
        if (toRow === fromRow + 1) {
            removeBottomBorder(fromRow, fromCol)
        }
        //Up
        if (toRow === fromRow - 1) {
            removeBottomBorder(toRow, toCol)
        }
        //Right
        if (toCol === fromCol + 1) {
            removeRightBorder(fromRow, fromCol)
        }
        //Left
        if (toCol === fromCol - 1) {
            removeRightBorder(toRow, toCol)
        }
    }

    // Create a random maze
    function createMaze() {
        let visited = []
        DFS(0, 0, visited)
    }

    // Generate maze with a random depth first search
    function DFS(row, col, visited) {
        visited.push([row, col])
        while (randomUnvisitedNeighbour(row, col, visited)) {
            let n = randomUnvisitedNeighbour(row, col, visited)
            removeBorder(row, col, n[0], n[1])
            DFS(n[0], n[1], visited)
        }
    }

    return maze
}

