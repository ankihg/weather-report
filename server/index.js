const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/plz', (req, res) => {
    console.log('butt');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ happycat: `buttdump` }));
})

app.listen(3001, () => {
    console.log('Server on port 3001');
})
