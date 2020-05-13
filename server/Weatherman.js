const requestPromise = require('request-promise');

module.exports = class Weatherman {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    getForecast(location) {
        return new Promise((resolve, reject) => {
            requestPromise(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${this.apiKey}`)
                .then((forecast) => {
                    resolve(forecast)
                })
                .catch((err) => {
                    console.log(err);
                    reject('nay')
                });
        });

    }
}
