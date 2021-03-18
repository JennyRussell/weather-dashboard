let cityNameHTML = "<h1 id='cityName'></h1>";
let currentDateHTML = "<span class='mx-3' id='currentDate'></span>";
let currentWeatherIcon = "<img class='h-11 w-11 -mt-1' id='currentWeatherIcon'></img>";

let myElements = [{
        "label": "tempLabel",
        "textId": "tempText",
        "text": "Temperature:"
    },
    {
        "label": "humLabel",
        "textId": "humText",
        "text": "Humidity:"
    },
    {
        "label": "windLabel",
        "textId": "windText",
        "text": "Wind Speed:"
    },
    {
        "label": "uviLabel",
        "textId": "uviText",
        "text": "UV Index:"
    }
]

function getElementHtml(obj) {
    return `<div class='mt-3'><span class='mx-1' id='${obj.label}'>${obj.text} <span id='${obj.textId}'>
    </span></span></div>`;
}

function createCityDetails(parent) {
    parent.append($(`<div id="cityDetails" class="flex-col border border-gray-300 h-1/3 p-8"> 
    <div class='flex justify-start text-3xl'> ${cityNameHTML} ${currentDateHTML}${currentWeatherIcon}
    </div></div>`));
    $("#currentWeatherIcon").hide();

    myElements.forEach(function(elementItem) {
        $("#cityDetails").append($(getElementHtml(elementItem)));
        $(`#${elementItem.label}`).hide();
    });
}

function updateWeatherIcon(iconId) {
    $("#currentWeatherIcon").attr("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);
    $("#currentWeatherIcon").show();

}

function determineUVIStyling(value) {
    // green = 2 yellow =5 orange = 7 
    let styledClasses = "rounded p-0.5 mx-1 text-white";
    if (value < 3) {
        return `bg-green-500 ${styledClasses}`;
    }
    if (value < 6) {
        return `bg-yellow-300 ${styledClasses}`;
    }
    if (value < 8) {
        return `bg-yellow-500 ${styledClasses}`;
    }
    return `bg-red-500 ${styledClasses}`;
}

function updateTempValue(tempValue) {
    tempValue = Math.round((tempValue - 273.15) * 9 / 5 + 32);
    $("#tempText").text(`${tempValue} °F`);
    $('#tempText').addClass(tempValue);
    $("#tempLabel").show();
}

function updateUVIElement(uviValue) {
    $("#uviText").text(`${uviValue}`);
    $('#uviText').addClass(determineUVIStyling(uviValue));
    $("#uviLabel").show();
}

function updateHumElement(humValue) {
    $("#humText").text(`${humValue} %`);
    $("#humLabel").show();
}

function updateWindElement(windValue) {
    $("#windText").text(`${windValue} MPH`);
    $("#windLabel").show();
}


// function createTimeElement(parent) {
//     parent.append($("<h1 class='text-3xl' id='currentDate'>Date:</h1>"));
// }