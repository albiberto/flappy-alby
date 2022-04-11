export class Stopwatch {
    #final = 10000;
    #advancement = 0;
    #total = 0;

    #start;
    #stop;

    #previous;
    #current;

    get final() {
        return new Date(this.#stop - this.#start);
    }

    get total() {
        return this.#total;
    }

    get percentage() {
        return this.#advancement / this.#final;
    }

    get over() {
        return (this.#final - this.#advancement) < 0;
    }

    start(final) {
        this.#final = final;
        this.#start = new Date();
    }

    lap() {
        this.#reset();
        this.#advancement = 0;
    }

    stop() {
        this.#reset();
    }

    detect(timestamp, speed) {
        this.#previous = this.#current || timestamp;
        this.#current = timestamp;

        const delta = this.#current - this.#previous;
        this.#advancement += delta + (speed - 1) * 10;
    }

    #reset() {
        this.#stop = new Date();
        this.#total += this.#stop - this.#start;
        this.#current = undefined;
        this.#previous = undefined;
    }
}
