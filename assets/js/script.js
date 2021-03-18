const SEARCH_BTN = $("search-button");

let cityName = $("#user-input").value

function updateCityDetails(jsonResponse) {
    console.log(jsonResponse);
    updateUVIElement(jsonResponse.current.uvi);
    updateTempValue(jsonResponse.current.temp);
    updateHumElement(jsonResponse.current.humidity);
    updateWindElement(jsonResponse.current.wind_speed);
    updateWeatherIcon(jsonResponse.current.weather[0].icon);
}

function searchCityFunction() {
    $("#search-button").click(function() {
        let userCity = $("#user-input").val();
        $("#cityName").text(`${userCity}`);
        $("#currentDate").text(`(${moment().format('MM/DD/YYYY')})`)
        getOneCallWeather(userCity, updateCityDetails);
    });
};

function buildCityDetails() {
    createCityDetails($("#cityDetailContainer"));

}

function start() {
    buildCityDetails();
    searchCityFunction();
}

start();



// function baseFetchByGET(completeURL, successCallback, errorCallback) {
//     $.ajax({
//         type: 'GET',
//         url: completeURL,
//         beforeSend: function(xhr) {
//             xhr.setRequestHeader('Authorization', "Bearer " + API_KEY);
//             xhr.setRequestHeader('Content-Type', "application/json");
//             // xhr.setRequestHeader('XMLHttpRequest', "Accept");
//         },
//         success: function(response) {
//             console.log(response);
//             successCallback(response);
//         },
//         error: function(response) {
//             errorCallback(response.responseJSON);
//         }
//     })
// }

// function baseFetchByGET() {
//     $.ajax({
//         type: 'GET',
//         url: completeURL,
//         beforeSend: function(xhr) {
//             xhr.setRequestHeader('Authorization', "Bearer " + API_KEY);
//             xhr.setRequestHeader('Content-Type', "application/json");
//             // xhr.setRequestHeader('XMLHttpRequest', "Accept");
//         },
//         success: function(response) {
//             console.log(response);

//         },
//         error: function(response) {
//             console.log(response.responseJSON);
//         }
//     })
// }


// baseFetchByGET();



// async function getWeatherByCity(userCity, callbackFunction) {
//     if (userCity === undefined || userCity === "" || userCity === null) {
//         console.log("cityName is undefined");
//     } {
//         let citySearchURL = `${baseURL}?q=${user}&appid=${API_KEY}`;
//         console.log(citySearchURL);
//         return baseFetchByGET(citySearchURL, callbackFunction);
//     }
// }