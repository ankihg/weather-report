module.exports = class Logger {
    log() {
        console.log(...arguments);
    }
    warn() {
        console.warn(...arguments);
    }
}
