async function getCapital(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
        const data = await response.json();
        return data[0].capital;
    } catch (error) {
        console.error(error);
    }
}

// function to get today weather of a given city
function renderTodayWeather(city) {
    // build the query url
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
    // clear existing content in #today
    $("#today").empty();
    // fetch new weather content
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {

        if(response.cod === 200) {
            // get data from api call

            console.log(response);
            var icon = response.weather[0].icon ;
            // var temp = response.main.temp;
            var tempF = response.main.feels_like;
            let desc = response.weather[0].description;

            // url to the weather icon
            let iconUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

            // create elements
            let cityTitle = city;
            let weatherDiv = $("<div>");
            let weatherIcon = $("<img>").attr("src", iconUrl);
            
            // put icon to heading
            weatherDiv.attr("id", "weather-widget");
            weatherDiv.append(cityTitle, weatherIcon, desc, tempF);

            // populate #today
            $(".jumbotron").append(weatherDiv);

        } else {
            console.log("api error");
        }

    });
}

getCapital("China").then(capital => {
    renderTodayWeather(capital);
    console.log(`The capital of China is ${capital}.`);
});