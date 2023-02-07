function getCard() {
    
    // fixing the bug of usa
    if (searchedCountry === "United States") {
      searchedCountry = "United States of America";
      var queryURL = `https://restcountries.com/v2/name/${searchedCountry}?fullText=true`
    } else {
      var queryURL = `https://restcountries.com/v2/name/${searchedCountry}?fullText=true`
    }
    
    
    $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    
    // initialise variables to store response
    var name = response[0].name;
    var region = response[0].region;
    var subRegion = response[0].subregion;
    var capital = response[0].capital;
    var lang = response[0].languages[0].name;
    var pop = response[0].population;
    var number = pop;
    var popul = number.toLocaleString();
    var demonym = response[0].demonym;
    
    var currency = response[0].currencies[0].name;
    var currencysym = response[0].currencies[0].symbol;
    var flag = response[0].flag
  
    var number = population;


    var country = $("#country-div");

    // country div title added by shah
    var divTitle = $("<h5>");
    divTitle.text("Statistics");
  

    //append and style country name
    var header = $("<div>")
    header.addClass("stat-header")
    header.text(name);
    header.css({ "font-size": "30px", "font-weight": "500", "text-align": "center", "padding": "10px" })

    //append and style flag
    var cFlag = $("<img>")
    cFlag.attr("id", "nationFlag")
    cFlag.attr("src", flag);
    

    // Append and style region
    var reg = $("<div>")
    reg.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Region: ")
    regValue = $("<span>")
    regValue.css("font-weight", "400").text(region)
    reg.append(regValue)

    //append and stylye subregion
    var subReg = $("<div>")
    subReg.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Subregion: ")
    subRegValue = $("<span>");
    subRegValue.css("font-weight", "400").text(subRegion)
    subReg.append(subRegValue)

    //append and style capital
    var cap = $("<div>")
    cap.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Capital City: ")
    var capValue = $("<span>")
    capValue.css("font-weight", "400").text(capital)
    cap.append(capValue)

    //append and style language
    var language = $("<div>")
    language.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Language: ")
    var langValue = $("<span>")
    langValue.css("font-weight", "400").text(lang)
    language.append(langValue)

    //apend and style population
    var population = $("<div>")
    population.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Population: ")
    var popVal = $("<span>")
    popVal.css("font-weight", "400").text(popul)
    population.append(popVal)

    //append and style demonym
    var dem = $("<div>")
    dem.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Demonym: ")
    var demStyle = $("<span>")
    demStyle.css("font-weight", "400").text(demonym)
    dem.append(demStyle)

    //append and style currency
    var cash = $("<div>");
    cash.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Currency: ")
    var currValue = $("<span>")
    currValue.css("font-weight", "400").text(currency)
    cash.append(currValue)

    //append and style currency symbol
    var curSym = $("<div>")
    curSym.css({ "padding-bottom": "3px", "font-size": "16px", "font-weight": "600" }).text("Currency Symbol: ")
    var curSymValue = $("<span>")
    curSymValue.css("font-weight", "400").text(currencysym)
    curSym.append(curSymValue)

    
       // create two divs

       var countryHeader = $('<div>').attr('id', 'country-header');
       var countryStats = $('<div>').attr('id', 'country-stats');
   
   
   
       countryHeader.append(header);
       countryHeader.append(cFlag);
       countryStats.append(cap);
       countryStats.append(population);
       countryStats.append(language);
       countryStats.append(dem);
       countryStats.append(reg);
       countryStats.append(subReg);
       countryStats.append(cash);
       countryStats.append(curSym);
       country.append(countryHeader, countryStats)
     });
}
