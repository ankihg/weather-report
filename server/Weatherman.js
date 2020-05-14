const requestPromise = require('request-promise');

module.exports = class Weatherman {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    getForecast(location, units='imperial') {
        return new Promise((resolve, reject) => {
            requestPromise(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${this.apiKey}`)
                .then((json) => JSON.parse(json))
                .then((resp) => {
                    console.log(resp);
                    resolve({
                        loc: {
                            city: resp.name,
                            coordinates: [resp.coord.lon, resp.coord.lat],
                        },
                        desc: resp.weather[0] && resp.weather[0].description,
                        temp: {
                            now: resp.main.temp,
                            min: resp.main.temp_min,
                            max: resp.main.temp_max,
                        }
                    })
                })
                .catch((err) => {
                    console.log(err);
                    reject('nay')
                });
        });

    }
}
