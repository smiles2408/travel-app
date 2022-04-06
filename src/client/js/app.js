/* Global Variables */
//const baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
// Personal API Key for OpenWeatherMap API
//const apiKey = "&appid=7d38d465a29eb943d38c8ba4cab402a9&units=imperial";



import { countdownTraveldate } from './travelcountdown';

//function called when the Search button is clicked.
function performAction(){

  let departureCity = document.getElementById("cityfrom").value;
  let destinationCity =  document.getElementById("cityto").value;
  let travelDate =  document.getElementById("traveldate1").value;
  let additionalData = document.getElementById("details").value;
  let data = {
    departure : departureCity,
    destination : destinationCity,
    traveldate : travelDate,
    additionaldata : additionalData
  }

  //Getting the number of days left for the vacation and storing the value in Window localStorage
  console.log(departureCity,destinationCity,travelDate,additionalData);

  let message = countdownTraveldate(travelDate);
  console.log(message);
  localStorage.setItem("vacationCountdown",message);

  if(message >0){

    document.getElementById('days').innerHTML = `Days left for your Vacation is ${message}.`;
  }else{
    document.getElementById('days').innerHTML = "Please enter a future date from today. "
  }
   let trip;

// getTripdata(geoNameURL,destinationCity)
 // .then(function(data){
    // Add data
    console.log(data);
    trip = postData('/addTrip', data).then((res) => {
      updateUI(res);
      return res;
    });
     
   
    // save trip in session storage
    sessionStorage.newTrip = JSON.stringify(trip);
 // })   
}

/*Function to get weather data from the Geonames API
const getTripdata = async(baseUrl, destcity) => {
  console.log(baseUrl + destcity);
  const res  = await fetch(baseUrl + destcity);
  debugger;
  try{
      const data = await res.json();
      console.log(data);
      return data;
  }catch(error) {
       console.log("error",error);
  }
}*/

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


const updateUI = (trip) => {
  
     document.getElementById('destinationcity').innerHTML = `You are travelling to ${trip.destination.city}`;
    document.getElementById('destinationcountry').innerHTML = `The Destination country is ${trip.destination.city}`; 
    document.getElementById('countrycode').innerHTML = `The Destination country Code is ${trip.destination.country_code}`; 
    document.getElementById('latitude').innerHTML = `The Destination location latitude is ${trip.destination.latitude}`; 
    document.getElementById('longitude').innerHTML = `The Destination locations longitude is ${trip.destination.longitude}`; 

   document.getElementById('population').innerHTML = `The Destination country's population is ${trip.destination.population}`; 

 
}

export { performAction }