'use strict'
import { MazeCanvas } from "./canvas";
import { Maze } from "./maze"

const maze = new Maze(3,3)
const mazeCanvas = new MazeCanvas(maze)
maze.walkTheMaze(0,0,0,0)