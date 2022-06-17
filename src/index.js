'use strict'
import { MazeCanvas } from "./canvas";
import { GenerateMaze } from "./generator"

const maze = GenerateMaze(24,24)
const mazeCanvas = MazeCanvas(maze)
