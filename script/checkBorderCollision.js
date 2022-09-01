const checkBorderCollision = (target, borders) => {
    const collisions = {
        left: false,
        top: false,
        right: false,
        bottom: false
    }

    let collided = false

    if (target.x < borders.x.min) {
        collisions.left = true
    }
    if (target.y < borders.y.min) {
        collisions.top = true
    }
    if (target.x + target.w > borders.x.max) {
        collisions.right = true
    }
    if (target.y + target.h > borders.y.max) {
        collisions.bottom = true
    }

    if (
        collisions.left == true ||
        collisions.top == true ||
        collisions.right == true ||
        collisions.bottom == true
    ) {
        collided = true
    }

    return {collided, collisions}
}

export default checkBorderCollision