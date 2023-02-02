// api to fetch news from NY Times

// variables: keywords, begin_date, end_date
// * api
const apiKey = "YfIUBElKGXDPyEkqeoTHKUNqWudUQyeC";

// * keywords : country names from user selection
var countrySelect = "america";

// * date : current year

let year = 2023;
// get the date
let beginDate = parseInt(year) + "0101";
let endDate = parseInt(year) + "1231";

// build query url
var queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${countrySelect}&begin_date=${beginDate}&end_date=${endDate}&api-key=${apiKey}`;

// call api
$.ajax({
  url: queryUrl,
  method: "GET"
}).then( function(r) {
    console.log(queryUrl);
    console.log(r);
    // get the array of all news returned
    let docArray = r.response.docs;
    
    for (let i = 0; i < docArray.length; i++) {
      // get headline and link it
      let headLine = docArray[i].headline.main;
      let webUrl = docArray[i].web_url;
      let headLineWLink = $("<h1>").html(`<a href="${webUrl}">${headLine}</a>`);
      // get author
      let byline = $("<p>").text(docArray[i].byline.original);
      // get word count
      let wordCount = $("<p>").text(docArray[i].word_count);
      // get pub date & format it
      let date = moment(docArray[i].pub_date);
      let formattedDate = date.format("YYYY-MM-DD");
      let pubDate = $("<p>").text(formattedDate);
      
      // get snippet
      let snippet = $("<p>").text(docArray[i].snippet);

      // create news card
      let newsCardDiv = $("<div>").addClass("news-card");

      newsCardDiv.append(headLineWLink, pubDate, wordCount, byline, webUrl, snippet);
      $("body").append(newsCardDiv);
      
    }
});