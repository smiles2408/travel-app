/* Global Variables */
//const baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
// Personal API Key for OpenWeatherMap API
//const apiKey = "&appid=7d38d465a29eb943d38c8ba4cab402a9&units=imperial";
const geoNameAPIKey = "smiles2408";
const geoNameURL =`http://api.geonames.org/search?username=${geoNameAPIKey}&type=json&name=`;


import { countdownTraveldate } from './travelcountdown';

//function called when the Search button is clicked.
function performAction(){

  let destinationCity =  document.getElementById("city").value;
  let travelDate =  document.getElementById("traveldate1").value;
  let additionalData = document.getElementById("details").value;

  //Getting the number of days left for the vacation and storing the value in Window localStorage
  console.log(destinationCity,travelDate,additionalData);

  let message = countdownTraveldate(travelDate);
  console.log(message);
  localStorage.setItem("vacationCountdown",message);

  if(message >0){

    document.getElementById('days').innerHTML = `Days left for your Vacation is ${message}.`;
  }else{
    document.getElementById('days').innerHTML = "Please enter a future date from today. "
  }
   

 getTripdata(geoNameURL,destinationCity)
  .then(function(data){
    // Add data
    console.log(data);
    postData('/addTrip', {departure:destinationCity,date:travelDate,  additionaldata:additionalData});
   // updateUI();
  })   
}

//Function to get weather data from the Geonames API
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
}

//Function for posting the data to the Server
const postData = async (url= '', data = {})=>{
  console.log(data);
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

//Function to get data from the server and update the Browser UI
/*const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `The date is ${allData.date}`;
    document.getElementById('temp').innerHTML = `The Temperature in Fahrenheit is ${Math.round(allData.temp)} degress`; 
    document.getElementById('content').innerHTML = `I am feeling ${allData.content}`;
    document.getElementById('days').innerHTML = countdownTraveldate(travelDate);

  }catch(error){
    console.log("error", error);
  }
}*/

export { performAction }