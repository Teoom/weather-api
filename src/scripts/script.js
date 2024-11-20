const getLocationBtn = document.querySelector(".location-btn")

getLocationBtn.addEventListener('click', () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(position => {
    console.log(position)
    console.log(new Date().getTime())
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude)
  })
})



