export class Option {
    #step;
    #playerStep;
    #finalTime;
    #coordinate;

    constructor(coordinate, step = 1, playerStep = 5, finalTime = 1000) {
        this.#coordinate = coordinate;

        this.#step = step;
        this.#playerStep = playerStep;
        this.#finalTime = finalTime;
    }

    get steps() {
        return this.#step;
    }

    get playerSteps() {
        return this.#playerStep;
    }

    get finalTime() {
        return this.#finalTime;
    }

    get coordinate() {
        return this.#coordinate.clone();
    }
}