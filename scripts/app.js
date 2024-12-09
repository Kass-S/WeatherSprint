import { APIKEY } from "./environment.js";

let testBtn = document.getElementById('testBtn');

testBtn.addEventListener('click', function(){
    apiCallCurrent();
    apiCallForcast();
})

function apiCallCurrent() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=38.1341&lon=-121.2722&appid=${APIKEY}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}

function apiCallForcast() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=38.1341&lon=-121.2722&appid=${APIKEY}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data);
    })
}