import { APIKEY } from "./environment.js";

let testBtn = document.getElementById('testBtn');

let dailyForcastWeatherText = document.getElementById('dailyForcastWeatherText');
let day1ForcastText = document.getElementById('day1ForcastText');
let day2ForcastText = document.getElementById('day2ForcastText');
let day3ForcastText = document.getElementById('day3ForcastText');
let day4ForcastText = document.getElementById('day4ForcastText');
let day5ForcastText = document.getElementById('day5ForcastText');

testBtn.addEventListener('click', function(){
    
    //apiCallCurrent();
    
    apiCallForcast();
})

let city = 'Lodi,US'

async function apiCallCurrent() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
    const dataCurrent = await promise.json();
    console.log(dataCurrent);
    dailyForcastWeatherText.innerText = dataCurrent.weather[0].description;
}

async function apiCallForcast() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`);
    const dataForecast = await promise.json();
    console.log(dataForecast);
    day1ForcastText.innerText = dataForecast;
        // day2ForcastText.innerText = ;
        // day3ForcastText.innerText = ;
        // day4ForcastText.innerText = ;
        // day5ForcastText.innerText = ;
    
}