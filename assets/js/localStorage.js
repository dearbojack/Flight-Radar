
function showCountry(country) {
    if (countries.includes(country) === false) {
        countries.push(country);
        localStorage.setItem("countries", JSON.stringify(countries));
    }
    console.log(countries)
    renderCountryBtns();
}




function renderCountryBtns() {
    $("#history").empty();
    if (localStorage.getItem("countries")) {
        countries = JSON.parse(localStorage.getItem("countries"))
    }
    for (var i = 0; i < countries.length; i++) {
        var countryBtn = $("<button>");
        countryBtn.addClass("countryBtn");
        countryBtn.text(countries[i]);
        $("#history").append(countryBtn);
    }
    $(".countryBtn").on("click", function (event) {
        var country = $(this).text();
        console.log(country);
    });         
}
renderCountryBtns();

