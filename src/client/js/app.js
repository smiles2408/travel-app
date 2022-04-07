
import { countdownTraveldate } from './travelcountdown';

//Function called when the Search button is clicked.
function performAction(){
  let departureCity = document.getElementById("cityfrom").value;
  let destinationCity =  document.getElementById("cityto").value;
  let travelDate =  document.getElementById("traveldate1").value;
 // let additionalData = document.getElementById("details").value;
  let data = {
    departure : departureCity,
    destination : destinationCity,
    traveldate : travelDate,
  }

  //Getting the number of days left for the vacation and storing the value in Window localStorage

  let message = countdownTraveldate(travelDate);
  console.log(message);
  localStorage.setItem("vacationCountdown",message);

  if(message >0){
    document.getElementById('days').innerHTML = `Get ready for your vacation to ${destinationCity}...Days left for your Vacation is ${message}.`;
  }else{
    document.getElementById('days').innerHTML = "Please enter a future date from today. "
  }
   let trip;
    console.log(data);
    trip = postData('/addTrip', data).then((res) => {
      updateUI(res);
      return res;
    });
     
   
    // save trip in session storage
    sessionStorage.newTrip = JSON.stringify(trip);
 
}

//Function for posting the data to the Server
const postData = async (url= '', data = {})=>{
 
  const response = await fetch(url, {
    method : 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data)
  });
  try{
    const newData = await response.json();
    return newData;
  }catch(error){
   console.log("error", error);
  }
}
//Function to update the Vacation Details in the HTML
const updateUI = (trip) => {

    document.getElementById('vacationdetails').classList.remove("vacation_details_hide");
    document.getElementById('locationdetails').innerHTML = `Your destination country is ${trip.destination.country_name} and the destination country code is ${trip.destination.country_code} .<br>The latitude is ${trip.destination.latitude} and the longitude is ${trip.destination.longitude}.<br>The population at the place is ${trip.destination.population}.`;
    //Updating the image of the city
    if(trip.image!= undefined){
      document.getElementById('location-image').src = trip.image;
    } else{
      document.getElementById('location-image').src = "../error.jpeg";
      console.log(document.getElementById('location-image').src );
      
    }
    if(trip.weather.icon!= undefined){
      document.getElementById('weather-icon').src = trip.weather.icon;
    } else{
      document.getElementById('weather-icon').src = "../weather-error.jpeg";
    }
  
    document.getElementById('weatherdetails').innerHTML = `The temperature is ${trip.weather.temperature} degree Celsius.<br>The weather description is as: ${trip.weather.description}<br>The precipitation is ${trip.weather.precip}.<br>The sunrise is at ${trip.weather.sunrise} and the sunset is at ${trip.weather.sunset}.<br> `


}

export { performAction }
