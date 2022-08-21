const background = (canvas, context, color) => {
    context.fillStyle = color
    context.fillRect(0, 0, canvas.width, canvas.height)
}

export { background }