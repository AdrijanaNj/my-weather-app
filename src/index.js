let now = new Date();
let p = document.querySelector("p");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let month = months[now.getMonth()];
p.innerHTML = `${day}, ${date} ${month} <br> ${hours}:${minutes} `;

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
  if (temperature < 10) {
    temperatureElement.innerHTML = `0${temperature}`;
  } else {
    temperatureElement.innerHTML = `${temperature}`;
  }
}
function searchLocation(city) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function searchCity() {
  let searchInput = document.querySelector("#search-input");

  searchLocation(searchInput.value);
}
let button = document.querySelector("#search-button");
button.addEventListener("click", searchCity);

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

searchLocation("Oslo");
