//Get evey necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const HumidityOutput = document.querySelector('.Humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//Default city when page loads
let cityInput = "London";

//Add click event to each city in the panel
for (let i = 0; i < cities.length; i++) {

    cities[i].addEventListener('click', (e) => {

        cityInput = e.target.innerHTML;
        
        // Get data from API
        //fetchweatherdata();

        app.style.opacity = "0";
    })
}


//Add submit event to the form
form.addEventListener("submit", (e) => {
    if (search.value.length == 0) {
        alert("please type in a city name")
    }else{
        cityInput = search.value;

        // Get data from API
        //fetchweatherdata();

        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
})

function dayOfTheWeek(day,month,year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return weekday[new Date("${day}/${month}/${year}").getDay()];
}

