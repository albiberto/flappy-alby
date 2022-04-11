export const Helpers = (function () {

    // extensions methods
    Number.prototype.round2 = function () {
        return ('0' + this).slice(-2)
    }

    // static methods
    return class {
        static uuidv4 = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        static getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    }
})();
    