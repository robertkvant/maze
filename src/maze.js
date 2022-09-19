'use strict'
import { BORDER, CIRCLE } from "./constants";

/* The MIT License (MIT)

Copyright (c) [2022] [Robert Kvant]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE */

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
        //this.placeCircle(0,0)
    }

    // Returns adjacent cells row and column position 
    adjacentcells(row, col) {
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

    // Checks if (nRow,nCol) is adjacent to (row,col)
    isAdjacentCell(nRow, nCol, row, col) {
        const n = this.adjacentcells(row, col)
        return n.some((x) => x[0] === nRow
            && x[1] === nCol)
    }

    // Get random element from array 'arr'
    getRandomElement(arr) {
        const rand = Math.floor(Math.random() * arr.length);
        return arr[rand]
    }

    // Return random unvisited adjacent cell
    randomUnvisitedCell(row, col, visited) {
        let n = this.adjacentcells(row, col).filter((a) =>
            visited.every((e) =>
                a[0] !== e[0] ||
                a[1] !== e[1]
            )
        )
        return this.getRandomElement(n)
    }

    // Remove border between (fromRow,fromCol) and (toRow,toCol)
    removeBorder(fromRow, fromCol, toRow, toCol) {

        if (!this.isAdjacentCell(toRow, toCol, fromRow, fromCol)) {
            throw `(${fromRow},${fromCol}) is not an adjacent cell`
        }

        const removeBottomBorder = (r, c) =>
            this.maze[r][c] = this.maze[r][c]
            & ~BORDER.BOTTOM
        const removeRightBorder = (r, c) =>
            this.maze[r][c] = this.maze[r][c]
            & ~BORDER.RIGHT

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
        
        if (!this.isAdjacentCell(toRow, toCol, fromRow, fromCol)) {
            throw `(${fromRow},${fromCol}) is not an adjacent cell`
        }

        const hasBottomBorder = (r, c) =>
            (this.maze[r][c] & BORDER.BOTTOM) !== 0
        const hasRightBorder = (r, c) =>
            (this.maze[r][c] & BORDER.RIGHT) !== 0

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
        while (this.randomUnvisitedCell(row, col, visited)) {
            let n = this.randomUnvisitedCell(row, col, visited)
            this.removeBorder(row, col, n[0], n[1])
            this.DFS(n[0], n[1], visited)
        }
    }

    // Place circle at (x,y)
    placeCircle(row,col){
        this.maze[row][col] |= CIRCLE
    }

    // Clear circle at (x,y)
    clearCircle(row,col){
        this.maze[row][col] &= ~CIRCLE
    }

    // Returns the array that represents the maze
    getMaze(){
        return this.maze
    }
}

