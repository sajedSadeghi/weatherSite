//Get evey necessary elements from the DOM
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const HumidityOutput = document.querySelector(".Humidity");
const windOutput = document.querySelector(".Wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

//Default city when page loads
let cityInput = "London";

// Send City Name and Get API Response Function
function fetchWeatherData(cityname) {
  let loop = true;

  function handleResponse(data) {
    // add temperature to page
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;

    // get date and time from city
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);

    // add date to page
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;

    // add name of the city to page
    nameOutput.innerHTML = data.location.name;

    // get corresponding icon for weather
    const iconId = data.current.condition.icon.substr(
      "//cdn.weatherapi.com/weather/64x64/".length
    );

    // reformat icon url and add to page
    icon.src = "./icons/" + iconId;

    // add weather details to page
    cloudOutput.innerHTML = data.current.cloud + "%";
    HumidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.wind_kph + "km/h";

    // set default time of day
    let timeOfDay = "day";

    // get unique id for wheather condition
    const code = data.current.condition.code;

    // change theme to night if it's night
    if (!data.current.is_day) {
      timeOfDay = "night";
    }

    if (code == 1000) {
      // set back image to clear
      app.style.backgroundImage = `url(./assets/img/${timeOfDay}/clear.jpg)`;

      //change button back color
      btn.style.background = "#e5ba92";
      if (timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }
    // set back image to cloudy
    else if (
      code == 1003 ||
      code == 1006 ||
      code == 1009 ||
      code == 1030 ||
      code == 1069 ||
      code == 1087 ||
      code == 1135 ||
      code == 1273 ||
      code == 1276 ||
      code == 1279 ||
      code == 1282
    ) {
      app.style.backgroundImage = `url(./assets/img/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = "#fa6d1b";
      if (timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }
    // set back image to rainy
    else if (
      code == 1063 ||
      code == 1069 ||
      code == 1072 ||
      code == 1150 ||
      code == 1153 ||
      code == 1180 ||
      code == 1183 ||
      code == 1186 ||
      code == 1189 ||
      code == 1192 ||
      code == 1195 ||
      code == 1204 ||
      code == 1207 ||
      code == 1240 ||
      code == 1243 ||
      code == 1246 ||
      code == 1249 ||
      code == 1252
    ) {
      app.style.backgroundImage = `url(./assets/img/${timeOfDay}/rainy.jpg)`;
      btn.style.background = "#647d75";
      if (timeOfDay == "night") {
        btn.style.background = "#325c80";
      }
    }
    // set back image to snowy
    else {
      app.style.backgroundImage = `url(./assets/img/${timeOfDay}/snowy.jpg)`;
      btn.style.background = "#4d72aa";
      if (timeOfDay == "night") {
        btn.style.background = "#1b1b1b";
      }
    }

    app.style.opacity = "1";
  }

  function fetchData() {
    $.post("./backend.php", { city: cityname }, function (data) {
      console.log(data);
    }).done((data) => {
      try {
        handleResponse(data);
      } catch (error) {
        alert(data);
      }
      loop = false;

    });
  }

  fetchData();

  // use setInterval to periodically fetch the data until it is successful
  const intervalId = setInterval(function () {
    if (!loop) {
      clearInterval(intervalId);
    } else {
      fetchData();
    }
  }, 1000);
}

//Add click event to each city in the panel

for (let i = 0; i < cities.length; i++) {
  cities[i].addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;

    // clear previous inteval
    try {
      clearInterval(intervalData);
    } catch (error) {}

    // Get data from API
    fetchWeatherData(cityInput);
    const intervalData = setInterval(() => {
      fetchWeatherData(cityInput);
    }, 60000);

    app.style.opacity = "0";
  });
}

//Add submit event to the form

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("please type in a city name");
  } else {
    cityInput = search.value;

    // clear previous inteval
    try {
      clearInterval(intervalData);
    } catch (error) {}

    // Get data from API
    fetchWeatherData(cityInput);

    search.value = "";
    app.style.opacity = "0";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// update data every 60 sec
const intervalData = setInterval(() => {
  fetchWeatherData(cityInput);
}, 60000);

app.style.opacity = "1";
