function Ship(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
}

Ship.prototype.hit = function() {
    this.hits++;
}

Ship.prototype.isSunk = function() {
    this.sunk = this.hits == this.length;
    return this.hits == this.length;
}

export {Ship};