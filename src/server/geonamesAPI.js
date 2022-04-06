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
            return {
                latitude :data.lat,
                longitude: data.lng,
                country_code: data.countryCode,
                country_name: data.countryName,
                city: data.name ,
                population: data.population
            };

        }

    } else {
        console.log(`ERROR: code ${response.status} ${response.statusText}`);

    }
    return {
        latitude: 'invalid data',
        longitude: 'invalid data',
        country_code: 'invalid data',
        country_name: 'invalid data',
        city: 'invalid data',
        population: 'invalid data'

    };
};
//export {fetchGeonamesApi}; 
module.exports = fetchGeonamesApi;