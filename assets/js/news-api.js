  $(document).ready(function () {
    searchedCountry = localStorage.getItem("home")
    buildQueryUrl(searchedCountry,2022)
    getNews(searchedCountry)
})


// api to fetch news from NY Times

// variables: keywords, begin_date, end_date
// * api
const apiKey = "YfIUBElKGXDPyEkqeoTHKUNqWudUQyeC";

function buildQueryUrl(country, year) {
  $("#country-div").empty()
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
      // console.log(queryUrl);
      // console.log(r);
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
          // bugfix if no image type found
          if(image) {
            let imageUrl = 'https://www.nytimes.com/' + image.url;
            imageEl = $("<img>").attr("src", imageUrl);
          } else {
            let imageUrl = "https://via.placeholder.com/300";
            imageEl = $("<img>").attr("src", imageUrl);
          }

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
          let formattedDate = date.format("MMM. D, YYYY");
          let pubDate = $("<p>").text(formattedDate);

          // get snippet
          let snippet = $("<p>").text(docArray[i].snippet);

          // get lead paragraph, leave it out, for now
          // let leadPara = $("<p>").text(docArray[i].lead_paragraph);

          // create news card
          let newsCardDiv = $("<div>").addClass("card col-11");
          let newsCardBody = $("<div>").addClass("card-body");
          newsCardBody.append(headLineWLink, snippet, pubDate, wordCount);
          newsCardDiv.append(imageEl, newsCardBody);

          // newsCardDiv.append(imageEl, headLineWLink, pubDate, wordCount, byline, webUrl, snippet);
          $("#news-results").append(newsCardDiv);
        }
      }

      // add copyright footer // this can be hardcoded
      $("footer").empty();
      let credit = r.copyright;
      let footer = $("<footer>").text(credit);
      $("body").append(footer);
  });
  getCard(searchedCountry);
}



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
    let countries = ["america", "france", "germany", "japan", "korea", "china", "india", "russia", "iran", "united kingdom", "italy", "ukraine"];
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];

    return randomCountry;
}
// generate random date range (six month of a given year)
function generateDate(year) { 
  // year should be less than THIS YEAR, or it would be infinite loop
  let now = moment();
  let thisYear = parseInt(now.format("YYYY"));

  if ( !(year < thisYear) ) { return } else {
    
    let start = moment([year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)]);
    let end = start.clone().add(6, 'months');
    while (!end.isValid() || end.isAfter(now)) {
      start = moment([year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)]);
      end = start.clone().add(6, 'months');
    }
    let startDate = moment(start.toDate()).format("YYYYMMDD");
    let endDate = moment(end.toDate()).format("YYYYMMDD");
  
    return { 
      start_date: startDate,
      end_date: endDate
    };
  }
  
}

function generateRandomYear() {
  // generate a random year between 2000 - 2023 (more likely to have image)
  return year = Math.floor(Math.random() * (2022 - 2010 + 1)) + 2010;
}

$("#default").on("click", function() {
  let queryUrl = buildQueryUrl("China", 2022);
  getNews();
})

$("#random-country").on("click", function() {
  let queryUrl = buildQueryUrl(getRandomCountry(), 2022);
  getNews();
})

$("#feeling-lucky").on("click", function() {
  let queryUrl = buildQueryUrl(getRandomCountry(), generateRandomYear());
  getNews();
})

 