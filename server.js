// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require bodyparser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening(){
    console.log(`the server is running on port number ${port}`);
}

app.get('/all', function (req, res) {
    res.send(projectData);
  })

app.post('/add', addWeather);

function addWeather (req,resp){   
    
   let data = req.body;
   console.log(data);
   projectData["date"] = data.date;
   projectData["temp"] = data.temp;
   projectData["content"] = data.content;
   resp.send(projectData);
   
}
