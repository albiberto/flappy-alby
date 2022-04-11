export class PercentageService {
    #html;
    #percentage = 0;

    constructor(html) {
        this.#html = html;
    }

    get percentage() {
        return Math.trunc(this.#percentage);
    }

    start() {
        this.#percentage = 0;
        this.#update();
    }

    stop() {
        this.#percentage = this.percentage >= 100 ? 100 : this.percentage + 1;
        this.#update();
    }

    calculate(stopwatch) {
        this.#percentage = stopwatch.percentage * 100;
        this.#update();
    }

    #update = () => this.#html.innerText = `${this.percentage}%`;
}
