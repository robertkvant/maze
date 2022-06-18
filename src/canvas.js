'use strict'
const BORDER = {
    TOP: 0b00010,
    RIGHT: 0b00100,
    BOTTOM: 0b01000,
    LEFT: 0b10000
}

const CIRCLE = 0b00001

export function MazeCanvas(maze) {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const width = (canvas.width / maze.length)
    window.requestAnimationFrame(draw);

    // Draw a top border
    function topBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.stroke();
    }
    // Draw a right border
    function rightBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width, y + width);
        ctx.stroke();
    }
    //Draw a bottom border
    function bottomBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x, y + width);
        ctx.lineTo(x + width, y + width);
        ctx.stroke();
    }
    // Draw a left border
    function leftBorder(x, y, width) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + width);
        ctx.stroke();
    }
    // Draw circle
    function circle(x, y) {
        ctx.fillStyle = 'rgba(255, 0, 127, 1)';
        ctx.beginPath();
        ctx.arc(x + (width / 2), y + (width / 2),
            (width / 4), 0, 2 * Math.PI);
        ctx.fill();
    }

    // Draw maze
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < maze.length; y++) {
            for (let x = 0; x < maze[y].length; x++) {
                const xPos = x * width
                const yPos = y * width
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
                if (maze[y][x] & CIRCLE) {
                    circle(xPos, yPos, width)
                }
            }
        }
        window.requestAnimationFrame(draw);
    }
}

