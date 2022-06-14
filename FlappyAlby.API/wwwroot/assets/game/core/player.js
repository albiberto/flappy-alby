export class Player {
    #area;
    #height;
    #width;

    #block;
    #map = {
        left: "ArrowLeft",
        bottom : "ArrowDown",
        right: "ArrowRight",
        top: "ArrowUp",
    };

    constructor(area, coordinate, steps) {
        this.#area = area;
        this.#height = area.coordinate.height;
        this.#width = area.coordinate.width;

        this.#block = area.add(coordinate, 'player');
        
        document.onkeyup = e => this.#map[e.key] = false;
        document.onkeydown = e => this.#map[e.key] = true;
        
        document.getElementById("left").onpointerdown = e => this.#map[this.#map.left] = true;
        document.getElementById("left").onpointerup = e => this.#map[this.#map.left] = false;
        
        document.getElementById("top").onpointerdown = e => this.#map[this.#map.top] = true;
        document.getElementById("top").onpointerup = e => this.#map[this.#map.top] = false;
        
        document.getElementById("right").onpointerdown = e => this.#map[this.#map.right] = true;
        document.getElementById("right").onpointerup = e => this.#map[this.#map.right] = false;
       
        document.getElementById("bottom").onpointerdown = e => this.#map[this.#map.bottom] = true;
        document.getElementById("bottom").onpointerup = e => this.#map[this.#map.bottom] = false;
        
        this.#animate(steps)
    }

    get coordinate() {
        return this.#block.coordinate;
    }

    dispose() {
        this.#area.remove(this.#block);
    }
    
    
    #animate(steps) {

        if(this.#map[this.#map.top]) {
            if (this.coordinate.top > 0) {
                this.#block.moveTop(steps);
            }
        }

        if(this.#map[this.#map.right]) {
            if (this.coordinate.left < this.#width - this.coordinate.width) {
                this.#block.moveRight(steps);
            }
        }

        if(this.#map[this.#map.bottom]) {
            if (this.coordinate.top < this.#height - this.coordinate.height) {
                this.#block.moveBottom(steps);
            }
        }


        if(this.#map[this.#map.left]) {
            if (this.coordinate.left > 0) {
                this.#block.moveLeft(steps);
            }
        }
        
        window.requestAnimationFrame(_ => this.#animate(steps));
    }
}