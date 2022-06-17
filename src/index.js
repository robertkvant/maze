'use strict'
import { MazeCanvas } from "./canvas";
import { GenerateMaze } from "./generator"

const maze = GenerateMaze(3,3)
const mazeCanvas = MazeCanvas(maze)
