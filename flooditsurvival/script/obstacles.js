class CircleObstacle {
    constructor(position, radius) {
        this.position = position
        this.radius = radius
    }

    check(target) {
        const delta = {
            x: target.x - this.position.x,
            y: target.y - this.position.y
        }
    
        const distance = Math.sqrt(delta.x ** 2 + delta.y ** 2)

        if (distance < this.radius) {
            return true
        }
        else {
            return false
        }
    }
}

class BoxObstacle {
    constructor(position, radius) {
        this.position = position
        this.radius = radius
    }

    check(target) {
        if (
            target.x < this.position.x + this.radius &&
            target.x > this.position.x - this.radius &&
            target.y < this.position.y + this.radius &&
            target.y > this.position.y - this.radius
        ) {
            return true
        }
        else {
            return false
        }
    }
}

class InvertedCircleObstacle {
    constructor(position, radius) {
        this.position = position
        this.radius = radius
    }

    check(target) {
        const delta = {
            x: target.x - this.position.x,
            y: target.y - this.position.y
        }
    
        const distance = Math.sqrt(delta.x ** 2 + delta.y ** 2)

        if (distance < this.radius) {
            return true
        }
        else {
            return false
        }
    }
}

class InvertedBoxObstacle {
    constructor(position, radius) {
        this.position = position
        this.radius = radius
    }

    check(target) {
        if (
            target.x > this.position.x + this.radius ||
            target.x < this.position.x - this.radius ||
            target.y > this.position.y + this.radius ||
            target.y < this.position.y - this.radius
        ) {
            return true
        }
        else {
            return false
        }
    }
}

export { CircleObstacle, BoxObstacle, InvertedCircleObstacle, InvertedBoxObstacle }