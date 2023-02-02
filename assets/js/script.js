// api to fetch news from NY Times

// variables: keywords, begin_date, end_date
// * api
const apiKey = "YfIUBElKGXDPyEkqeoTHKUNqWudUQyeC";

// * keywords : country names from user selection
var countrySelect = "";

// * date : current year

let year = 2023;
// get the date
let beginDate = parseInt(year) + "0101";
let endDate = parseInt(year) + "1231";

// build query url
var queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${countrySelect}&begin_date=${beginDate}&end_date=${endDate}&api-key=${apiKey}`;
