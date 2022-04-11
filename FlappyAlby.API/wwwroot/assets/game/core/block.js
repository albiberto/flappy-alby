export class Block {
    #html;
    #coordinate;

    constructor(html, coordinate) {
        this.#html = html;
        this.#coordinate = coordinate;
    }

    get html() {
        return this.#html;
    }

    get coordinate() {
        return this.#coordinate;
    }

    crash(coordinate) {
        return coordinate.intersect(this.coordinate);
    }

    moveTop(step) {
        this.#coordinate.moveTop(step);
        this.translate(this.#coordinate);
    }

    moveRight(step) {
        this.#coordinate.moveRight(step);
        this.translate(this.#coordinate);
    }

    moveBottom(step) {
        this.#coordinate.moveBottom(step);
        this.translate(this.#coordinate);
    }

    moveLeft(step) {
        this.#coordinate.moveLeft(step);
        this.translate(this.#coordinate);
    }

    reset(coordinate) {
        this.translate(coordinate);
        this.#coordinate = coordinate;
    }

    translate(coordinate) {
        this.#html.style.transform = `translateX(${coordinate.left}px) translateY(${coordinate.top}px)`;
        return this;
    }
}
