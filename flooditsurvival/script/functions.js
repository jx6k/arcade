const randomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

const createGrid = (dimensions, colors, obstacles) => {
    const grid = []

    for (let x = 0; x < dimensions.x; x++) {
        grid.push([])

        const row = grid[x]
    
        for (let y = 0; y < dimensions.y; y++) {
            row.push({})

            const cell = row[y]

            cell.color = randomFromArray(colors)
            cell.collected = false

            let isBlock = false
            
            for (let i = 0; i < obstacles.length; i++) {
                if (obstacles[i].check({ x, y }) == true) {
                    isBlock = true
                }
            }

            if (isBlock == true) {
                cell.block == true
                cell.color = "#202020"
            }
            else {
                cell.block = false
            }
        }
    }

    return grid
}

const drawGrid = (grid, canvas, context) => {
    const multiplier = Math.min(
        canvas.width / grid[0].length,
        canvas.height / grid.length
    )

    for (let x = 0; x < grid.length; x++) {
        const row = grid[x]

        for (let y = 0; y < row.length; y++) {
            const cell = row[y]

            drawCell({x, y}, multiplier, cell.color, context)
        }
    }
}

const drawCell = (position, multiplier, style, context) => {
    context.fillStyle = style
    context.fillRect(
        Math.floor(position.x * multiplier),
        Math.floor(position.y * multiplier),
        Math.ceil(multiplier),
        Math.ceil(multiplier)
    )
}

const limitColors = (colors, count) => {
    const output = []

    const limit = Math.min(count, colors.length)

    for (let i = 0; i < limit; i++) {
        output.push(colors[i])
    }

    return output
}

const getExistingNeighbors = (position, grid) => {
    const neighbors = []

    // For directly adjecent only
    const offsets = [{x: 1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: 0}]


    for (let i = 0; i < offsets.length; i++) {
        const offset = offsets[i]

        const target = {
            x: position.x + offset.x,
            y: position.y + offset.y
        }

        if (
            grid[target.x] != undefined && 
            grid[target.x][target.y] != undefined
        ) {
            neighbors.push(target)
        }
    }

    return neighbors
}

const updateCollection = (collection, grid) => {
    let newCells = false

    for (let i = 0; i < collection.length; i++) {
        const cellPosition = collection[i]

        const cellNeighbors = getExistingNeighbors(cellPosition, grid)

        for (let j = 0; j < cellNeighbors.length; j++) {
            const neighborPosition = cellNeighbors[j]
            const neighbor = grid[neighborPosition.x][neighborPosition.y]

            if (
                neighbor.color == grid[0][0].color &&
                neighbor.collected == false
            ) {
                collection.push(neighborPosition)
                neighbor.collected = true
            }
        }
    }

    if (newCells == true) {
        updateCollection(collection, grid)
    }
}

const colorCollection = (collection, grid, color) => {
    for (let i = 0; i < collection.length; i++) {
        const position = collection[i]

        const cell = grid[position.x][position.y]

        cell.color = color
    }
}

const checkForVictory = (grid) => {
    let initialColor = grid[0][0].color

    for (let x = 0; x < grid.length; x++) {
        const row = grid[x]

        for (let y = 0; y < row.length; y++) {
            const cell = row[y]

            if (cell.color != initialColor && cell.block == false) {
                return false
            }
        }
    }

    return true
}

export { createGrid, drawGrid, limitColors, updateCollection, colorCollection, checkForVictory }