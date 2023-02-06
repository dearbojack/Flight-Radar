var homeBtn = window.matchMedia("(max-width: 1000px)");

$(window).on('resize', function() {
  if (homeBtn.matches) {
    $('.top-right-btn').html('⌂');
    $('.top-right-btn').css('font-size', 'x-large');
    $('.btn-primary').css('padding-top', '0px');
    $('.btn-primary').css('padding-bottom', '0.2em');
    $('.btn-primary').css('text-align', 'center');
} else {
    $('.top-right-btn').html('Home Location');
    $('.top-right-btn').css('font-size', '');
  }
});
