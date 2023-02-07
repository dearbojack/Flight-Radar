

// Change home location button (media query)
$(document).ready(function() {
  var homeBtn = window.matchMedia("(max-width: 1000px)");

  // if on load ((document).ready) matches homeBtn, then ...
  if (homeBtn.matches) {
    $('.top-right-btn').html('⌂');
    $('.top-right-btn').css('font-size', 'x-large');
    $('.btn-primary').css('padding-top', '0px');
    $('.btn-primary').css('padding-bottom', '0.2em');
  }

  // listen for resizing
  $(window).on('resize', function() {
    if (homeBtn.matches) {
      $('.top-right-btn').html('⌂');
      $('.top-right-btn').css('font-size', 'x-large');
      $('.btn-primary').css('padding-top', '0px');
      $('.btn-primary').css('padding-bottom', '0.2em');
    } else {
      $('.top-right-btn').html('Home Location');
      $('.top-right-btn').css('font-size', '');
      $('.btn-primary').css('padding-top', '');
      $('.btn-primary').css('padding-bottom', '');
    }
  });
});