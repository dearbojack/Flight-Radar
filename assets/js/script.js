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

function buildQueryUrl(country, year) {
  let bDate = generateDate(year).start_date;
  let eDate = generateDate(year).end_date;
  return queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${country}&begin_date=${bDate}&end_date=${eDate}&api-key=${apiKey}`;
}

function getNews() {
  // clear the content
  $("#news-results").empty();

  // call api and fill in new content
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then( function(r) {
      console.log(queryUrl);
      console.log(r);
      // get the array of all news returned
      let docArray = r.response.docs;
      
      for (let i = 0; i < docArray.length; i++) {
        let media = r.response.docs[i].multimedia;

        if(media === []) {
          // skip card creation if no image
          return;
        } else {
          // create news card if there are image
          // console.log(media[0].url);
          let image = media.find(image => image.subtype === 'articleInline');
          let imgeUrl = 'https://www.nytimes.com/' + image.url;
          imageEl = $("<img>").attr("src", imgeUrl);

          // get headline and link it
          let headLine = docArray[i].headline.main;
          let webUrl = docArray[i].web_url;
          let headLineWLink = $("<h3>").html(`<a href="${webUrl}">${headLine}</a>`);
          
          // get author
          let byline = $("<p>").text(docArray[i].byline.original);

          // get word count and calc reading time
          let wordCount = $("<p>").text("Estimated reading time: " + calculateReadingTime(docArray[i].word_count));

          // get pub date & format it
          let date = moment(docArray[i].pub_date);
          let formattedDate = date.format("YYYY-MM-DD");
          let pubDate = $("<p>").text(formattedDate);

          // get snippet
          let snippet = $("<p>").text(docArray[i].snippet);

          // create news card
          let newsCardDiv = $("<div>").addClass("card col-12");
          let newsCardBody = $("<div>").addClass("card-body");
          newsCardBody.append(headLineWLink, pubDate, wordCount, byline, snippet);
          newsCardDiv.append(imageEl, newsCardBody);

          // newsCardDiv.append(imageEl, headLineWLink, pubDate, wordCount, byline, webUrl, snippet);
          $("#news-results").append(newsCardDiv);
        }
      }

      // add copyright footer // this can be hardcoded
      let credit = r.copyright;
      let footer = $("<footer>").text(credit);
      $("body").append(footer);
  });
  
}

// build query url
var queryUrl = buildQueryUrl(2023, "China");

// func to calc reading time based on word count
function calculateReadingTime(wordCount) {
  const averageReadingSpeed = 200; // words per minute
  const readingTime = Math.ceil(wordCount / averageReadingSpeed);
  // singlar or plural
  if(readingTime > 1) {
    return `${readingTime} minutes`
  } else {
    return `${readingTime} minute`
  }
}

function getRandomCountry() {
  fetch('https://restcountries.com/v2/all?fields=name')
  .then(response => response.json())
  .then(countries => {
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex].name;

    console.log(randomCountry);
  });
}

function generateDate(year) {
  const startDate = year + "0101";
  const endDate = year + "1231";

  return { 
    start_date: startDate,
    end_date: endDate
  };
}

function generateRandomYear() {
  return year = Math.floor(Math.random() * (2023 - 1970 + 1)) + 1970;
}

$("#default").on("click", function() {
  let queryUrl = buildQueryUrl("China", 2023);
  getNews();
})

$("#random-country").on("click", function() {
  let queryUrl = buildQueryUrl(getRandomCountry(), 2023);
  getNews();
})

$("#feeling-lucky").on("click", function() {
  let queryUrl = buildQueryUrl(generateDate(generateRandomYear()), getRandomCountry());
  getNews();
})