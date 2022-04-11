export class Player {
    #area;
    #height;
    #width;

    #block;

    constructor(area, coordinate, steps) {
        this.#area = area;
        this.#height = area.coordinate.height;
        this.#width = area.coordinate.width;

        this.#block = area.add(coordinate, 'player');
        document.onkeydown = e => requestAnimationFrame(_ => this.#animate(e, steps));
    }

    get coordinate() {
        return this.#block.coordinate;
    }

    dispose() {
        this.#area.remove(this.#block);
    }

    #animate(e, step) {

        switch (e.keyCode) {
            // UP
            case 38:
                if (this.coordinate.top > 0) {
                    this.#block.moveTop(step);
                }
                break;
            // RIGHT
            case 39:
                if (this.coordinate.left < this.#width - this.coordinate.width) {
                    this.#block.moveRight(step);
                }
                break;

            // DOWN
            case 40:
                if (this.coordinate.top < this.#height - this.coordinate.height) {
                    this.#block.moveBottom(step);
                }
                break;

            // LEFT
            case 37:
                if (this.coordinate.left > 0) {
                    this.#block.moveLeft(step);
                }
                break;
        }
    }
}
