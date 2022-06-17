'use strict'
import { MazeCanvas } from "./canvas";
import { Maze } from "./maze"

const m = new Maze(3,3)
const mazeCanvas = new MazeCanvas(m.maze)
