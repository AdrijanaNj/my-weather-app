function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dates = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  return `${day}, ${dates} ${month} <br> ${hours}:${minutes} `;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function formatDateSunrise(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function formatDateSunset(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#week-days");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
         <div class="col days">
          <div class="week-day">${formatDay(forecastDay.dt)}</div>
          <div class="week-day-image">
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"" alt="" id="week-day-image" width="42"/>
          </div>
          <div class="maxtemp">${Math.round(forecastDay.temp.max)}°</div>
          <div class="mintemp">${Math.round(forecastDay.temp.min)}°</div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `4b3503b2f08a729413c4d33ef1186004`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  let description = document.querySelector("#current-weather");
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  if (temperature < 10) {
    temperatureElement.innerHTML = `0${temperature}`;
  } else {
    temperatureElement.innerHTML = `${temperature}`;
  }
  let dateElement = document.querySelector("p");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let sunriseElement = document.querySelector("#sunrise");
  sunriseElement.innerHTML = formatDateSunrise(
    response.data.sys.sunrise * 1000
  );
  let sunsetElement = document.querySelector("#sunset");
  sunsetElement.innerHTML = formatDateSunset(response.data.sys.sunset * 1000);

  getForecast(response.data.coord);
}
let celsiusTemperature = null;
function searchLocation(city) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchLocation(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function searchPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
let locationButton = document.querySelector("#button-location");
locationButton.addEventListener("click", getCurrentLocation);
function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchLocation("Oslo");
