/**
 * IMPORTS
 */
import drawBackground from "../script/art/drawBackground.js"

import ArrowKeys from "../script/elementals/ArrowKeys.js"

import Snake from "../script/characters/Snake.js"
import SnakeFood from "../script/characters/snakeFood.js"


/**
 * DOCUMENT SETUP
 */
const resize = () => {
    const size = Math.min(window.innerWidth * 0.75, window.innerHeight * 0.75)
    canvas.width = size
    canvas.height = size
}

const score = document.querySelector(".header__item--score")

const info = {
    overlay: document.querySelector(".overlay"),
    title: document.querySelector("h1.info__title"),
    subtitle: document.querySelector("h2.info__subtitle"),
    pause: () => {
        info.title.innerText = "paused"
        info.subtitle.innerText = "press space to unpause"
        info.overlay.style.backgroundColor = "#101010c0"
    },
    death: () => {
        info.title.innerText = "you died"
        info.subtitle.innerText = "press any key to respawn"
        info.overlay.style.backgroundColor = "#101010c0"
    },
    empty: () => {
        info.title.innerText = ""
        info.subtitle.innerText = ""
        info.overlay.style.backgroundColor = "#00000000"
    }
}

const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

resize()


/**
 * GAME SETUP
 */
let paused = false

const borders = { x: { min: 0, max: 24 }, y: { min: 0, max: 24 } }

const restart = () => {
    snake = new Snake()
    snakeFood = new SnakeFood()

    snake.informBorders(borders)
    snakeFood.informBorders(borders)

    snakeFood.teleport(snake)
}

// elemental setup
const keys = new ArrowKeys()

document.addEventListener("keydown", (event) => {
    if (snake.dead == true) { restart() }
    else if (event.code == "Space") {
        if (paused == true) {
            paused = false
            info.empty()
        }
        else if (paused == false) {
            paused = true
            info.pause()
        }
    }
    else if (paused == false) {
        const direction = keys.keydown(event)
        snake.changeDirection(direction)
    }
})

window.addEventListener("resize", () => {
    resize()
})

// character setup
let snake = new Snake()
let snakeFood = new SnakeFood()

snake.informBorders(borders)
snakeFood.informBorders(borders)

snakeFood.teleport(snake)

/**
 * GAME LOOP
 */
let tick = 110

setInterval(() => {
    if (paused == false && snake.dead == false) { snake.updatePosition(snakeFood) }
    
    if (snake.dead == true && info.title.innerText != "you died") { info.death() }
    else if (snake.dead == false && info.title.innerText == "you died") { info.empty() }

    if (score.innerText != "score: " + snake.score) {
        score.innerText = "score: " + snake.score
    }

    tick -= 1

    drawBackground(canvas, context, "#101010")
    snake.draw(canvas, context)
    snakeFood.draw(canvas, context)
}, tick)