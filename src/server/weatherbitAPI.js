const fetch = require('node-fetch');

const fetchweatherbitApi = async (latitude,longitude,date,apikey) => {
    let url = 'https://api.weatherbit.io/v2.0/current?'; 
    
    url = `${url}lat=${latitude}&lon=${longitude}&key=${apikey}&include=minutely`;

    let response = await fetch(url);
    console.log('Weatherbit API:',response.status,response.statusText,response.ok);
    if(response.ok){
        let data = await response.json();
        return {
            temperature: data.data[0].temp,
            icon: 'https://www.weatherbit.io/static/img/icons/' + data.data[0].weather.icon + '.png',
            description: data.data[0].weather.description,
            sunrise: data.data[0].sunrise,
            sunset: data.data[0].sunset,
            precip: data.data[0].precip
        };

    } else{
        console.log(`Error Code: ${response.status} ${response.statusText}.`);
        return {
            temperature : 'Invalid data',
            weather_icon: 'Invalid data',
            weather_description: 'Invalid data'
        };
    }

};

module.exports = fetchweatherbitApi;