import '../styles/index.css'

import findLocation from "./findLocation.js";

const getLocationBtn = document.querySelector(".location-btn")
const cityName = document.querySelector(".city");

getLocationBtn.addEventListener('click', async () => {

  
  // findLocation()
  const loc = findLocation();
  console.log(loc)

})


// const objOfImage = {
//   weather: {
//     clear: '../images/clear 2.png',
//     clouds: '../images/clear 2.png'
//   },
//   direction: {

//   }
// }


// (function () {

//   const imageWeatherNow = document.querySelector('.weather-now__img');
//   //
//   //  imageWeatherNow.src = objOfImage.weather.clear
//   console.log(imageWeatherNow)






// })()




