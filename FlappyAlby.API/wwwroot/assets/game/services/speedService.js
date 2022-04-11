export class SpeedService {
    #html;
    #coordinate;

    #speed = 0;

    constructor(html, coordinate) {
        this.#html = html;
        this.#coordinate = coordinate;
    }

    get speed() {
        return this.#speed;
    }

    start() {
        this.#speed = 0;
        this.#update();
    }

    stop() {
        this.#speed = 0;
        this.#update();
    }

    calculate(player) {
        const middle = player.left + player.width / 2;

        if (middle < Math.floor(this.#coordinate.width / 3)) {
            this.#speed = 1;
        } else if (middle < Math.floor(this.#coordinate.width / 3) * 2) {
            this.#speed = 2;
        } else {
            this.#speed = 3;
        }

        this.#update();
    }

    #update = () => this.#html.innerText = `${this.speed}m/s`;
}