
// Require the different packages to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetchGeonamesApi = require('./geonamesAPI');
const fetchPixabayApi = require('./pixabayAPI');
const fetchweatherbitApi = require('./weatherbitAPI');
const { application } = require('express');
const dotenv = require('dotenv');
dotenv.config();


const tripData = {
  departure: '',
  destination: {
      city: '',
      country_name: '',
      country_code: '',
      latitude: '',
      longitude: '',
      population:''
  },
  image:'',
  date: '',
  weather: {
      temperature: '',
      icon: '',
      description: '',
      sunrise: '',
      sunset: '',
      precip: ''
  } 
};

// Start up an instance of app
const app = express();
// Initialize the main project folder as the dist folder
app.use(express.static('dist'));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`The Travel App is listening on port number ${port}`);
}


app.get('/all', function (req, res) {
    res.send(tripData);
  })

app.post('/addTrip', async(req, res) => {
  tripData.departure = req.body.departure;
  tripData.date = req.body.traveldate;
 
  //Fetching data from the Geoname API
  let destinationData = await fetchGeonamesApi(req.body.destination,process.env.GEONAMES_KEY);
 
 tripData.destination.city = destinationData.city;
 tripData.destination.country_code = destinationData.country_code;
 tripData.destination.country_name = destinationData.country_name;
 tripData.destination.latitude = destinationData.latitude;
 tripData.destination.longitude = destinationData.longitude;
 tripData.destination.population = destinationData.population;

 //Fetching data from the Pixabay API
 tripData.image = await fetchPixabayApi(tripData.destination.city,tripData.destination.country_name, process.env.PIXABAY_KEY);
 
 let weatherLatitude = tripData.destination.latitude.slice(0,6);
 let weatherLongitude = tripData.destination.longitude.slice(0,6);
 
//Fetching data from the WeatherBitAPI
 let weatherData = await fetchweatherbitApi(weatherLatitude,weatherLongitude,tripData.date,process.env.WEATHERBIT_KEY);
 tripData.weather.temperature = weatherData.temperature;
 tripData.weather.icon = weatherData.icon;
 tripData.weather.description = weatherData.description;
 tripData.weather.sunrise = weatherData.sunrise;
 tripData.weather.sunset = weatherData.sunset;
 tripData.weather.precip = weatherData.precip;
 console.log(tripData);
res.send(tripData);
});




