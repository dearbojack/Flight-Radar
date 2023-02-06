let searchedCountry = '';
let homeCountry = '';


var queryURL = `https://restcountries.com/v2/all`
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function (response) {
        console.log(response)
        for(let i = 0; i < response.length; i++) {
            countryList.push(response[i].name)
        }
        return countryList
})

$('#form-submit').on('click', function(e){
    e.preventDefault();
    searchedCountry = $('#form-input').val();
    buildQueryUrl(searchedCountry, 2022);
    getNews();
})

$("#form-input").autocomplete({
    minLength: 3,
    source: countryList,
    select: function (event, ui) {
        countrySelect = ui.item.value;
    }
})

$('#modal-button').on('click', function(e) {
    homeCountry = $('#modal-text').val();
    localStorage.setItem('home', homeCountry);
})

$( "#modal-text" ).autocomplete({
    minLength: 3,
    source: countryList,
    select: function (event, ui) {
        homeCountry = ui.item.value;
    },
});

$('#random-country').on('click', function(e) {
    e.preventDefault();
    console.log('hey hey')
})

$('#home-country').on('click', function(e) {
    e.preventDefault();
    readyFunc();
})
