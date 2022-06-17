'use strict'
import { MazeCanvas } from "./canvas";
import { Maze } from "./maze"

const maze = new Maze(3, 3)
const mazeCanvas = new MazeCanvas(maze)

function timeout(ms) {
    return new Promise((resolve) =>
        setTimeout(() => { resolve() }, ms)
    )
}

async function walk(){
    await timeout(500)
    if (maze.borderBetween(0,0,0,1)){
        maze.moveSquare(0,0,1,0)
    } else {
        maze.moveSquare(0,0,0,1)
    }
}

walk()
