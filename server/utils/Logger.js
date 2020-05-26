module.exports = class Logger {
    log() {
        console.log(...arguments);
    }
    warn() {
        console.warn(...arguments);
    }
    err() {
        console.error(...arguments);
    }
}
