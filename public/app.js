// app.js
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const locationLabel = document.querySelector('.location-label');
const notFound = document.querySelector('.not-found');
const errorMessage = document.querySelector('.error-message');

// Oversettelsestabell
const weatherDescriptions = {
    'clear sky': 'klar himmel',
    'few clouds': 'noen skyer',
    'scattered clouds': 'spredte skyer',
    'broken clouds': 'delvis skyet',
    'shower rain': 'byge med regn',
    'rain': 'regn',
    'thunderstorm': 'tordenvær',
    'snow': 'snø',
    'mist': 'tåke',
    'haze': 'dis',
    'fog': 'tåke',
    'dust': 'støv',
    'sand': 'sand',
    'ash': 'aske',
    'squall': 'squall',
    'tornado': 'tornado'
};

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    } else {
        showError('Vennligst skriv inn et bynavn');
    }
});

function fetchWeather(city) {
    fetch(`/weather?city=${city}`)
        .then(response => response.json())
        .then(data => {
            handleWeatherData(data);
        })
        .catch(() => {
            showError('Noe gikk galt ved henting av værdata');
        });
}

function handleWeatherData(data) {
    if (data.cod === '404') {
        notFound.style.display = 'block';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        locationLabel.style.display = 'none';
        return;
    }

    notFound.style.display = 'none';
    weatherBox.style.display = 'block';
    weatherDetails.style.display = 'flex';
    locationLabel.style.display = 'block';

    const image = weatherBox.querySelector('img');
    const temperature = weatherBox.querySelector('.temperature');
    const description = weatherBox.querySelector('.description');
    const humidity = weatherDetails.querySelector('.humidity span');
    const wind = weatherDetails.querySelector('.wind span');

    switch (data.weather[0].main) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;
        case 'Rain':
            image.src = 'images/rain.png';
            break;
        case 'Snow':
            image.src = 'images/snow.png';
            break;
        case 'Clouds':
            image.src = 'images/cloud.png';
            break;
        case 'Haze':
            image.src = 'images/mist.png';
            break;
        default:
            image.src = 'images/404.png'; // Default image if no match
    }

    // Bruk oversettelsestabellen
    const weatherCondition = data.weather[0].description;
    description.innerHTML = weatherDescriptions[weatherCondition] || weatherCondition;

    temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
    locationLabel.innerHTML = `Sted: ${data.name}, ${data.sys.country}`;
}

function showError(message) {
    errorMessage.textContent = message;
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    locationLabel.style.display = 'none';
    notFound.style.display = 'none';
}
