'use strict'
const BORDER = {
    TOP: 0b00010,
    RIGHT: 0b00100,
    BOTTOM: 0b01000,
    LEFT: 0b10000
}

const SQUARE = 0b00001

export class MazeCanvas {
    constructor(maze) {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.maze = maze.maze
        maze.addObserver(this.squarePositionChanged.bind(this))
        this.width = (this.canvas.width / this.maze.length)
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

    // Clear square at position x y
    clearSquare(x, y) {
        this.ctx.clearRect(x, y,
            this.width, this.width);
    }

    // Draw a square at position x y
    square(x, y) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(x + (this.width/4), 
            y + (this.width/4), (this.width / 2), 
            (this.width / 2));
    }

    // Clear the canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0,
            canvas.width, canvas.height);
    }

    // Restore canvas state
    restoreCanvas() {
        this.ctx.restore();
    }

    // Save canvas state
    saveState() {
        this.ctx.save();
    }

    // Initialize maze
    init() {
        this.clearCanvas()
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
                if (this.maze[y][x] & SQUARE) {
                    this.square(xPos,yPos,this.width)
                }
            }
        }
    }

    // Square position has changed
    squarePositionChanged() {
        this.init()
    }
}

