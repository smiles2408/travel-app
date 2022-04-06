const fetch = require('node-fetch');

const fetchPixabayApi = async(city='', country = '',apikey) => {
    let url = 'https://pixabay.com/api/?';
    url = `${url}key=${apikey}&q=${city}+${country}&category=travel`;
    console.log(url);
    let response = await fetch(url);
    console.log('Pixabay API:',response.status,response.statusText,response.ok);
    if(response.ok){
        let data = await response.json();
        if(data.hits.length >0){
            return data.hits[0].webformatURL;
        }

    } else{
        console.log(`Error Code: ${response.status} ${response.statusText}.`);
    }

}

module.exports = fetchPixabayApi;