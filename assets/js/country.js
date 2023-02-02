var queryURL = "https://restcountries.com/v2/name/bahamas";
  
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);

  //print regional
  var name = response[0].name;
  var region = response[0].region;
  var subRegion = response[0].subregion;
  var capital = response[0].capital;
  var lang = response[0].languages[0].name;
  var pop = response[0].population;
  var demonym = response[0].demonym;
  var timeZone = response[0].timezones;
  var currency = response[0].currencies[0].name;
  var currencysym = response[0].currencies[0].symbol;
  var flag = response[0].flag
  
  var country = $("#country-div");

  var header = $("<div>")
  header.text(name);
  header.css({ "font-size": "30px", "font-weight": "500", "text-align": "center" })

  var cFlag = $("<img>")
  cFlag.attr("id", "nationFlag")
  cFlag.attr("src", flag);
  cFlag.css("width", "300px")

  var reg = $("<div>")
  reg.text("Region: " + region)
  var subReg = $("<div>")
  subReg.text("Subregion: " + subRegion)
  var cap = $("<div>")
  cap.text("Capital City: " + capital)
  var language = $("<div>")
  language.text("Language: " + lang)
  var population = $("<div>")
  population.text("Population: " + pop)
  var dem = $("<div>")
  dem.text("Demonym: " + demonym)
  var time = $("<div>")
  time.text("TimeZone: " + timeZone)
  //var curr = ("<div>")
  //curr.text("Currency: " + currency)
  var curSym = $("<div>")
  curSym.text("Currency Symbol: " + currencysym)


  country.append(header);
  country.append(cFlag);
  country.append(cap);
  country.append(population);
  country.append(language);
  country.append(dem);
  country.append(reg);
  country.append(subReg);
  country.append("Currency: " + currency);
  country.append(curSym);
});