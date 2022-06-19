'use strict'
import { MazeCanvas } from "./canvas";
import { Maze } from "./maze"

let maze = new Maze(30, 30)
MazeCanvas(maze.getMaze())

function timeout(ms){
    return new Promise((resolve) => 
        setTimeout(() => {resolve()}, ms)
    )
}

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

async function findPath(row, col, toRow, toCol,delay) {
    if (isVisited(row, col)) {
        return false
    }

    await timeout(delay)
    maze.placeCircle(row,col)

    if (row === toRow && col === toCol) {
        return true
    }

    visited.push([row, col])

    let n = getNeighbours(row, col)
    for (let i = 0; i < n.length; i++) {
        if (await findPath(n[i][0], n[i][1], 
                toRow, toCol,delay)) {
            return true
        }
    }

    await timeout(delay)
    maze.clearCircle(row,col)
    return false
}

const pathBtn = document.getElementById('pathBtn')
const messageDiv = document.getElementById('messageDiv')
messageDiv.innerHTML = "Find path from top left corner to bottom right corner"
pathBtn.addEventListener("click", pathBtnEventhandler)

function pathBtnEventhandler(){
    pathBtn.disabled = true
    findPath(0, 0, 29, 29,75).then((r) => {
        if(r) {
            messageDiv.innerHTML = "Path found!"
        }
    })
}
