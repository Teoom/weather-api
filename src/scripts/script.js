import  API__KEYS from "./variables.js";

const { GEOCODDER__API } = API__KEYS

const getLocationBtn = document.querySelector(".location-btn")

getLocationBtn.addEventListener('click',  () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(async (position) => {
    console.log(position)
    console.log(new Date().getTime())
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude)
    
    let data  = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&format=json&api_key=${GEOCODDER__API}`)
    console.log(await data.json())

    let cor = await fetch(`https://geocode.maps.co/search?q=Krasnoyarsk&api_key=673da07d240d1824659150roze6743e`)
    console.log(await cor.json())
  })
})





