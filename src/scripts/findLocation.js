export const namesOfDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const namesOfMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


function success(element) {

  return async (position) => {

    const { longitude, latitude } = position.coords;

    try {
      const API__KEY = '56c474504b9f45e7951170817243012';
      const URL = `http://api.weatherapi.com/v1/forecast.json?q=${latitude},${longitude}&key=${API__KEY}`;
      // const resposne =  await fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);

      const resposne = await fetch(URL);

      if (resposne.ok) {
        console.log(await resposne.json())
        // const location = await resposne.json();

        // const timeZone = location.localityInfo.informative.filter(item => {
     
        //     if(item.description === "time zone") {
        //       return true;
        //     }

        // })[0].name;

        // const [date, time] = new Date().toLocaleString("ru", { timeZone: timeZone }).split(' ');

        // let [year, month, day] = date.split(".").reverse();
        // year = year.replace(",", "");

        // const [hours, minutes, seconds] = time.split(":");
  
        // const indexOfDay = new Date(year, month - 1, day, hours, minutes, seconds).getDay();

        // 53.024263 , 158.643504 KAMCHATKA
        // 51.5085 , -0.12574 LONDONG
        // 55.7522, 37.6156 MOSCOW
        // element.cityName.textContent = location.city;

        // element.time.textContent = `${hours}:${minutes}`;
        // element.time.parentElement.dateTime = `${year}-${month}-${day} ${time}`;

        // element.data.textContent = `${namesOfDay[indexOfDay]}, ${day} ${namesOfMonths[month-1]}`;



      } else {
        throw new Error("There was some error. Please try again later.")
      }
    } catch (error) {
      alert(error)
    }
  }
}




function error() {
  alert('We can`t determine your geolocation :(');
}

export default function updateMainPage(elements) {

  navigator.geolocation.getCurrentPosition(success(elements), error, {
    enableHighAccuracy: true,
  })
}
