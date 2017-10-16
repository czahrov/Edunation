$(document).ready(function(){
    $(".hamburger").click(function(){
        $(this).toggleClass("open");
        $(".navigation").toggleClass("closed");
    });
	 $("ul.navigation > li > a").click(function(){
        $(".hamburger").toggleClass("open");
		 $(".navigation").toggleClass("closed");
    });




	// paginacja
	/* (function( ball ){
		ball
		.click(function( e ){
			$(this)
			.addClass('active')
			.siblings()
			.removeClass('active');
			
		});
		
	})( $('.pagination > .pager') ); */
	
	// linkowanie
	
	/* var $root = $('html, body');
	$('a').click(function() {
		$root.animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 700);
		return false;
	}); */
	
	
	// Wyswietlanie filmow w tle
	
		var min_w = 300;
		var vid_w_orig;
		var vid_h_orig;

		$(function() {

			vid_w_orig = parseInt($('video').attr('width'));
			vid_h_orig = parseInt($('video').attr('height'));

			$(window).resize(function () { fitVideo(); });
			$(window).trigger('resize');

		});

		function fitVideo() {

			$('.video-viewport').width($('.fullsize-video-bg').width());
			$('.video-viewport').height($('.fullsize-video-bg').height());

			var scale_h = $('.fullsize-video-bg').width() / vid_w_orig;
			var scale_v = $('.fullsize-video-bg').height() / vid_h_orig;
			var scale = scale_h > scale_v ? scale_h : scale_v;

			if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

			$('video').width(scale * vid_w_orig);
			$('video').height(scale * vid_h_orig);

			$('.video-viewport').scrollLeft(($('video').width() - $('.fullsize-video-bg').width()) / 2);
			$('.video-viewport').scrollTop(($('video').height() - $('.fullsize-video-bg').height()) / 2);

		};
			
			
	
	// pop up movie
	
  	// var src = $('#videoplayer').children('iframe').attr('src');

  	// when object with class open-popup is clicked...
  	/* $('.pops').click(function(e) {
  		e.preventDefault();
  		// change the src value of the video
  		$('#videoplayer').children('iframe').attr('src', src);
  		$('.pop-container').fadeIn(300);
  	}); */

  	// when object with class close-popup is clicked...
  	/* $(".pop-container > .pop-up > .cross").click(function(e) {
  		e.preventDefault();
  		$('#videoplayer').children('iframe').attr('src', '');
  		$('.pop-container').fadeOut(300);
  	}); */

	//div as a link
	
	/* $('.blog > .inner > .wrapper > .element > a > .button').on('click', function() {
		location.href ='http://poligon.scepter.pl/PiotrM/wp_edunation/rezerwacja/'
	}); */
	
	
});