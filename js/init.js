(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  $('.carousel').carousel();
});
/*
$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});*/

$(document).ready(function(){
  $('.modal').modal();
});
$(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });