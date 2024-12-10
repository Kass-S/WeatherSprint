import { APIKEY } from "./environment.js";

let testBtn = document.getElementById('testBtn');

let dailyForcastWeatherText = document.getElementById('dailyForcastWeatherText');
let day1ForcastText = document.getElementById('day1ForcastText');
let day2ForcastText = document.getElementById('day2ForcastText');
let day3ForcastText = document.getElementById('day3ForcastText');
let day4ForcastText = document.getElementById('day4ForcastText');
let day5ForcastText = document.getElementById('day5ForcastText');

let weatherIconCurrent = document.getElementById('weatherIconCurrent');
let weatherIconDay1 = document.getElementById('weatherIconDay1');

testBtn.addEventListener('click', function(){
    
    apiCallCurrent();
    
    //apiCallForcast();
})

let city = 'Lodi,US'

async function apiCallCurrent() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data);
    dailyForcastWeatherText.innerText = data.weather[0].description;
    weatherIconCurrent.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}

async function apiCallForcast() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data);
    //day1ForcastText.innerText = data;
        // day2ForcastText.innerText = ;
        // day3ForcastText.innerText = ;
        // day4ForcastText.innerText = ;
        // day5ForcastText.innerText = ;
    
}