
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
$(document).ready(function(){
  $('.collapsible').collapsible();
});
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

$(window).scroll(function(){
  if( $(this).scrollTop() > 0 ){
      $('.ir-arriba').slideDown(600);
  } else {
      $('.ir-arriba').slideUp(600);
  }
});


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


