class ArrowKeys {
    constructor() {
        this.left = false
        this.up = false
        this.right = false
        this.down = false
    }

    keydown(event) {
        let direction = ""

        if (event.code == "ArrowLeft") {
            this.left = true
            direction = "left"
        }

        else if (event.code == "ArrowUp") {
            this.up = true
            direction = "up"
        }

        else if (event.code == "ArrowRight") {
            this.right = true
            direction = "right"
        }

        else if (event.code == "ArrowDown") {
            this.down = true
            direction = "down"
        }

        return direction
    }
    
    keyup(event) {
        let direction = ""

        if (event.code == "ArrowLeft") {
            this.left = false
            direction = "left"
        }

        else if (event.code == "ArrowUp") {
            this.up = false
            direction = "up"
        }

        else if (event.code == "ArrowRight") {
            this.right = false
            direction = "right"
        }

        else if (event.code == "ArrowDown") {
            this.down = false
            direction = "down"
        }

        return direction
    }
}

export default ArrowKeys