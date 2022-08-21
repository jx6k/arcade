/**
 * SETUP
 */
import { createGrid, drawGrid, limitColors, updateCollection, colorCollection, checkForVictory } from "./script/functions.js";
import { colorsX } from "../script/colors.js"

import levels from "./script/levels.js"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const levelParagraph = document.querySelector("p#level")
const dialogueParagraph = document.querySelector("p#dialogue")
const movesParagraph = document.querySelector("p#moves")

let colors
let grid
let collection

let currentLevel = 0
let movesAllowed

const startLevel = (level) => {
    const dimensions = { x: level.gridDiameter, y: level.gridDiameter }

    colors = limitColors(colorsX.list, level.colorCount)
    grid = createGrid(dimensions, colors, level.obstacles)
    collection = [level.startPosition]

    grid[level.startPosition.x][level.startPosition.y].collected = true
    
    updateCollection(collection, grid)
    drawGrid(grid, canvas, context)

    movesAllowed = level.movesAllowed

    levelParagraph.innerText = currentLevel + 1
    movesParagraph.innerText = movesAllowed
}

startLevel(levels[0])

/**
 * RESIZE
 */
const sizeCanvas = () => {
    const size = Math.min(
        window.innerWidth * 0.65,
        window.innerHeight * 0.65
    )

    canvas.width = size
    canvas.height = size

    drawGrid(grid, canvas, context)
}

sizeCanvas()

window.addEventListener("resize", () => {
    sizeCanvas()
})

/**
 * CLICK
 */
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect()
    const canvasScale = canvas.width / rect.width
    const mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top}
    const multiplier = Math.min(canvas.width / grid[0].length, canvas.height / grid.length)
    const square = { x: Math.floor(mouse.x / multiplier * canvasScale), y: Math.floor(mouse.y / multiplier * canvasScale) }

    const cell = grid[square.x][square.y]

    const newColor = cell.color
    const oldColor = grid[0][0].color

    if (newColor != oldColor && cell.block == false && movesAllowed > 0) {
        colorCollection(collection, grid, newColor)
        updateCollection(collection, grid)

        movesAllowed -= 1
        movesParagraph.innerText = movesAllowed
    }

    drawGrid(grid, canvas, context)

    const victory = checkForVictory(grid)

    if (victory == true) {
        if (levels[currentLevel + 1] != undefined) {
            currentLevel += 1

            startLevel(levels[currentLevel])
        }
        else {
            dialogueParagraph.innerText = "you win! click to play again"
        }
    }
    else if (movesAllowed == 0) {
        dialogueParagraph.innerText = "you lose. click to restart"
    }
})

dialogueParagraph.addEventListener("click", () => {
    currentLevel = 0
    startLevel(levels[0])
    
    dialogueParagraph.innerText = ""
})