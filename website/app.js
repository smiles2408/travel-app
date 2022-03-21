/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=7d38d465a29eb943d38c8ba4cab402a9&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

//function called when the Generate button is clicked.
function performAction(e){
  const zipCode =  document.getElementById('zip').value;
  const favFeeling =  document.getElementById('feelings').value;

  getWeather(baseURL,zipCode, apiKey)
  .then(function(data){
    // Add data
    console.log(data);
    postData('/add', {date:newDate,temp:data.list[0].main.temp, content:favFeeling});
    updateUI();
  })   
}

//Function to get weather data from the OpenWeather API
const getWeather = async(baseUrl, zip, key) => {
  const res  = await fetch(baseUrl+zip+key);
  try{
      const data = await res.json();
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
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = `The date is ${allData.date}`;
    document.getElementById('temp').innerHTML = `The Temperature in Fahrenheit is ${Math.round(allData.temp)} degress`; 
    document.getElementById('content').innerHTML = `I am feeling ${allData.content}`;

  }catch(error){
    console.log("error", error);
  }
}