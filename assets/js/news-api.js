  $(document).ready(readyFunc)

function readyFunc() {
    searchedCountry = localStorage.getItem("home")
    buildQueryUrl(searchedCountry, 2022)
    getNews(searchedCountry)
    var location = $("#location-country")
    var dateTime = $("#location-date")
    location.text(localStorage.getItem("home"));
    dateTime.text(moment().format("ddd, Do MMM YY"))
    getCapital(searchedCountry).then(capital => {
      renderTodayWeather(capital);
    })
}




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
          // skip card creation if no media
          return;
        } else {
          // get xlarge image 
          let image = media.find(image => image.subtype === 'xlarge');
          // bugfix if no image type found
          if(image) {
            let imageUrl = 'https://www.nytimes.com/' + image.url;
            imageEl = $("<img>").attr("src", imageUrl);
          } else {
            // get random noimage.png when there is no image from api call
            let imageArr = [1, 2, 3];
            let randomIndex = imageArr[Math.floor(Math.random()*imageArr.length)];

            let imageUrl = "assets/images/noimage" + randomIndex + ".png";
            imageEl = $("<img>").attr("src", imageUrl);
          }

          // get headline and link it
          let headLine = docArray[i].headline.main;
          let webUrl = docArray[i].web_url;
          let headLineWLink = $("<h5>").html(`<a href="${webUrl}">${headLine}</a>`);
          
          // get author
          let byline = $("<p>").text(docArray[i].byline.original);

          // get word count and calc reading time
          let wordCount = $("<p>").text(calculateReadingTime(docArray[i].word_count));

          // get pub date & format it
          let date = moment(docArray[i].pub_date);
          let formattedDate = date.format("D-MMM-YY"); 
          let pubDate = $("<p>").text(formattedDate).addClass("pub-date"); // class added by SHAH
          // get snippet
          let snippet = $("<p>").text(docArray[i].snippet);

          // get lead paragraph, leave it out, for now
          // let leadPara = $("<p>").text(docArray[i].lead_paragraph);

          // create news card
          let newsCardDiv = $("<div>").addClass("card col-11");
          let newsCardBody = $("<div>").addClass("card-body");
          newsCardBody.append(headLineWLink, snippet, pubDate, wordCount);

          // by shah
          let newImgSec = $("<div>").addClass("newImgSec");
          let imgTabs = $("<div>").addClass("info-tab");

          imgTabs.append(wordCount);
          newImgSec.append(imageEl, imgTabs)
          // by shah

          newsCardDiv.append(newImgSec, newsCardBody); // changed input by SHAH

          // newsCardDiv.append(imageEl, headLineWLink, pubDate, wordCount, byline, webUrl, snippet);
          $("#news-results").append(newsCardDiv);
        }
      }

      // add copyright footer // this can be hardcoded
      // $("footer").empty();
      // let credit = r.copyright;
      // let footer = $("<footer>").text(credit);
      // $("body").append(footer);
  });
  getCard(searchedCountry);
}



// func to calc reading time based on word count
function calculateReadingTime(wordCount) {
  const averageReadingSpeed = 200; // words per minute
  const readingTime = Math.ceil(wordCount / averageReadingSpeed);
  // singlar or plural
  if(readingTime > 1) {
    return `${readingTime} min`
  } else {
    return `${readingTime} min`
  }
}

function getRandomCountry() {
    let countries = countryList;
    const randomIndex = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIndex];
    searchedCountry = randomCountry;
    return searchedCountry;
}
// generate random date range (six month of a given year)
function generateDate(year) { 
  // year should be less than THIS YEAR, or it would be infinite loop
  let now = moment();
  let thisYear = parseInt(now.format("YYYY"));

  if ( !(year < thisYear) ) { return } else {
    // generate random date, and end date 6 month later
    let start = moment([year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)]);
    let end = start.clone().add(6, 'months');
    // if end is in the future or invalid date, re-generate random year
    while (!end.isValid() || end.isAfter(now)) {
      start = moment([year, Math.floor(Math.random() * 12), Math.floor(Math.random() * 30)]);
      end = start.clone().add(6, 'months');
    }
    // format date into format that can be used in api call
    let startDate = moment(start.toDate()).format("YYYYMMDD");
    let endDate = moment(end.toDate()).format("YYYYMMDD");
    // return and object of startDate & endDate
    return { 
      start_date: startDate,
      end_date: endDate
    };
  }
  
}

// generate a random year between 2000 - 2023 (more likely to have image)
function generateRandomYear() {
  return year = Math.floor(Math.random() * (2022 - 2010 + 1)) + 2010;
}

$("#random-country").on("click", function() {
  let queryUrl = buildQueryUrl(getRandomCountry(), 2022);
  getNews();
})