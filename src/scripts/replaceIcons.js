import { findElementByClass } from "./findElement"

export default function () {
  const sunrise = findElementByClass("wather-now__info__sunrise-img");
  const sunset = findElementByClass("wather-now__info__sunset-img");
  const humidity = findElementByClass("humidity .weather-now__description__image");
  const windspeed = findElementByClass("wind-speed .weather-now__description__image");
  const pressure = findElementByClass("pressure .weather-now__description__image");
  const uv = findElementByClass("UV .weather-now__description__image");
}