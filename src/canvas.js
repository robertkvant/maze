'use strict'
const BORDER = {
    TOP: 0b00010,
    RIGHT: 0b00100,
    BOTTOM: 0b01000,
    LEFT: 0b10000
}

export class MazeCanvas {
    constructor(maze) {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.width = (500 / maze.length)
        this.maze = maze
        this.init()
    }
    // Draw a top border
    topBorder(x, y, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + width, y);
        this.ctx.stroke();
    }
    // Draw a right border
    rightBorder(x, y, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y);
        this.ctx.lineTo(x + width, y + width);
        this.ctx.stroke();
    }
    //Draw a bottom border
    bottomBorder(x, y, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + width);
        this.ctx.lineTo(x + width, y + width);
        this.ctx.stroke();
    }
    // Draw a left border
    leftBorder(x, y, width) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, y + width);
        this.ctx.stroke();
    }
    // Initialize maze
    init() {
        for (let y = 0; y < this.maze.length; y++) {
            for (let x = 0; x < this.maze[y].length; x++) {
                const xPos = x * this.width
                const yPos = y * this.width
                if (this.maze[y][x] & BORDER.TOP) {
                    this.topBorder(xPos, yPos, this.width)
                }
                if (this.maze[y][x] & BORDER.RIGHT) {
                    this.rightBorder(xPos, yPos, this.width)
                }
                if (this.maze[y][x] & BORDER.BOTTOM) {
                    this.bottomBorder(xPos, yPos, this.width)
                }
                if (this.maze[y][x] & BORDER.LEFT) {
                    this.leftBorder(xPos, yPos, this.width)
                }
            }
        }
    }
}

