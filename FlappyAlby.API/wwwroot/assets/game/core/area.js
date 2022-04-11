import {Helpers} from '../helpers/helpers.js';
import {Coordinate} from "../model/coordinate.js";
import {Block} from "./block.js";

export class Area {
    #html;
    #coordinate;

    constructor(html) {
        this.#html = html;
        this.#coordinate = new Coordinate(0, 0, html.clientHeight, html.clientWidth);
    }

    get coordinate() {
        return this.#coordinate;
    }

    add(coordinate, id = Helpers.uuidv4()) {
        const html = document.createElement('div');

        html.classList.add('block');
        html.id = id;

        if (!coordinate instanceof Coordinate) {
            throw new Error('Invalid coordinate!');
        }

        html.style.width = `${coordinate.width}px`;
        html.style.height = `${coordinate.height}px`;

        this.#html.appendChild(html);

        return new Block(html, coordinate)
            .translate(coordinate);
    }

    remove(blocks) {

        if (blocks instanceof Block) {
            this.#html.removeChild(blocks.html);
            return;
        }

        if (blocks instanceof Array) {
            for (let block of blocks) {
                this.#html.removeChild(block.html);
            }
            return;
        }

        throw new Error('Invalid argument');
    }
}