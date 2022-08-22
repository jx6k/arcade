import { Food, Snake } from "./script/classes.js"
import { background } from "./script/functions.js"

const restartButton = document.querySelector("button#restart")
const scoreParagraph = document.querySelector("p#score")

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

canvas.width = 512
canvas.height = 512

const foodColor = "#00FF59"
const snakeColor = "#FF00A6"
const backgroundColor = "#303030"

const gridDimensions = { x: 24, y: 24 }

let multiplier = canvas.width / gridDimensions.x

let food = new Food(foodColor, gridDimensions)
let snake = new Snake(snakeColor, gridDimensions)

let paused = false

const updateBoard = () => {
    if (snake.dead == false) {
        snake.update(food)
    }

    scoreParagraph.innerText = food.eatenCount

    background(canvas, context, backgroundColor)

    snake.draw(context, multiplier)
    food.draw(context, multiplier)
}

const sizeCanvas = () => {
    const size = Math.min(
        window.innerWidth * 0.65,
        window.innerHeight * 0.65
    )

    canvas.width = size
    canvas.height = size

    multiplier = canvas.width / gridDimensions.x

    updateBoard()
}

const restart = () => {
    food = new Food(foodColor, gridDimensions)
    snake = new Snake(snakeColor, gridDimensions)
}

sizeCanvas()

window.addEventListener("keydown", (event) => {
    if (event.code == "ArrowUp") { snake.changeDirection({ x: 0, y: -1 }) }
    else if (event.code == "ArrowDown") { snake.changeDirection({ x: 0, y: 1 }) }
    else if (event.code == "ArrowLeft") { snake.changeDirection({ x: -1, y: 0 }) }
    else if (event.code == "ArrowRight") { snake.changeDirection({ x: 1, y: 0 }) }

    else if (event.code == "KeyP") {
        if (paused == true) {
            paused = false
        }
        else {
            paused = true
        }
    }

    else if (event.code == "KeyR") {
        restart()
    }
})

window.addEventListener("resize", () => {
    sizeCanvas()
})

restartButton.addEventListener("click", restart)

setInterval(() => {
    if (paused == false) {
        updateBoard()
    }
}, 150)