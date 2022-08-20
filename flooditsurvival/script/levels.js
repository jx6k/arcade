import { CircleObstacle, BoxObstacle, InvertedCircleObstacle, InvertedBoxObstacle } from "./obstacles.js"

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const levels = []
const count = 32

for (let i = 0; i < count; i++) {
    const level = {}

    level.startPosition = { x: 0, y: 0 }
    level.gridDiameter = i + 4
    level.colorCount = random(
        Math.min(Math.floor(i * 0.2 + 3), 5),
        Math.min(Math.floor(i * 0.4 + 4), 10)
    )

    level.obstacles = []

    if (level.gridDiameter > 10 && Math.random() < 0.4) {
        if (Math.random() < 0.5) {
            level.obstacles.push(
                new CircleObstacle({ x: level.gridDiameter * 0.5 - 0.5, y: level.gridDiameter * 0.5 - 0.5 }, Math.floor(level.gridDiameter * 0.35))
            )
        }
        else {
            level.obstacles.push(
                new BoxObstacle({ x: level.gridDiameter * 0.5 - 0.5, y: level.gridDiameter * 0.5 - 0.5 }, Math.floor(level.gridDiameter * 0.35))
            )
        }
    }

    level.movesAllowed = Math.ceil((level.gridDiameter ** 0.95 * level.colorCount ** 1.05 * 0.35 + 2))

    levels.push(level)
}

export default levels