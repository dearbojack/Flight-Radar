// variables that will be set to a search term
let searchedCountry = '';
let homeCountry = '';

// an empty array of country common names
let countryList = [];
// query url for country common names
const queryURL = `https://restcountries.com/v3.1/all?fields=name;commonName`

// an api call that returns the common names of each country
$.ajax({
url: queryURL,
method: "GET"
// store the name of each country into an array that we use as our source for the autocomplete functionality of each search bar
}).then(function (response) {
    for(let i = 0; i < response.length; i++) {
        countryList.push(response[i].name.common);
    }
    return countryList;
})

// an event listener that assigns a user input (text field) that will be passed into our api calls
$('#form-submit').on('click', function(e){
    e.preventDefault();
    searchedCountry = $('#form-input').val();
    buildQueryUrl(searchedCountry, 2022);
    getNews();
})

// autocomplete functionality for the text field.
$("#form-input").autocomplete({
    minLength: 3,
    source: countryList,
    select: function (event, ui) {
        countrySelect = ui.item.value;
    }
})

// an event listener that sets a home country that is stored in local storage
$('#modal-button').on('click', function(e) {
    homeCountry = $('#modal-text').val();
    localStorage.setItem('home', homeCountry);
})

// autocomplete functionality for the modal input
$( "#modal-text" ).autocomplete({
    minLength: 3,
    source: countryList,
    select: function (event, ui) {
        homeCountry = ui.item.value;
    },
});

// provides a random country
$('#random-country').on('click', function(e) {
    e.preventDefault();
    let queryUrl = buildQueryUrl(getRandomCountry(), 2022);
    getNews();
})

// returns the user to their home country page
$('#home-country').on('click', function(e) {
    e.preventDefault();
    readyFunc();
})
