export class LevelService {
    #html;
    #options;

    #startedIndex = 0;
    #levelIndex;

    constructor(html, options) {
        this.#html = html;
        this.#options = options;

        this.#levelIndex = this.#startedIndex;
    }

    get level() {
        return this.#levelIndex + 1;
    }

    get currentOptions() {
        return this.#options[this.#levelIndex];
    }

    get first() {
        return this.#startedIndex === this.#levelIndex;
    }

    get final() {
        return this.level >= this.#options.length;
    }

    increase() {
        this.#levelIndex++;
    }

    reset() {
        this.#levelIndex = 0;
        this.#html.innerHTML = 'Start Game';
    }

    update() {
        this.#html.innerHTML = `Level: ${this.level}`;
    }
}