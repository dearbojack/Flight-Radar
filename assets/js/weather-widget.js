// because this func takes some time to return thus async
async function getCapital(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
        const data = await response.json();
        return data[0].capital;
    } catch (error) {
        console.error(error);
    }
}

const weatherApiKey = "95d15e0dac6e9067bba1f640b9fb69f0";

// function to get today weather of a given city
function renderTodayWeather(city) {
    // build the query url
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
    // clear existing content in #today
    $("#weather").empty();
    // fetch new weather content
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {

        if(response.cod === 200) {
            // get data from api call

            // console.log(response);
            var icon = response.weather[0].icon ;
            // var temp = response.main.temp;
            var tempF = $("<p>").text(response.main.feels_like + " °C");
            let desc = $("<p>").text(response.weather[0].description);

            // making 1st char uppercase in desc
            let descAsStr = desc.text();
            let descFirstLetter = descAsStr.charAt(0).toUpperCase();
            let restOfDesc = descAsStr.slice(1);
            let descInFull = $("<p>").text(descFirstLetter + restOfDesc);

            // url to the weather icon
            let iconUrl = "https://openweathermap.org/img/wn/" + icon +"@2x.png";

            // create elements
            let cityTitle = $("<p>").text(city);
            let weatherDiv = $("<div>");
            let weatherIcon = $("<img>").attr("src", iconUrl);
            
            // put icon to heading
            weatherDiv.attr("id", "weather-widget");
            weatherDiv.append(cityTitle, descInFull, tempF);

            // add icon to separate div
            $("#display-icon").append(weatherIcon);

            // populate #today
            $("#weather").append(weatherDiv);

        } else {
            console.log("api error");
        }

    });
}

getCapital(searchCountry).then(capital => {

    renderTodayWeather(capital);
    // console.log(`The capital of China is ${capital}.`);
});