const express = require('express');
const Weatherman = require('./Weatherman');

const app = express();
const weatherman = new Weatherman(process.env.owmApiKey);

app.get('/forecast', (req, res) => {
    console.log('butt');
    console.log(req.query);
    // TODO check query params
    weatherman.getForecast(req.query.city, req.query.units)
        .then((resp) => {
            console.log(resp);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(resp));
        })
        .catch((err) => {
            console.log(err);
        })
})

app.listen(3001, () => {
    console.log('Server on port 3001');
})
