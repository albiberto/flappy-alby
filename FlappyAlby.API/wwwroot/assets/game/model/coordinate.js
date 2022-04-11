export class Coordinate {
    constructor(top = 0, left = 0, height = 40, width = 40) {
        this.top = Math.floor(top);
        this.left = Math.floor(left);
        this.height = Math.floor(height);
        this.width = Math.floor(width);
    }

    clone = () => new Coordinate(this.top, this.left, this.height, this.width);

    moveTop = step => this.top -= step;
    moveRight = step => this.left += step;
    moveBottom = step => this.top += step;
    moveLeft = step => this.left -= step;

    intersect(c) {
        let result =
            this.left + this.width < c.left
            || c.left + c.width < this.left
            || this.top + this.height < c.top
            || c.top + c.height < this.top

        return !result;
    }
}