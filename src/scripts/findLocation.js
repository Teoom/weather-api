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

function success(elements) {
  return async (position) => {
    const { longitude, latitude } = position.coords;

    try {
      const WEATHER__API__KEY = "56c474504b9f45e7951170817243012";
      const weatherURL = `https://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&days=6&key=${WEATHER__API__KEY}`;
      const geocoderURL = `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

      const resposne = await Promise.all([
        fetch(weatherURL),
        fetch(geocoderURL),
      ]);

      if (resposne[0].ok && resposne[1].ok) {
        const weather = await resposne[0].json();
        const geocoder = await resposne[1].json();
        console.log(weather);
        console.log(geocoder);

        const timeZone = geocoder.localityInfo.informative.filter((item) => {
          if (item.description === "time zone") {
            return true;
          }
        })[0].name;

        const [date, time] = new Date()
          .toLocaleString("ru", { timeZone: timeZone })
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
        elements.locationInfo.cityName.textContent = geocoder.city;
        elements.locationInfo.time.textContent = `${hours}:${minutes}`;
        elements.locationInfo.time.parentElement.dateTime = `${year}-${month}-${day} ${time}`;
        elements.locationInfo.date.textContent = `${
          namesOfDay[indexOfDay]
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
              time: `${namesOfDay[date.getDay()]}, ${date.getDate()} ${
                namesOfMonths[date.getMonth()]
              }`,
              dateTime: forecast.date,
              temp: `${avgtemp_c.toFixed()}°C`,
            },
            elements.daily.className
          );

          elements.daily.append(item);
        });

        // Hourly
        console.log(elements.hourly);
        const hourlyForecast = weather.forecast.forecastday[0].hour.filter(
          (data) => {
            const times = ["12:00", "15:00", "18:00", "21:00", "00:00"];
            if(times.includes(data.time.split(" ")[1])) {
              return true;
            }
          }
        );

        // const midnight = hourlyForecast.splice(0, 1);
        // hourlyForecast[hourlyForecast.length] = midnight[0];
        // console.log(hourlyForecast)

        console.log(hourlyForecast)
        hourlyForecast.sort((a, b) => {
          console.log(a)
          if(a.time.includes("00:00")) {
            console.log('aa')
            return 1;
          } else {
            console.log('aa')
            return -1;
          }
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

export default function updateWeather(elements) {
  navigator.geolocation.getCurrentPosition(success(elements), error, {
    enableHighAccuracy: true,
  });
}
