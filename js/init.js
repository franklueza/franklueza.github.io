
$(function(){
  $('.scrollspy').scrollSpy();
});

$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: true
});
$(document).ready(function(){
  $('.slider').slider({
    indicators: false,
    duration: 500,
    interval: 3000,
    height: 700,
  });
});
$(document).ready(function(){
  $('.sidenav').sidenav();
});
$(document).ready(function(){
  $('.fixed-action-btn').floatingActionButton();
});

$(document).ready(function(){
  $('.modal').modal();
});
$(document).ready(function(){
  $('.tap-target').tapTarget();
});
$(document).ready(function(){
  $('.materialboxed').materialbox();
});
$(document).ready(function(){
  $('.carousel').carousel({
    duration: 200,
    dist: -200,
    shift: 100
    
  });
});