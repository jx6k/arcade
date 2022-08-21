class Food {
    constructor(color, gridDimensions) {
        this.position = {
            x: Math.floor(Math.random() * gridDimensions.x),
            y: Math.floor(Math.random() * gridDimensions.y)
        }
        this.color = color

        this.gridDimensions = gridDimensions

        this.eatenCount = 0
    }

    eat(snake) {
        let foodOutsideSnake = false

        do {
            this.position.x = Math.floor(Math.random() * this.gridDimensions.x)
            this.position.y = Math.floor(Math.random() * this.gridDimensions.y)

            let foodInsideSnake = false
    
            for (let i = 0; i < snake.positions.length; i++) {
                if (this.position.x == snake.positions[i].x && this.position.y == snake.positions[i].y) {
                    foodInsideSnake = true
                }
            }

            if (foodInsideSnake == false) {  
                foodOutsideSnake = true
            }
            else {
                foodOutsideSnake = false
            }
        }
        while (foodOutsideSnake == false)

        this.eatenCount += 1
    }

    draw(context, multiplier) {
        context.fillStyle = this.color
        context.fillRect(
            Math.floor(this.position.x * multiplier),
            Math.floor(this.position.y * multiplier),
            Math.ceil(multiplier),
            Math.ceil(multiplier)
        )
    }
}

class Snake {
    constructor(color, gridDimensions) {
        this.positions = [
            { x: 4, y: 4 },
            { x: 5, y: 4 },
            { x: 6, y: 4 },
            { x: 7, y: 4 }
        ]

        this.direction = { x: 1, y: 0 }

        this.color = color

        this.gridDimensions = gridDimensions

        this.dead = false
    }

    changeDirection(newDirection) {
        const currentPosition = this.positions[this.positions.length - 1]
        const previousPosition = this.positions[this.positions.length - 2]

        const nextPosition = {
            x: currentPosition.x + newDirection.x,
            y: currentPosition.y + newDirection.y
        }

        if ( !(previousPosition.x == nextPosition.x && previousPosition.y == nextPosition.y) ) {
            this.direction.x = newDirection.x
            this.direction.y = newDirection.y
        }
    }

    update(food) {
        const oldPosition = this.positions[this.positions.length - 1]
        const newPosition = {
            x: oldPosition.x + this.direction.x,
            y: oldPosition.y + this.direction.y
        }

        let positionAlreadyOccupied = false

        for (let i = 0; i < this.positions.length; i++) {
            if (this.positions[i].x == newPosition.x && this.positions[i].y == newPosition.y) {
                positionAlreadyOccupied = true
            }
        }

        if (
            newPosition.x < 0 ||
            newPosition.y < 0 ||
            newPosition.x >= this.gridDimensions.x ||
            newPosition.y >= this.gridDimensions.y ||
            positionAlreadyOccupied == true
        ) {
            this.dead = true
        }

        this.positions.push(newPosition)

        if (newPosition.x == food.position.x && newPosition.y == food.position.y) {
            food.eat(this)
        }
        else {
            this.positions.shift()
        }
    }

    draw(context, multiplier) {
        context.fillStyle = this.color

        for (let i = 0; i < this.positions.length; i++) {
            const position = this.positions[i]

            context.fillRect(
                Math.floor(position.x * multiplier),
                Math.floor(position.y * multiplier),
                Math.ceil(multiplier),
                Math.ceil(multiplier)
            )
        }
    }
}

export { Food, Snake }