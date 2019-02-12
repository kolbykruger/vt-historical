//Open/Closed/Closing Status
document.addEventListener('DOMContentLoaded', function() {
    var time = moment().format('Hmm');
    var day = moment().isoWeekday();

    var location1 = document.querySelector('.locations .item:first-of-type .status');
    var location2 = document.querySelector('.locations .item:last-of-type .status');

    if (day > 0 && day < 7 && time >= 1000 && time < 1600) {
        location1.classList.add('open');
        location1.childNodes[2].textContent = 'Open';
    } else {
        location1.classList.add('closed');
        location1.childNodes[2].textContent = 'Closed';
    }

    if (day > 0 && day < 6 && time >= 900 && time < 1600) {
        location2.classList.add('open');
        location2.childNodes[2].textContent = 'Open';
    } else {
        location2.classList.add('closed');
        location2.childNodes[2].textContent = 'Closed';
    }
})

// Links return false
$('a:not(.force), button:not(.force), input[type="submit"]:not(.force)').click(function() {
    return false
})

//Scroll to Top
$('body').append('<a href="" onclick="event.preventDefault()" class="event_track" data-cat="Extra" data-label="Back To Top"><i aria-hidden="true" class="far fa-arrow-alt-circle-up scrollToTop" title="Scroll Up"></i></a>');
$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('.scrollToTop').fadeIn(100);
	} else {
		$('.scrollToTop').fadeOut(100);
	}
});
$('.scrollToTop').click(function(){
	$('html, body').animate({scrollTop : 0},800);
});

//Responsive iFrame
$('iframe[src*="youtube"]').wrap('<div class="responsiveIframe"/>');

//Nav
    //$( ".nav > .drop_trigger, .mobile_nav > .drop_trigger" ).each(function(){$( this ).children('a:first').attr( "onclick", "return false" );});

    $('.nav .drop_menu').each(function() {
       if ($(this).find(".item").length >= 8) {
           $(this).addClass('column_nav');
       }
    });

	$('.navicon').click(function() {
	    if($('.mobile_nav').is(':visible')){
    	    $('.mobile_nav').fadeOut(100).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
    		$('body,html').css({'overflow':'auto','height':'auto'});
    		$('.headerWrap').css({'position':'relative','z-index':'0'});
    		$('.navicon').find('i').attr( "class", "fal fa-bars");
    		$('button.navicon').attr( "aria-label", "Open Mobile Menu");
	    }else{
	        $('.mobile_nav').fadeIn(400).attr('aria-hidden', 'false').attr('aria-expanded', 'true');
	        $('body,html').css({'overflow':'hidden','height':'0'});
	        $('.headerWrap').css({'position':'fixed','z-index':'9999'});
	        $('.navicon').find('i').attr( "class", "fal fa-times");
	        $('button.navicon').attr( "aria-label", "Close Mobile Menu");
	    }
	});

	//$('.mobile_nav .exit').click(function() {
		//$('.mobile_nav').hide().attr('aria-hidden', 'true');
		//$('.mobile_screen').attr('aria-hidden','true').hide();
		//$("body").css({'overflow':'auto','height':'auto'});
	//});

	var hoverTimeout;
    $('.nav .drop_trigger').hover(function() {
        clearTimeout(hoverTimeout);
        $(this).addClass('open').find('.drop_menu').attr('aria-hidden', 'true').attr('aria-expanded', 'false');
        $('.drop_trigger').not(this).removeClass("open");
    }, function() {
        var $self=$(this);
        hoverTimeout = setTimeout(function() {
            $self.removeClass('open').find('.drop_menu').attr('aria-hidden', 'true').attr('aria-expanded', 'false');
        }, 250);
    });

    $('.nav .drop_trigger > a').focusin(function() {
        var parent = $(this).parent();
        parent.addClass('open').find('.drop_menu').attr('aria-hidden','false').attr('aria-expanded', 'true');
        $('.drop_trigger').not(parent).removeClass("open");
    });

    $('.nav .drop_menu a:last,.nav .drop_menu input').focusout(function() {
        var parent = $(this).parents().find('.drop_trigger');
        parent.removeClass('open').find('.drop_menu').attr('aria-hidden','true').attr('aria-expanded', 'false');
    });

    $('.mobile_nav > .drop_trigger > *').click(function(){
        var parent = $(this).closest('.drop_trigger');
        var icon = parent.find('.drop_trigger_icon');
        var aonclick = parent.find('a:first').is('[onclick]');
        if($(this).is('a')){
            if(aonclick === true){
            	$('.drop_trigger').not(parent).removeClass("open").find('i').attr( "class", "fal fa-plus");
            	parent.toggleClass("open");
                if(parent.hasClass('open')){
                    $(icon).find('i').attr( "class", "fal fa-minus");
                }else{
                    $(icon).find('i').attr( "class", "fal fa-plus");
                }
            }
        }
        if($(this).hasClass('drop_trigger_icon')){
            parent.toggleClass("open");
    		$('.mobile_nav > .drop_trigger').not(parent).removeClass("open").find('i').attr( "class", "fal fa-plus");
            if(parent.hasClass('open')){
                $(icon).find('i').attr( "class", "fal fa-minus");
                $('.open > .drop_menu').attr('aria-hidden','false');
            }else{
                $(icon).find('i').attr( "class", "fal fa-plus");
                $('.drop_menu').attr('aria-hidden','true');
            }
        }
    });

	$('button.mobile_closer').click(function(){
	    $('.mobile_nav').fadeOut(100).attr('aria-hidden', 'true').attr('aria-expanded', 'false');
		$('body,html').css({'overflow':'auto','height':'auto'});
		$('.headerWrap').css({'position':'relative','z-index':'0'});
		$('.navicon').find('i').attr( "class", "fal fa-bars");
		$('button.navicon').attr( "aria-label", "Open Mobile Menu");
	});

//Slideshow
$('.slideshow').slick({
  autoplay: true,
  autoplaySpeed: 5000,
  dots: true,
  infinite: true,
  fade: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow:'<button class="prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
  nextArrow:'<button class="next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
});

$(window).on('load resize orientationchange', function() {
    $('.mobile_slider').each(function(){
    var $carousel = $(this);
        if ($(window).width() > 600) {
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        }
        else{
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    prevArrow:'<button class="slide_nav prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
                    nextArrow:'<button class="slide_nav next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
                });
            }
        }
    });
});

$('.slide').each(function(){
    $(this).removeAttr("aria-describedby");
});
