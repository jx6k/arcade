import checkBorderCollision from "../checkBorderCollision.js"
import drawRect from "../art/drawRect.js"

class Snake {
    constructor() {
        this.positions = [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 },
        ]

        this.velocity = { x: 1, y: 0 }
        this.direction = "right"

        this.score = 0
        this.dead = false

        this.color = "#ffffff"
    }

    informBorders(borders) {
        this.borders = borders
    }

    updatePosition(food) {
        const lastPosition = this.positions[this.positions.length - 1]
        const newPosition = {
            x: lastPosition.x + this.velocity.x,
            y: lastPosition.y + this.velocity.y
        }

        for (let i = 0; i < this.positions.length; i++) {
            if (
                this.positions[i].x == newPosition.x &&
                this.positions[i].y == newPosition.y
            ) {
                this.dead = true
            }
        }

        this.positions.push(newPosition)

        const foodInSnake = food.checkEaten(this)

        if (foodInSnake == false) { this.positions.shift() }
        else {
            this.score += 1
            food.teleport(this)
        }

        const target = {
            x: newPosition.x,
            y: newPosition.y,
            w: 1,
            h: 1
        }

        const borders = this.borders

        const { collided } = checkBorderCollision(target, borders)

        if (collided == true) {
            this.dead = true
        }
    }

    changeDirection(direction) {
        const previousPosition = this.positions[this.positions.length - 2]
        const currentPosition = this.positions[this.positions.length - 1]
        const previousDirection = this.direction
        const previousVelocity = this.velocity

        if (direction == "left") {
            this.velocity = { x: -1, y: 0 }
            this.direction = "left"
        }

        else if (direction == "up") {
            this.velocity = { x: 0, y: -1 }
            this.direction = "up"
        }

        else if (direction == "right") {
            this.velocity = { x: 1, y: 0 }
            this.direction = "right"
        }
        
        else if (direction == "down") {
            this.velocity = { x: 0, y: 1 }
            this.direction = "down"
        }

        const nextPosition = {
            x: currentPosition.x + this.velocity.x,
            y: currentPosition.y + this.velocity.y
        }

        if (
            nextPosition.x == previousPosition.x &&
            nextPosition.y == previousPosition.y
        ) {
            this.direction = previousDirection
            this.velocity = previousVelocity
        }
    }

    draw(canvas, context) {
        const xMultiplier = canvas.width / (this.borders.x.max - this.borders.x.min)
        const yMultiplier = canvas.height / (this.borders.y.max - this.borders.y.min)

        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i]

            drawRect(context, this.color, {
                x: xMultiplier * position.x,
                y: yMultiplier * position.y,
                w: xMultiplier,
                h: yMultiplier
            })
        }
    }

    checkForLife() {
        return this.dead == false
    }
}

export default Snake