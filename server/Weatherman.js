const querystring = require('querystring');

module.exports = class Weatherman {
    constructor(apiKey, logger, makeHttpRequest) {
        this.apiKey = apiKey;
        this.logger = logger;
        this.makeHttpRequest = makeHttpRequest;
    }

    getForecast(location, units='imperial') {
        return new Promise((resolve, reject) => {
            const queryParams = { q: location, units: units, };
            const reqUrl = `http://api.openweathermap.org/data/2.5/weather?${querystring.stringify(queryParams)}`;

            this.logger.log(`Requesting forecast from OpenWeatherMap: ${reqUrl}`);
            this.makeHttpRequest(`${reqUrl}&appid=${this.apiKey}`)
                .then((json) => JSON.parse(json))
                .then((resp) => {
                    this.logger.log('Forecast received from OpenWeatherMap');
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
                            },
                            humidity: resp.main.humidity,
                            windSpeed: resp.wind.speed,
                        }
                    });
                })
                .catch((resp) => {
                    this.logger.warn('Request to OpenWeatherMap for forecast errored');
                    if (!(resp && resp.error))
                        return reject({code: 500, message: 'Error retrieving weather data'});
                    const err = JSON.parse(resp.error);
                    return reject({code: err.cod, message: err.message})
                });
        });
    }
}
