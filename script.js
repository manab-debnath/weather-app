const apiKey = '888fe44758a441342c1bed8b8c0c5eac';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

let searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');



/* function activatePlacesSearch() {
    let searchBox = document.querySelector('.search input');
    let autoComplete = new google.maps.places.AutoComplete(searchBox);

}

async function autoSuggestion()   {
    const response = await fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyDkcbVe8MBeabjDNXnBo53D8Hr3soZLL4Q&loading=async&libraries=places&callback=activatePlacesSearch')

    const log =  await response.json();

    console.log(log);
}
 */


async function checkWeather(city)   {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status === 404) {
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }
    else    {
        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
        document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
        document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;


        if(data.weather[0].main === "Clouds")   {
            weatherIcon.src = 'images/clouds.png';
        }
        else if(data.weather[0].main === "Rain" || data.weather[0].main === "Thunderstorm")   {
            weatherIcon.src = 'images/rain.png';
        }
        else if(data.weather[0].main === "Snow")   {
            weatherIcon.src = 'images/snow.png';
        }
        else if(data.weather[0].main === "Clear")   {
            weatherIcon.src = 'images/clear.png';
        }
        else if(data.weather[0].main === "Drizzle")   {
            weatherIcon.src = 'images/drizzle.png';
        }
        else if(data.weather[0].main === "Mist")   {
            weatherIcon.src = 'images/mist.png';
        }

        document.querySelector('.weather').style.display = 'block';
        document.querySelector('.error').style.display = 'none';
    }
}



searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});
searchBox.addEventListener('keydown', (event) => {
    if(event.key === 'Enter')
        checkWeather(searchBox.value);
});
