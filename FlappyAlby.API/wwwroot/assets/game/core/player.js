export class Player {
    #area;
    #height;
    #width;

    #block;
    #map = {};

    constructor(area, coordinate, steps) {
        this.#area = area;
        this.#height = area.coordinate.height;
        this.#width = area.coordinate.width;

        this.#block = area.add(coordinate, 'player');
        
        document.onkeyup = e => this.#map[e.keyCode] = false;
        document.onkeydown = e => this.#map[e.keyCode] = true;
        
        this.#animate(steps)
    }

    get coordinate() {
        return this.#block.coordinate;
    }

    dispose() {
        this.#area.remove(this.#block);
    }
    
    
    #animate(steps) {

        if(this.#map[38]) {
            if (this.coordinate.top > 0) {
                this.#block.moveTop(steps);
            }
        }

        if(this.#map[39]) {
            if (this.coordinate.left < this.#width - this.coordinate.width) {
                this.#block.moveRight(steps);
            }
        }

        if(this.#map[40]) {
            if (this.coordinate.top < this.#height - this.coordinate.height) {
                this.#block.moveBottom(steps);
            }
        }


        if(this.#map[37]) {
            if (this.coordinate.left > 0) {
                this.#block.moveLeft(steps);
            }
        }
        
        window.requestAnimationFrame(_ => this.#animate(steps));
    }
}