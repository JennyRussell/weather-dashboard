const SEARCH_BTN = $("search-button");

let cityName = $("#user-input").value
let cities = [];

// API call responses for various city details values
function updateCityDetailsCallback(jsonResponse) {
    updateUVIElement(jsonResponse.current.uvi);
    updateTempValue(jsonResponse.current.temp);
    updateHumElement(jsonResponse.current.humidity);
    updateWindElement(jsonResponse.current.wind_speed);
    updateWeatherIcon(jsonResponse.current.weather[0].icon);

    updateFiveDayForcast(jsonResponse);
    addCitiesHistory();
}

// Creates dynamically generated elements to house 5 day forecast data
function updateFiveDayForcast(jsonResponse) {

    $("#5DayForecast").show();
    let dayCounter = 0;
    $("#forecastCardContainer").empty();
    jsonResponse.daily.forEach(day => {
        if (dayCounter < 5) {
            let f = kelvinToFarenheit(day.temp.day);

            let addDay = moment().add(dayCounter, 'days').format("MM/DD/YY");

            let forecastCard = `<div class="m-3 p-4 w-40 h-40 bg-blue-500 rounded text-white">
            ${addDay}
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
                class='h-11 w-11 -mt-1' >
            </img>
            <span>Temp: ${f}°F</span>
            <span>Humidity: ${day.humidity} %</span>
            </div>`
            $("#forecastCardContainer").append(forecastCard);
        }
        dayCounter++;
    })
};

// function to accept user input value into search and display city in details screen as well as current date
function searchCityFunction() {

    $("#search-button").click(function() {
        let userCity = $("#user-input").val();
        userCity = upperEachWord(userCity);
        cities.push(userCity);

        cities = removeDuplicatesFromArray(cities);
        saveToLocalStorage("city", cities);
        $("#cityName").text(`${userCity}`);
        $("#currentDate").text(`(${moment().format('MM/DD/YYYY')})`)
        getOneCallWeather(userCity, updateCityDetailsCallback);
    });
};

// creates an unordered list to display recent searched cities
function displayRecentSearches() {
    let cityList = `<ul class="mb-4 mt-4">Recent Searches:</ul>`
    $("#recent-searches").append(cityList);
    addCitiesHistory();
};

// appends cities to list and makes them selectable to pull city data
function addCitiesHistory() {
    $("#recent-searches").empty();
    let counter = 0;
    cities = getFromLocalStorage("city");
    if (cities) {
        cities.reverse().forEach(cityName => {
            if (counter < 10) {
                let trimCity = cityName.trim("");
                let element = `<li id="${trimCity}" class="hover:cursor-pointer w-48 h-10 border-gray-400 border-2 last:border-t-0 text-left m-3 p-1 list-none rounded">${cityName}</li>`;
                $("#recent-searches").append(element);
                $(`#${trimCity}`).click(function() {
                    $("#cityName").text(`${cityName}`);
                    $("#currentDate").text(`(${moment().format('MM/DD/YYYY')})`)
                    getOneCallWeather(cityName, updateCityDetailsCallback);
                })
            }
            counter++;
        });
        counter = 0;
    }
}

// adds the city elements to the details container
function buildCityDetails() {
    createCityDetails($("#cityDetailContainer"));
    createFiveDayForecast($("#cityDetailContainer"));

}

//loads functions on page open
function start() {
    buildCityDetails();
    searchCityFunction();
    displayRecentSearches();
}

start();