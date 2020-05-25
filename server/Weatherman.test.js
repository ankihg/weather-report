const Weatherman = require('./Weatherman');
const apiKey = 'mock-api-key';

test('successfully make request to weather service', (done) => {
    const openweathermapResponse = {
        coord: { lon: -122.33, lat: 47.61 },
        weather: [ { id: 500, main: 'Rain', description: 'light rain', icon: '10d' } ],
        base: 'stations',
        main: { temp: 59.32,
            feels_like: 57.87,
            temp_min: 57.2,
            temp_max: 61,
            pressure: 1008,
            humidity: 82 },
        visibility: 16093,
        wind: { speed: 4.7, deg: 90 },
        rain: { '1h': 0.34 },
        clouds: { all: 90 },
        dt: 1589669668,
        sys:{ type: 1,
            id: 3417,
            country: 'US',
            sunrise: 1589632199,
            sunset: 1589686899 },
        timezone: -25200,
        id: 5809844,
        name: 'Seattle',
        cod: 200 };

  const makeHttpRequest = function() {
      return new Promise((resolve, reject) => {
          resolve(JSON.stringify(openweathermapResponse));
      });
  }

  const weatherman = new Weatherman(apiKey, makeHttpRequest);
  weatherman.getForecast('seattle', 'metric')
    .then((resp) => {
        expect(resp.forecast.desc).toBe('light rain');
        expect(resp.forecast.temp.now).toBe(59.32);
        expect(resp.forecast.temp.min).toBe(57.2);
        expect(resp.forecast.temp.max).toBe(61);

        expect(resp.forecast.humidity).toBe(82);
        expect(resp.forecast.windSpeed).toBe(4.7);

        expect(resp.location.coordinates).toStrictEqual([-122.33, 47.61]);
        expect(resp.location.city).toBe('Seattle');
        expect(resp.location.country).toBe('US');

        return done();
    });
});

test('fail gracefully when city not found', (done) => {
    const openweathermapError = {cod: 404, message: 'city not found' };

    const makeHttpRequest = function() {
        return new Promise((resolve, reject) => {
            const resp = { error: JSON.stringify(openweathermapError) }
            reject(resp);
        });
    }

    const weatherman = new Weatherman(apiKey, makeHttpRequest);
    weatherman.getForecast('seattle', 'metric')
        .catch((resp) => {
            expect(resp.code).toBe(404);
            expect(resp.message).toBe('city not found');
            return done();
        });
});

test('fail gracefully on unknown error', (done) => {
    const makeHttpRequest = function() {
        return new Promise((resolve, reject) => {
            reject(null);
        });
    }

    const weatherman = new Weatherman(apiKey, makeHttpRequest);
    weatherman.getForecast('seattle', 'metric')
        .catch((resp) => {
            expect(resp.code).toBe(500);
            expect(resp.message).toBe('Error retrieving weather data');
            return done();
        });
});
