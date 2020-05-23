const querystring = require('querystring');

module.exports = class Weatherman {
    constructor(apiKey, makeHttpRequest) {
        this.apiKey = apiKey;
        this.makeHttpRequest = makeHttpRequest;
    }
    getForecast(location, units='imperial') {
        return new Promise((resolve, reject) => {
            const queryParams = { q: location, units: units, };
            const reqUrl = `http://api.openweathermap.org/data/2.5/weather?${querystring.stringify(queryParams)}`;
            console.log(`Making request to OWM: ${reqUrl}`);
            this.makeHttpRequest(`${reqUrl}&appid=${this.apiKey}`)
                .then((json) => JSON.parse(json))
                .then((resp) => {
                    console.log(resp);
                    resolve({
                        location: {
                            city: resp.name,
                            country: resp.sys.country,
                            coordinates: [resp.coord.lon, resp.coord.lat],
                        },
                        forecast: {
                            desc: resp.weather[0] && resp.weather[0].description,
                            temp: {
                                now: resp.main.temp,
                                min: resp.main.temp_min,
                                max: resp.main.temp_max,
                            }
                        }
                    });
                })
                .catch((resp) => {
                    if (!(resp && resp.error))
                        return reject({code: 500, message: 'Error retrieving weather data'});
                    const err = JSON.parse(resp.error);
                    return reject({code: err.cod, message: err.message})
                });
        });

    }
}
