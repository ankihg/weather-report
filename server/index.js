const express = require('express');
const Weatherman = require('./Weatherman');
const requestPromise = require('request-promise');

const app = express();
const weatherman = new Weatherman(process.env.owmApiKey, requestPromise);

app.get('/forecast', (req, res) => {
    console.log('butt');
    console.log(req.query);
    // TODO check query params
    res.setHeader('Content-Type', 'application/json');
    weatherman.getForecast(req.query.city, req.query.units)
        .then((resp) => {
            console.log(resp);
            res.send(JSON.stringify(resp));
        })
        .catch((err) => {
            console.log(err);
            res.status(err.code).send({message: err.message});
        });
})

app.listen(3001, () => {
    console.log('Server on port 3001');
})
