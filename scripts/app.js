import { APIKEY } from "./environment.js";
import { saveStorage, getFromStorage, saveFav, getFav, removeFromFav} from "./local.js";

let searchBar = document.getElementById("searchBar");
let favoritesIcon = document.getElementById("favoritesIcon");
let favList = document.getElementById('favList');
let getDay = document.getElementById('getDay');

let dailyForcastWeatherText = document.getElementById("dailyForcastWeatherText");

let dailyCityText = document.getElementById("dailyCityText");
let weatherIconCurrent = document.getElementById("weatherIconCurrent");
let currentTempDaily = document.getElementById("currentTempDaily");
let currentMaxTempDaily = document.getElementById("currentMaxTempDaily");
let currentMinTempDaily = document.getElementById("currentMinTempDaily");

let day1ForcastText = document.getElementById("day1ForcastText");
let day2ForcastText = document.getElementById("day2ForcastText");
let day3ForcastText = document.getElementById("day3ForcastText");
let day4ForcastText = document.getElementById("day4ForcastText");
let day5ForcastText = document.getElementById("day5ForcastText");

let weatherIconDay1 = document.getElementById("weatherIconDay1");
let weatherIconDay2 = document.getElementById("weatherIconDay2");
let weatherIconDay3 = document.getElementById("weatherIconDay3");
let weatherIconDay4 = document.getElementById("weatherIconDay4");
let weatherIconDay5 = document.getElementById("weatherIconDay5");

let forcastMaxTempDay1 = document.getElementById("forcastMaxTempDay1");
let forcastMaxTempDay2 = document.getElementById("forcastMaxTempDay2");
let forcastMaxTempDay3 = document.getElementById("forcastMaxTempDay3");
let forcastMaxTempDay4 = document.getElementById("forcastMaxTempDay4");
let forcastMaxTempDay5 = document.getElementById("forcastMaxTempDay5");

let forcastMinTempDay1 = document.getElementById("forcastMinTempDay1");
let forcastMinTempDay2 = document.getElementById("forcastMinTempDay2");
let forcastMinTempDay3 = document.getElementById("forcastMinTempDay3");
let forcastMinTempDay4 = document.getElementById("forcastMinTempDay4");
let forcastMinTempDay5 = document.getElementById("forcastMinTempDay5");

const weekdayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthArr = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let lat = '';
let lon = '';
let city = '';
navigator.geolocation.getCurrentPosition(success);

async function success(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;

  let forcast5Data = await apiCall5Forcast(lat, lon);
  let currentData = await apiCallCurrent(lat, lon);
  console.log(currentData);
  searchCity(forcast5Data, currentData);
}

searchBar.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    

    let userInput = searchBar.value.toLowerCase();
    saveStorage(userInput);
    city = userInput;
    console.log(userInput);
    searchBar.value = "";
    

    let geoData = await apiCallGro(city);

    let currentData = await apiCallCurrent(geoData[0].lat, geoData[0].lon);

    let forcast5Data = await apiCall5Forcast(geoData[0].lat, geoData[0].lon);

    searchCity(forcast5Data, currentData);
  }
});

favoritesIcon.addEventListener("click", function () {
    let favInput = searchBar.value;
    saveFav(favInput);
    loadFav()
});  

async function searchCity(forcast5Data, currentData) {

    const d = new Date();
    let day = d.getDate();
    let month = monthArr[d.getUTCMonth()];
    getDay.className = 'no-margin some-margin-top'
    getDay.innerText = 'Today is: '+ month+ ', '+ day;

  dailyCityText.innerText = currentData.name + ", " + currentData.sys.country;
  dailyForcastWeatherText.innerText = currentData.weather[0].description;
  weatherIconCurrent.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
  weatherIconCurrent.className = "justify-item";
  currentTempDaily.innerText = currentData.main.temp;
  currentMaxTempDaily.innerText = currentData.main.temp_max;
  currentMinTempDaily.innerText = currentData.main.temp_min;

  day1ForcastText.innerText = forcast5Data.list[4].weather[0].main;
  weatherIconDay1.src = `https://openweathermap.org/img/wn/${forcast5Data.list[4].weather[0].icon}@2x.png`;
  weatherIconDay1.className = "justify-item";
  forcastMaxTempDay1.innerText = forcast5Data.list[4].main.temp_max;
  forcastMinTempDay1.innerText = forcast5Data.list[4].main.temp_min;

  day2ForcastText.innerText = forcast5Data.list[12].weather[0].main;
  weatherIconDay2.src = `https://openweathermap.org/img/wn/${forcast5Data.list[12].weather[0].icon}@2x.png`;
  weatherIconDay2.className = "justify-item";
  forcastMaxTempDay2.innerText = forcast5Data.list[12].main.temp_max;
  forcastMinTempDay2.innerText = forcast5Data.list[12].main.temp_min;

  day3ForcastText.innerText = forcast5Data.list[20].weather[0].main;
  weatherIconDay3.src = `https://openweathermap.org/img/wn/${forcast5Data.list[20].weather[0].icon}@2x.png`;
  weatherIconDay3.className = "justify-item";
  forcastMaxTempDay3.innerText = forcast5Data.list[20].main.temp_max;
  forcastMinTempDay3.innerText = forcast5Data.list[20].main.temp_min;

  day4ForcastText.innerText = forcast5Data.list[28].weather[0].main;
  weatherIconDay4.src = `https://openweathermap.org/img/wn/${forcast5Data.list[28].weather[0].icon}@2x.png`;
  weatherIconDay4.className = "justify-item";
  forcastMaxTempDay4.innerText = forcast5Data.list[28].main.temp_max;
  forcastMinTempDay4.innerText = forcast5Data.list[28].main.temp_min;

  day5ForcastText.innerText = forcast5Data.list[36].weather[0].main;
  weatherIconDay5.src = `https://openweathermap.org/img/wn/${forcast5Data.list[36].weather[0].icon}@2x.png`;
  weatherIconDay5.className = "justify-item";
  forcastMaxTempDay5.innerText = forcast5Data.list[36].main.temp_max;
  forcastMinTempDay5.innerText = forcast5Data.list[36].main.temp_min;
}

async function apiCallGro(city) {
  const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIKEY}`);
  const data = await promise.json();
  console.log(data);
  return data;
}

async function apiCallCurrent(lat, lon) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`
  );
  const data = await promise.json();
  //console.log(data);
  return data;
}

async function apiCall5Forcast(lat, lon) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKEY}`
  );
  const data = await promise.json();
  //console.log(data);
  return data;
}

loadFav()
async function loadFav() {
    let localStorage =  getFav();
    favList.innerText = "";
    localStorage.map(favorites => {
        let p = document.createElement('p');
        let removeButton = document.createElement('i');
        removeButton.className = "fa-solid fa-heart fa-xl some-margin-top more-margin-top heart-icon"; 
        removeButton.addEventListener('click', () => {
            removeFromFav(favorites);
            p.remove();
    })
    
        p.innerText = favorites;
        p.addEventListener('click', function() {
            loadFav(favorites);
        })
        p.appendChild(removeButton);
        favList.appendChild(p);
    })
}



