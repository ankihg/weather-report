const express = require('express');
const requestPromise = require('request-promise');

const Weatherman = require('./Weatherman');
const LocationResolver = require('./LocationResolver');
const Logger = require('./utils/Logger');

const logger = new Logger();
const weatherman = new Weatherman(process.env.owmApiKey, logger, requestPromise);
const locationResolver = new LocationResolver(require('./resources/city.list.min'));
const app = express();

// Simple middleware to log request and set content-type as application/json
app.use((req, res, next) => {
    logger.log(`Request received for ${req.url}`);
    res.setHeader('Content-Type', 'application/json');
    return next();
});

// Handler to get forecast for a city
app.get('/forecast', (req, res) => {
    if (!req.query.city) {
        logger.warn('Empty `city` param on /forecast request');
        return res.status(400).send({message: 'Please specify a city to see its forecast'});
    }

    return weatherman.getForecast(req.query.city, req.query.units)
        .then((resp) => {
            logger.log(`Responding to client in success for /forecast request`);
            res.json(resp);
        })
        .catch((err) => {
            logger.warn(`Responding to client in error for /forecast request: (${err.code}) ${err.message}`);
            res.status(err.code).json({message: err.message});
        });
});

// Handler to get a list of cities matching a n-char prefix
app.get('/cities', (req, res) => {
    if (!req.query.prefix) {
        logger.warn('Empty `prefix` param on /cities request');
        return res.status(400).send({message: 'Please specify a prefix to get matching city names'});
    }

    const suggestedCities = locationResolver.resolve(req.query.prefix || '') || [];
    logger.log(`Responding to client with ${suggestedCities.length} matches for prefix '${req.query.prefix}'`);
    return res.json(suggestedCities);
});

// Start listen on PORT 3001
app.listen(3001, () => {
    logger.log('Server on port 3001');
})
