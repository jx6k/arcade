const drawRect = (context, color, rect) => {
    context.fillStyle = color

    context.fillRect(
        Math.floor(rect.x),
        Math.floor(rect.y),
        Math.ceil(rect.w),
        Math.ceil(rect.h)
    )
}

export default drawRect