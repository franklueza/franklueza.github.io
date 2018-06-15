$(document).ready(function(){
  $('.parallax').parallax();
});
$(document).ready(function(){
 
	$('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		}, 300);
	});
 
$(window).scroll(function(){
    if( $(this).scrollTop() > 0 ){
        $('.ir-arriba').slideDown(300);
    } else {
        $('.ir-arriba').slideUp(300);
    }
    });
});
$('.ir-arriba').click(function(){
  $('body, html').animate({
      scrollTop: '0px'
  }, 1000);
});
(function($){
	$(function(){


    // Navbar
    $(".button-collapse").sideNav();
    var categories = $('nav .categories-container');
    if (categories.length) {
      categories.pushpin({ top: categories.offset().top });
      var $links = categories.find('li');
      $links.each(function() {
        var $link = $(this);
        $link.on('click', function() {
          $links.removeClass('active');
          $link.addClass('active');
          var hash = $link.find('a').first()[0].hash.substr(1);
          var $galleryItems = $('.gallery .gallery-item');

          $galleryItems.stop().addClass('gallery-filter').fadeIn(100);

          if (hash !== 'all') {
            var $galleryFilteredOut = $galleryItems.not('.' + hash).not('.all');
            $galleryFilteredOut.removeClass('gallery-filter').hide();
          }

          // transition layout
          $masonry.masonry({
            transitionDuration: '.3s'
          });
          // only animate on layout
          $masonry.one( 'layoutComplete', function( event, items ) {
            $masonry.masonry({
              transitionDuration: 0
            });
          });
          setTimeout(function() {

          $masonry.masonry('layout');
          }, 1000);
        });
      });
    }


	  // Home
	  $('.carousel:not(.carousel-slider)').carousel({
      dist: 0,
      padding: 10
    });
    $('.carousel.carousel-slider').carousel({
      fullWidth: true,
      indicators: true,
      onCycleTo: function(el) {
        $('.nav-background img').removeClass('active');
        $('.nav-background img').eq(el.index()).addClass('active');
      }
    });


    // Masonry Grid
    var $masonry = $('.gallery');
    $masonry.masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.gallery-filter',
      // use element for option
      columnWidth: '.gallery-filter',
      // no transitions
      transitionDuration: 0
    });
    // layout Masonry after each image loads
    $masonry.imagesLoaded(function() {
      $masonry.masonry('layout');
    });
    $('a.filter').click(function (e) {
      e.preventDefault();
    });



    // Contact Form Icon
    $("form .form-control").focus(function() {
      $(this).siblings("label").first().children("i").first().css({"color": "#aaa", "left": 0});
    });
    $("form .form-control").blur(function() {
      $(this).siblings("label").first().children("i").first().css({"color": "transparent", "left": "-20px"});
    });


    var onShow = function(el) {
      var carousel = el.find('.carousel.initialized');
      carousel.carousel({
        dist: 0,
        padding: 10
      });
    };
    $('.gallery-expand').galleryExpand({
      onShow: onShow
    });

    $('.blog .gallery-expand').galleryExpand({
      onShow: onShow,
      fillScreen: true,
      inDuration: 500,
    });

	}); // end of document ready
})(jQuery); // end of jQuery name space

<!-- WhatsHelp.io widget -->

    (function () {
        var options = {
            facebook: "1959498814271748", // Facebook page ID
            whatsapp: "5568895354", // WhatsApp number
            email: "ixfanalytics@gmail.com", // Email
            company_logo_url: "//storage.whatshelp.io/widget/fd/fdc6/fdc661aefcb5f36f0bbd1f54516363a1/28782580_2114220858799542_9218294182744765982_n.jpg", // URL of company logo (png, jpg, gif)
            greeting_message: "Hola,¿Cómo podemos ayudarte?", // Text of greeting message
            call_to_action: "Contact", // Call to action
            button_color: "#FF6550", // Color of button
            position: "left", // Position may be 'right' or 'left'
            order: "whatsapp,facebook,email" // Order of buttons
        };
        var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();

<!-- /WhatsHelp.io widget -->