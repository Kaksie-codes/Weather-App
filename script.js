const api = {
    key: "ec76895d4982243948803ae55b09bd56",
    base: "https://api.openweathermap.org/data/2.5/"
}

window.addEventListener('load', ()=> {
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(position => {
            // console.log(position)
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            getWeather_lat_long(longitude, latitude);
         })
    }else{
        const notification = document.querySelector('.notification p');
        notification.style.display = 'block';
        notification.innerText = `Browser dosen't support geolocation`
    }
})

function getWeather_lat_long(longitude, latitude){
    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`)
    .then(weather => weather.json())
    .then(displayResults)
}

const searchbox =  document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        // console.log(searchbox.value)
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather){   
    // console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;


    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp =document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)} °c`;
    
}

function dateBuilder(d){
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
     'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}