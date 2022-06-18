'use strict'
import { MazeCanvas } from "./canvas";
import { Maze } from "./maze"

const maze = new Maze(30, 30)
MazeCanvas(maze.maze)

// function timeout(ms) {
//     return new Promise((resolve) =>
//         setTimeout(() => { resolve() }, ms)
//     )
// }

// async function walk(){
//     await timeout(500)
//     if (maze.borderBetween(0,0,0,1)){
//         maze.moveCircle(0,0,1,0)
//     } else {
//         maze.moveCircle(0,0,0,1)
//     }
// }

// walk()





