const express = require('express');
const requestPromise = require('request-promise');
const Weatherman = require('./Weatherman');
const LocationResolver = require('./LocationResolver');

const weatherman = new Weatherman(process.env.owmApiKey, requestPromise);
const locationResolver = new LocationResolver(require('./resources/city.list.min'));
console.log(locationResolver.resolve('sea').length);
const app = express();

app.get('/forecast', (req, res) => {
    console.log('butt');
    console.log(req.query);
    // TODO check query params
    res.setHeader('Content-Type', 'application/json');
    weatherman.getForecast(req.query.city, req.query.units)
        .then((resp) => {
            console.log(resp);
            res.send(JSON.stringify(resp)); // TODO use res.json()
        })
        .catch((err) => {
            console.log(err);
            res.status(err.code).send({message: err.message}); // TODO use res.json()
        });
});

app.get('/cities', (req, res) => {
    console.log('Get cities', req.query);
    res.setHeader('Content-Type', 'application/json');
    // TODO check query params
    res.json(locationResolver.resolve(req.query.prefix));
});

app.listen(3001, () => {
    console.log('Server on port 3001');
})
