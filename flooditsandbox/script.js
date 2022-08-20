/**
 * SETUP
 */
import { createGrid, drawGrid, limitColors, updateCollection, colorCollection, checkForVictory } from "./script/functions.js";
import { colorsX } from "../script/colors.js"

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

const boardSizeSelect = document.querySelector("select#board-size")
const colorCountSelect = document.querySelector("select#color-count")
const newGameButton = document.querySelector("button#new-game")
const movesParagraph = document.querySelector("p#moves")

const dimensions = { x: boardSizeSelect.value, y: boardSizeSelect.value }

let colors = limitColors(colorsX.list, colorCountSelect.value)

let grid = createGrid(dimensions, colors)
let collection = [{ x: 0, y: 0 }]

let moves = 0
movesParagraph.innerText = moves

grid[0][0].collected = true

updateCollection(collection, grid)
drawGrid(grid, canvas, context)

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

    const newColor = grid[square.x][square.y].color
    const oldColor = grid[0][0].color

    if (newColor != oldColor) {
        colorCollection(collection, grid, newColor)
        updateCollection(collection, grid)

        moves += 1
        movesParagraph.innerText = moves
    }

    drawGrid(grid, canvas, context)

    const victory = checkForVictory(grid)

    if (victory == true) {
        movesParagraph.innerText = moves + " (you win)"
    }
})

/**
 * DROPDOWNS & BUTTONS
 */
boardSizeSelect.addEventListener("change", () => {
    const value = boardSizeSelect.value

    dimensions.x = value
    dimensions.y = value
})

colorCountSelect.addEventListener("change", () => {
    const value = colorCountSelect.value

    colors = limitColors(colorsX.list, value)
})

newGameButton.addEventListener("click", () => {
    grid = createGrid(dimensions, colors)
    collection = [{ x: 0, y: 0 }]

    moves = 0
    movesParagraph.innerText = moves

    grid[0][0].collected = true
    
    updateCollection(collection, grid)
    drawGrid(grid, canvas, context)
})