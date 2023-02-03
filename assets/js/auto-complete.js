let searchedCountry = '';
let homeCountry = '';


$('#form-submit').on('click', function(e){
    e.preventDefault();
    searchedCountry = $('#form-input').val();
    console.log(searchedCountry)
    buildQueryUrl(searchedCountry, 2022);
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

$('#modal-button').on('click', function(e) {
    homeCountry = $('#modal-text').val();
    localStorage.setItem('home', homeCountry);
})

$( "#modal-text" ).autocomplete({
    minLength: 3,
    source: countryList,
    select: function(event, ui) { 
    homeCountry = ui.item.value;
    console.log(homeCountry);
    
},
});
