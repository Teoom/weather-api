
async function success(position) {
  const { longitude, latitude } = position.coords


  try {
    let response = await fetch(`https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
    
    if(response.ok) {
      const location = await response.json();
      console.log(location)
      return response;
    } else {
      throw new Error("error")
    }
  } catch (error) {
    alert("Error")
    console.log(error)
  }



}


function error() {
  alert('We can`t determine your geolocation :(');
}

export default  function findLocation() {
 const location =  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 3600,
    maximumAge: 1000
  })

  return location;
}
