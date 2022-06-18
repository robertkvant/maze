'use strict'
const BORDER = {
    TOP: 0b00010,
    RIGHT: 0b00100,
    BOTTOM: 0b01000,
    LEFT: 0b10000
}

const CIRCLE = 0b00001

export class Maze {

    constructor(nbrOfRows, nbrOfCols) {
        // Create empty (nbrOfRows x nbrOfCols) array
        this.maze = Array.from({ length: nbrOfRows }, e =>
            Array.from({ length: nbrOfCols }, e => 0));

        // Assign each cell on rows 0 -> (rows - 1) with a
        // right and bottom border, except last 
        // cell (only bottom border)
        this.maze.forEach((row, index) => {
            if (index < nbrOfRows - 1) {
                row.fill(BORDER.RIGHT | BORDER.BOTTOM,
                    0, nbrOfCols - 1)
                row[nbrOfCols - 1] = BORDER.BOTTOM;
            }
        });

        // Assign a right border to the cells at 
        // the last row (except last column) 
        this.maze[nbrOfRows - 1].fill(BORDER.RIGHT,
            0, nbrOfCols - 1)

        //Generate maze
        this.createMaze()
        this.initCircle()
    }

    // Returns adjacent cells row and column position 
    getNeighbours(row, col) {
        let c = []
        c.push([row - 1, col])
        c.push([row, col + 1])
        c.push([row + 1, col])
        c.push([row, col - 1])
        return c.filter((p) =>
            p.every((n) =>
                n >= 0 &&
                n < this.maze[0].length)
        )
    }

    // Checks if (nRow,nCol) is a neighbour to (row,col)
    isNeighbour(nRow, nCol, row, col) {
        const n = this.getNeighbours(row, col)
        return n.some((x) => x[0] === nRow
            && x[1] === nCol)
    }

    // Get random element from array
    getRandomElement(arr) {
        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand]
    }

    // Return random unvisited neighbour
    randomUnvisitedNeighbour(row, col, visited) {
        let n = this.getNeighbours(row, col).filter((a) =>
            visited.every((e) =>
                a[0] !== e[0] ||
                a[1] !== e[1]
            )
        )
        return this.getRandomElement(n)
    }

    // Remove border between (fromRow,fromCol) and (toRow,toCol)
    removeBorder(fromRow, fromCol, toRow, toCol) {
        const removeBottomBorder = (r, c) =>
            this.maze[r][c] = this.maze[r][c]
            & ~BORDER.BOTTOM
        const removeRightBorder = (r, c) =>
            this.maze[r][c] = this.maze[r][c]
            & ~BORDER.RIGHT

        if (!this.isNeighbour(toRow, toCol, fromRow, fromCol)) {
            throw "Not neighbours!";
        }

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

    // Checks if there is a border between the two cells
    borderBetween(fromRow, fromCol, toRow, toCol) {
        const hasBottomBorder = (r, c) =>
            (this.maze[r][c] & BORDER.BOTTOM) !== 0
        const hasRightBorder = (r, c) =>
            (this.maze[r][c] & BORDER.RIGHT) !== 0

        if (!this.isNeighbour(toRow, toCol, fromRow, fromCol)) {
            throw "Not neighbours!";
        }

        //Down
        if (toRow === fromRow + 1) {
            return hasBottomBorder(fromRow, fromCol)
        }
        //Up
        if (toRow === fromRow - 1) {
            return hasBottomBorder(toRow, toCol)
        }
        //Right
        if (toCol === fromCol + 1) {
            return hasRightBorder(fromRow, fromCol)
        }
        //Left
        if (toCol === fromCol - 1) {
            return hasRightBorder(toRow, toCol)
        }
    }

    // Create a random maze
    createMaze() {
        let visited = []
        this.DFS(0, 0, visited)
    }

    // Generate a maze with a random depth first search
    DFS(row, col, visited) {
        visited.push([row, col])
        while (this.randomUnvisitedNeighbour(row, col, visited)) {
            let n = this.randomUnvisitedNeighbour(row, col, visited)
            this.removeBorder(row, col, n[0], n[1])
            this.DFS(n[0], n[1], visited)
        }
    }

    // Place 'square' at position (0,0)
    initCircle() {
        this.maze[0][0] |= CIRCLE
    }

    // Move square
    moveCircle(fromRow, fromCol, toRow, toCol) {
        if (!this.borderBetween(fromRow, fromCol, toRow, toCol)) {
            this.maze[toRow][toCol] |= CIRCLE
            this.maze[fromRow][fromCol] &= ~CIRCLE
        }
    }
}

