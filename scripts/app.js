import { APIKEY } from "./environment.js";
//pass in city to get lat and long to then pass those in for the other functions
//do it after you get everything working

let testBtn = document.getElementById('testBtn');

let searchBar = document.getElementById('searchBar');

let dailyForcastWeatherText = document.getElementById('dailyForcastWeatherText');
let dailyCityText = document.getElementById('dailyCityText');
let weatherIconCurrent = document.getElementById('weatherIconCurrent');
let currentTempDaily = document.getElementById('currentTempDaily');
let currentMaxTempDaily = document.getElementById('currentMaxTempDaily');
let currentMinTempDaily = document.getElementById('currentMinTempDaily');

let day1ForcastText = document.getElementById('day1ForcastText');
let day2ForcastText = document.getElementById('day2ForcastText');
let day3ForcastText = document.getElementById('day3ForcastText');
let day4ForcastText = document.getElementById('day4ForcastText');
let day5ForcastText = document.getElementById('day5ForcastText');

let weatherIconDay1 = document.getElementById('weatherIconDay1');
let weatherIconDay2 = document.getElementById('weatherIconDay2');
let weatherIconDay3 = document.getElementById('weatherIconDay3');
let weatherIconDay4 = document.getElementById('weatherIconDay4');
let weatherIconDay5 = document.getElementById('weatherIconDay5');

let city = 'stockton'


searchBar.addEventListener('keydown', async function(event){
    if (event.key === "Enter") {

        let currentData = await apiCallCurrent();
        console.log(currentData);
        dailyCityText.innerText = currentData.name + ', ' + currentData.sys.country;
        dailyForcastWeatherText.innerText = currentData.weather[0].description;
        weatherIconCurrent.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`
        //weatherIconCurrent.className = '';
        currentTempDaily.innerText = currentData.main.temp;
        currentMaxTempDaily.innerText = currentData.main.temp_max;
        currentMinTempDaily.innerText = currentData.main.temp_min


        let userInput = searchBar.value.toLowerCase();
        saveStorage(userInput);
        city = userInput;
        console.log(userInput);
        searchBar.value = '';

        //let forcast5Data = await apiCall5Forcast();
        //console.log(forcast5Data);
        //day1ForcastText.innerText = forcast5Data;
        // day2ForcastText.innerText = ;
        // day3ForcastText.innerText = ;
        // day4ForcastText.innerText = ;
        // day5ForcastText.innerText = ;
    }

    
})

function saveStorage(city){

    let cityArr = getFromStorage();

    if(!cityArr.includes(city)){
        cityArr.push(city);
    }

    localStorage.setItem('Cities', JSON.stringify(cityArr));
}

function getFromStorage(){
    let StorageData = localStorage.getItem('Cities');

    if(StorageData == null){
        return [];
    }

    return JSON.parse(StorageData);
}





async function apiCallCurrent() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data);
    return data;    
}

async function apiCall5Forcast() {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data);
    return data;   
}