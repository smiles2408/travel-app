
// Require the different packages to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const tripData = {
  departure: 'from',
  destination: {
      city: 'to',
      country: '',
      country_code: '',
      latitude: '',
      longitude: '',
      population:''
  },
  id:'',
  image:'',
  date: '',
  weather: {
      temperature: '',
      icon: '',
      description: ''
  }  ,
  additionaldata: ''
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
    console.log(`the Travel App is listening on port number ${port}`);
}


/*app.get('/all', function (req, res) {
    res.send(projectData);
  })
  */
app.post('/addTrip', addTripData);

function addTripData(req, resp){
  let data = req.body;
  console.log(data);
  tripData["date"] = data.date;
  tripData["departure"] = data.destination;
  tripData["weather"] = data.weather;
  resp.send(tripData);

}


/*
  debugger;
  tripData.departure = req.body.departure;
  tripData.date = req.body.date;
  let destinationData = await fetchGeonamesApi(req.body.destination, process.env.GEONAMES_KEY);
  tripData.destination.city = destinationData.city;
  tripData.country_code = destinationData.country_code;
  tripData.latitude = destinationData.latitude;
  tripData.longitude = destinationData.longitude;

  res.send(trip);

*/
