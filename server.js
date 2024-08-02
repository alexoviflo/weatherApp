const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

// Server statiske filer fra public-mappen
app.use(express.static('public'));

app.get('/weather', (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.status(500).json({ error: 'Failed to fetch weather data' }));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
