'use strict'
import { MazeCanvas } from "./canvas";
import { Maze } from "./maze"

const maze = new Maze(50, 50)
MazeCanvas(maze.getMaze())

const visited = []

function isVisited(row, col) {
    return visited.some((e) =>
        row === e[0] &&
        col === e[1]
    )
}

function getNeighbours(row, col) {
    return maze.adjacentcells(row, col).filter((a) =>
        !maze.borderBetween(row, col, a[0], a[1])
    )
}

function findPath(row, col, toRow, toCol) {
    if (isVisited(row, col)) {
        return false
    }

    maze.placeCircle(row,col)

    if (row === toRow && col === toCol) {
        return true
    }

    visited.push([row, col])

    let n = getNeighbours(row, col)
    for (let i = 0; i < n.length; i++) {
        if (findPath(n[i][0], n[i][1], toRow, toCol)) {
            return true
        }
    }

    maze.clearCircle(row,col)
    return false
}

console.log(findPath(0, 0, 49, 49))

