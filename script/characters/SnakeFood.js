import drawRect from "../art/drawRect.js"

class SnakeFood {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }

        this.color = "#7B00FF"
    }

    informBorders(borders) {
        this.borders = borders
    }

    teleport(snake) {
        let foodInSnake = false

        do {
            foodInSnake = false

            this.position.x = Math.floor(Math.random() * (this.borders.x.max - this.borders.x.min) + this.borders.x.min)
            this.position.y = Math.floor(Math.random() * (this.borders.y.max - this.borders.y.min) + this.borders.y.min)

            if (this.checkEaten(snake) == true) { foodInSnake = true }
        }
        while (foodInSnake == true)
    }

    checkEaten(snake) {
        let foodInSnake = false

        for (let i = 0; i < snake.positions.length; i++) {
            const position = snake.positions[i]

            if (position.x == this.position.x && position.y == this.position.y) {
                foodInSnake = true
            }
        }

        return foodInSnake
    }

    draw(canvas, context) {
        const xMultiplier = canvas.width / (this.borders.x.max - this.borders.x.min)
        const yMultiplier = canvas.height / (this.borders.y.max - this.borders.y.min)

        drawRect(context, this.color, {
            x: xMultiplier * this.position.x,
            y: yMultiplier * this.position.y,
            w: xMultiplier,
            h: yMultiplier
        })
    }
}

export default SnakeFood