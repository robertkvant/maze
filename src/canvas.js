'use strict'
const BORDER = {
    TOP: 0b00010,
    RIGHT: 0b00100,
    BOTTOM: 0b01000,
    LEFT: 0b10000
}

export function MazeCanvas(maze) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = (500 / maze.length)

    function topBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
    }

    function rightBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width, y + width);
        ctx.stroke();
    }

    function bottomBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x, y + width);
        ctx.lineTo(x + width, y + width);
        ctx.stroke();
    }

    function leftBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + width);
        ctx.stroke();
    }

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            xPos = x * width
            yPos = y * width
            if (maze[y][x] & BORDER.TOP) {
                topBorder(xPos, yPos, width)
            }
            if (maze[y][x] & BORDER.RIGHT) {
                rightBorder(xPos, yPos, width)
            }
            if (maze[y][x] & BORDER.BOTTOM) {
                bottomBorder(xPos, yPos, width)
            }
            if (maze[y][x] & BORDER.LEFT) {
                leftBorder(xPos, yPos, width)
            }
        }
    }
}

