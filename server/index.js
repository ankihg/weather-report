const express = require('express');
const Weatherman = require('./Weatherman');

const app = express();
const weatherman = new Weatherman(process.env.owmApiKey);

app.get('/plz', (req, res) => {
    console.log('butt');

    weatherman.getForecast('Seattle')
        .then((forecast) => {
            console.log(forecast);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ happycat: `buttdump` }));
        })
        .catch((err) => {
            console.log(err);
        })
})

app.listen(3001, () => {
    console.log('Server on port 3001');
})
