//Fetch the geonames API and get the latitude, longitude and country
const fetch = require('node-fetch');

const fetchGeonamesApi = async (city='', key) => {
    const url = `http://api.geonames.org/search?username=${key}&type=json&name=`;
    let response = await fetch(url + city);
    console.log('Response from the GEONAME API:', response.status, response.statusText,response.ok);

    if(response.ok){
        let data = await response.json();
        if(data.geonames.length >0){
            data = data.geonames[0];

        }

    } else {
        console.log(`ERROR: code ${response.status} ${response.statusText}`);

    }

}
module.exports = fetchGeonamesApi;