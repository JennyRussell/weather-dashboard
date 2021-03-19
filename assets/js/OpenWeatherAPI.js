const baseURL = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/"
const API_KEY = "25713611fbc81c4d51549874823daa0a";

function getWeatherByCity(userCity, callback) {
    let url = `${baseURL}weather?q=${userCity}&appid=${API_KEY}`;
    baseGet(url, callback);
}

function getOneCallWeather(userCity, callback) {
    // First make a request to getWeaterByCity... so we can get the coords in the response.
    // function(jsonResponse).. is the callback for getWeatherByCity, its just inline.
    getWeatherByCity(userCity, function(jsonResponse) {




        if (jsonResponse.cod != "200") {
            displayBannerAlert(jsonResponse.message);
        }
        //get the lat/lon
        let lat = jsonResponse.coord.lat;
        let lon = jsonResponse.coord.lon;
        // build the URL by lat/lon
        let url = `${baseURL}onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}`;
        //make the request for onecall weather, and return it back to the callback
        //Note: the callback is updateCityDetails() 
        // You can see the call being made in searchCityFunction and that's where
        // updateCityDetails was specified as the callback
        baseGet(url, callback);
    });
}

function getFiveDayWeatherForeCast(userCity, callback) {
    let url = `${baseURL}forecast/daily?q=${userCity}&cnt=5&appid=${API_KEY}`;
    return baseGet(url, callback);

}


function baseGet(url, callback) {

    fetch(url)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(json) {
            callback(json)
        })
        .catch((err) => {
            console.log(err.message);
        });
}