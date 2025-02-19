import northern from "../images/northern.png"

export function renderItem(classNames, content, parentClass) {
  const item = document.createElement("li");
  item.className = classNames.li;

  const imgWeather = document.createElement("img");
  imgWeather.className = classNames.imgWeather;
  imgWeather.setAttribute("aria-hidden", true);
  imgWeather.src = content.src;


  const spanTemp = document.createElement("span");
  spanTemp.className = classNames.temp;
  spanTemp.textContent = content.temp;


  const time = document.createElement("time");
  time.className = classNames.time;
  time.textContent = content.time;
  time.dateTime = content.dateTime;

  if (parentClass === "forecast-daily__list") {
    item.append(imgWeather, spanTemp, time);

  } else {

    const windDegree = document.createElement("img");
    windDegree.className = classNames.windDegree;
    windDegree.src = northern;
    windDegree.style.rotate = `${content.windDegree}deg`;

    const spanWindSpeed = document.createElement("span");
    spanWindSpeed.className = classNames.windSpeed;
    spanWindSpeed.textContent = content.windSpeed;

    item.append(time, imgWeather, spanTemp, windDegree, spanWindSpeed);
  }

  return item;

}