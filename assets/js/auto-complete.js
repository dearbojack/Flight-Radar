let searchedCountry = '';
let homeCountry = '';

$('#form-submit').on('click', function(e){
    e.preventDefault();
    searchedCountry = $('#form-input').val();
    console.log(searchedCountry)
    buildQueryUrl(searchedCountry, 2023);
    getNews();
})

$( "#form-input" ).autocomplete({
    minLength: 3,
    source: countryList,
    select: function(event, ui) { 
        countrySelect = ui.item.value;
        console.log(countrySelect);
    }
});

$('#modal-text').focus(function(e) {
    e.preventDefault();
    countryList
$( "#modal-text" ).autocomplete({
    select: function(event, ui) { 
    console.log(ui.item.value);
    homeCountry = ui.item.value;
    console.log(homeCountry);
},
    minLength: 3,
    source: countryList
});
});