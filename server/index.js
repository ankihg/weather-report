const express = require('express');

const app = express();

app.get('/plz', (req, res) => {
    console.log('sup');
})

app.listen(3001, () => {
    console.log('Server on port 3001');
})
