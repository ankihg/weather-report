const express = require('express');
const requestPromise = require('request-promise');
const Weatherman = require('./Weatherman');
const LocationResolver = require('./LocationResolver');
const Logger = require('./utils/Logger');

const weatherman = new Weatherman(process.env.owmApiKey, requestPromise);
const locationResolver = new LocationResolver(require('./resources/city.list.min'));
const logger = new Logger();
const app = express();

// Simple middleware to log request and set content-type as application/json
app.use((req, res, next) => {
    logger.log(`Request received for ${req.url}`);
    res.setHeader('Content-Type', 'application/json');
    return next();
});

app.get('/forecast', (req, res) => {
    if (!req.query.city) {
        logger.warn('Empty `city` param on forecast request');
        return res.status(400).send({message: 'Please specify a city to see its forecast'});
    }

    weatherman.getForecast(req.query.city, req.query.units)
        .then((resp) => {
            res.json(resp);
        })
        .catch((err) => {
            logger.warn(`Request to weather service errored: (${err.code}) ${err.message}`);
            res.status(err.code).json({message: err.message});
        });
});

app.get('/cities', (req, res) => {
    console.log('Get cities', req.query);
    // TODO check query params
    res.json(locationResolver.resolve(req.query.prefix || ''));
});

app.listen(3001, () => {
    console.log('Server on port 3001');
})
