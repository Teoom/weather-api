import '../styles/index.css'

import {findElementByClass} from "./findElement"
import updateWeather from "./findLocation";


const getLocationBtn = document.querySelector(".location-btn")




getLocationBtn.addEventListener('click', () => {
  // ROW 1 COLUMN 1
  const locationInfo = findElementByClass('weather-city-info');
  const cityName = findElementByClass('weather-city-info__title', locationInfo);
  const elementOfTime = [...findElementByClass("weather-city-info__time", locationInfo).childNodes].find(el => el.nodeName === "#text");
  const elementOfDate = findElementByClass("weather-city-info__day", locationInfo);

  // ROW 1 COLUMN 2
  const currentWeatherBlock = findElementByClass("weather-now");
  const currentTemp = findElementByClass("wather-now__info__degree", currentWeatherBlock);
  const currentFeelsTemp = findElementByClass("wather-now__info__degree-feel span", currentWeatherBlock);
  const sunriseTime = findElementByClass("wather-now__info__sunrise-info__time", currentWeatherBlock);
  const sunsetTime = findElementByClass("wather-now__info__sunset-info__time", currentWeatherBlock);
  const humidity = findElementByClass("humidity .weather-now__description__info", currentWeatherBlock);
  const windSpeed = findElementByClass("wind-speed .weather-now__description__info", currentWeatherBlock);
  const pressure = findElementByClass("pressure .weather-now__description__info", currentWeatherBlock);
  const uv = findElementByClass("UV .weather-now__description__info", currentWeatherBlock);
  const weatherImg = findElementByClass("weather-now__img", currentWeatherBlock);
  const figcaption = findElementByClass("weather-now__figure__title", currentWeatherBlock);


  // ROW 2 COLUMN 1
  const dailyForecastList = findElementByClass("forecast-daily__list");


  // ROW 2 COLUMN 2
  const hourlyForecastList = findElementByClass("forecast-hourly__list");

  const elements = {
    locationInfo: {
      cityName,
      time: elementOfTime,
      date: elementOfDate

    },
    currentWeather: {
      temp: currentTemp,
      feelsTemp: currentFeelsTemp,
      sunrise: sunriseTime,
      sunset: sunsetTime,
      weatherImg,
      figcaption,
      humidity,
      windSpeed,
      pressure,
      uv
    },
    daily: dailyForecastList,
    hourly: hourlyForecastList
  }

  updateWeather(elements);

})






