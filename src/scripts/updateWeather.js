import { renderItem } from "./renderItem";

const namesOfDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const namesOfMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function success(elements, city) {
  return async (position) => {

    const { longitude, latitude } = position.coords;
    //55.957726, 92.380148
    try {
      // WEATHER DATA
      const WEATHER__API__KEY = "56c474504b9f45e7951170817243012";
      const weatherURL = `https://api.weatherapi.com/v1/forecast.json?q=${city ? city : `${latitude},${longitude}`}&days=6&key=${WEATHER__API__KEY}`;
      // const geocoderURL = `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      const responseWeatherData = await fetch(weatherURL);
      let weather = "";


      // TRANSLATE CITY NAME IN ENGLISH
      let translate = "";
      if (responseWeatherData.ok) {
        weather = await responseWeatherData.json();

        const translateURL = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
        const options = {
          method: 'POST',
          headers: {
            'x-rapidapi-key': '2f28d44073mshad6f6a61a18367bp1a0b52jsn7dba885c1c32',
            'x-rapidapi-host': 'google-translate113.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'auto',
            to: 'en',
            text: `${weather.location.name}`
          })
        }

        const resposneTranslate = await fetch(translateURL, options)
        translate = await resposneTranslate.json();

      } else {
        throw new Error("Weather data was not received")
      }


      if ("trans" in translate) {

        const [date, time] = new Date()
          .toLocaleString("ru", { timeZone: weather.location.tz_id })
          .split(" ");

        let [year, month, day] = date.split(".").reverse();
        year = year.replace(",", "");

        const [hours, minutes, seconds] = time.split(":");

        const indexOfDay = new Date(
          year,
          month - 1,
          day,
          hours,
          minutes,
          seconds
        ).getDay();

        // 53.024263 , 158.643504 KAMCHATKA
        // 51.5085 , -0.12574 LONDONG
        // 55.7522, 37.6156 MOSCOW
        elements.locationInfo.cityName.textContent = translate.trans;
        elements.locationInfo.time.textContent = `${hours}:${minutes}`;
        elements.locationInfo.time.parentElement.dateTime = `${year}-${month}-${day} ${time}`;
        elements.locationInfo.date.textContent = `${namesOfDay[indexOfDay]
          }, ${day} ${namesOfMonths[month - 1]}`;

        const { temp_c, feelslike_c, humidity, wind_kph, pressure_mb, uv } =
          weather.current;
        const { sunrise, sunset } = weather.forecast.forecastday[0].astro;

        String(temp_c).includes("-")
          ? (elements.currentWeather.temp.style.fontSize = "70px")
          : (elements.currentWeather.temp.style.fontSize = "80px");

        elements.currentWeather.temp.textContent = `${temp_c.toFixed()}°C`;
        elements.currentWeather.feelsTemp.textContent = `${feelslike_c.toFixed()}°C`;
        elements.currentWeather.sunrise.textContent = sunrise;
        elements.currentWeather.sunset.textContent = sunset;
        elements.currentWeather.weatherImg.src = `http:${weather.current.condition.icon}`;
        elements.currentWeather.figcaption.textContent =
          weather.current.condition.text;
        elements.currentWeather.humidity.textContent = `${humidity}%`;
        elements.currentWeather.windSpeed.textContent = `${wind_kph}km/h`;
        elements.currentWeather.pressure.textContent = `${pressure_mb}hPa`;
        elements.currentWeather.uv.textContent = uv;

        // Daily
        const dailyForecasy = weather.forecast.forecastday.filter(
          (item, index) => index !== 0
        );
        elements.daily.textContent = "";
        dailyForecasy.forEach((forecast) => {
          const { avgtemp_c } = forecast.day;
          const date = new Date(forecast.date_epoch * 1000);

          const item = renderItem(
            {
              li: "forecast-daily__list-item",
              imgWeather: "forecast-daily__image",
              temp: "forecast-daily__temp-value",
              time: "forecast-daily__time",
            },
            {
              src: `http:${forecast.day.condition.icon}`,
              time: `${namesOfDay[date.getDay()]}, ${date.getDate()} ${namesOfMonths[date.getMonth()]
                }`,
              dateTime: forecast.date,
              temp: `${avgtemp_c.toFixed()}°C`,
            },
            elements.daily.className
          );

          elements.daily.append(item);
        });

        // Hourly
        const hourlyForecast = weather.forecast.forecastday[0].hour.filter(
          (data) => {
            const times = ["12:00", "15:00", "18:00", "21:00", "00:00"];
            if (times.includes(data.time.split(" ")[1])) {
              return true;
            }
          }
        );

        // const midnight = hourlyForecast.splice(0, 1);
        // hourlyForecast[hourlyForecast.length] = midnight[0];
        // console.log(hourlyForecast)

        hourlyForecast.sort((a, b) => {
          if (b.time.includes("00:00")) {
            return -1;
          }
          else {
            return 0;
          }
        })
        elements.hourly.textContent = "";
        hourlyForecast.forEach(forecast => {
          const item = renderItem(
            {
              li: "forecast-hourly__item",
              time: "forecast-hourly__time",
              temp: "forecast-hourly__temp-value",
              imgWeather: "forecast-hourly__img",
              windDegree: "forecast-hourly__direction",
              windSpeed: "forecast-hourly__wind-speed"
            },
            {
              src: `http:${forecast.condition.icon}`,
              temp: `${forecast.temp_c.toFixed()}°C`,
              windDegree: forecast.wind_degree.toFixed(),
              windSpeed: `${forecast.wind_kph.toFixed()}km/h`,
              time: forecast.time.split(" ")[1],
              dateTime: forecast.time
            },
            elements.hourly.className
          );

          elements.hourly.append(item);
        })

      } else {
        throw new Error("There was some error. Please try again later.");
      }
    } catch (error) {
      alert(error);
    }
  };
}

function error() {
  alert("We can`t determine your geolocation :(");
}

export default function updateWeather(elements, city) {
  navigator.geolocation.getCurrentPosition(success(elements, city), error, {
    enableHighAccuracy: true,
  });
}
