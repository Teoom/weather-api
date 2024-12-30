import '../styles/index.css'


import updateMainPage from "./findLocation.js";


const getLocationBtn = document.querySelector(".location-btn")




getLocationBtn.addEventListener('click', () => {
  const cityName = document.querySelector(".weather-city-info__title");
  const elementOfTime = [...document.querySelector(".weather-city-info__time").childNodes].find(el => el.nodeName === "#text");
  const elementOfData = document.querySelector(".weather-city-info__day");


  updateMainPage({ cityName: cityName, time: elementOfTime, data: elementOfData });

})




// const forecast = fetch(`http://api.weatherapi.com/v1/forecast.json?key=56c474504b9f45e7951170817243012&q=Krasnoyarsk&days=3&aqi=no&alerts=no`)

