const express = require('express');
const bodyParser = require('body-parser');
var requestPromise = require('request-promise');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/plz', (req, res) => {
    console.log('butt');
    requestPromise(`http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=${process.env.owmApiKey}`)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        });

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ happycat: `buttdump` }));
})

app.listen(3001, () => {
    console.log('Server on port 3001');
})
