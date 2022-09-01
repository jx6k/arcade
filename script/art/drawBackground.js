import drawRect from "./drawRect.js"

const drawBackground = (canvas, context, color) => {
    drawRect(context, color, {
        x: 0,
        y: 0,
        w: canvas.width,
        h: canvas.height
    })
}

export default drawBackground