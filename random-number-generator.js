class RandomNumberGenerator {

    /**
     * @param {The maximum number to be generated (inclusive)} max 
     */
    constructor(max) {
        this.max = max;
        // generate an array with max elements and fill it with 0, 1, 2, 3... respectively
        this.array = this.#generateArray(max);
    }

    /**
     * Generate a random number between 0 (inclusive) and this.array.length (exclusive).
     */
    generate() {
        if (this.array.length == 0) {
            this.array = this.#generateArray(this.max);
        }
        let random = this.#randomInteger(0, this.array.length - 1);
        return this.array.splice(random, 1)[0];
    }

    /**
     * Returns an Integer Random Number between min (included) and max (included).
     */
    #randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #generateArray(length) {
        return Array.from({ length: length }, (_, index) => index);
    }
}