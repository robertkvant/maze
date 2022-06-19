'use strict'
import { BORDER, CIRCLE } from "./constants";

/* The MIT License (MIT)

Copyright (c) [2022] [Robert Kvant]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE */

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

