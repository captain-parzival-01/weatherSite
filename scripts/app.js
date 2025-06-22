const searchBtn = document.querySelector("#js-search-btn");

const inputCity = document.querySelector("#cityNameInput");
const dateText = document.querySelector("#dateText");
const cityNameText = document.querySelector("#cityName");
const weatherImg = document.querySelector("#weatherImg");
const weatherText = document.querySelector("#weatherText");
const weatherTempText = document.querySelector("#weatherTempText");
const highestTemp = document.querySelector("#highestTempText");
const lowestTemp = document.querySelector("#lowestTempText");

let date = new dayjs();

searchBtn.addEventListener("click", () => {
  getWeatherData();
});
inputCity.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && inputCity.value !== null || undefined) {
    getWeatherData();
    
  }
});

async function getWeatherData() {
  inputCity.blur()
  
  let cityName = inputCity.value;
  
  let fetchData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      cityName || "Dhaka"
    }&appid=4fa744968212805aba43213504b39bd1&units=metric`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  let weather = await fetchData.json();

  dateText.textContent = date.format("dddd, D MMMM YYYY");
  cityNameText.textContent = weather.name;
  weatherImg.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  weatherText.textContent = weather.weather[0].main;
  weatherTempText.textContent = `${Math.floor(weather.main.temp)}°C`;
  highestTemp.textContent = `${weather.main.temp_max}°C`;
  lowestTemp.textContent = `${weather.main.temp_min}°C`;

}

window.addEventListener("DOMContentLoaded", getWeatherData);
