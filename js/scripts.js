// Scrollmagic Animations
$(document).ready(function() {
    var controller = new ScrollMagic.Controller;
    $(".events, .features, .locations").each(function() {
        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.75,
            reverse: false
        }).setClassToggle(this, "active").addTo(controller)
        .addTo(controller);
    })
});

//Features heading spacing
var features = document.querySelectorAll('.features .item .title');

for (var i = 0; i < features.length; i++) {
    var text = features[i].innerHTML;
        text = text.split(' ');

    var whole = '';
    for(var t = 0; t < text.length; t++) {
        var word = text[t];
        if (word.length > 3 && t > 0) {
            whole = whole+' <br>'+word;
        } else {
            whole = whole+ ' '+word;
        }
    }
    features[i].innerHTML = whole;
}

//Open/Closed/Closing Status
document.addEventListener('DOMContentLoaded', function() {
    var today = moment().format('YYYY-MM-DD');
    var holidays = '2019-01-01, 2019-01-21, 2019-02-18, 2019-03-05, 2019-05-27, 2019-07-04, 2019-08-16, 2019-09-02, 2019-11-11, 2019-11-28, 2019-12-25';
        holidays = holidays.split(',');
    var time = moment().format('Hmm'), day = moment().isoWeekday();

    //Checks if today is in holidays array, triggered closed if true
    if (holidays.includes(today)) {
        statusClosed(document.querySelector('.locations .item:first-of-type .status'))
        statusClosed(document.querySelector('.locations .item:last-of-type .status'))
        return
    }

    // 1 [Monday] - 7 [Sunday] // Time in MILITARY format
    updateStatus(document.querySelector('.locations .item:first-of-type .status'), 2, 7, 1000, 1600);
    updateStatus(document.querySelector('.locations .item:last-of-type .status'), 1, 6, 900, 1600);

    //Updates the status based on params
    function updateStatus(element, startDay, endDay, startTime, endTime) {
        if (day >= startDay && day < endDay && time >= startTime && time < endTime) {
            statusOpen(element)
        } else {
            statusClosed(element)
        }
    }
    //Add a status of open
    function statusOpen(element) {
        element.classList.add('open');
        element.childNodes[2].textContent = 'Open';
    }
    //Add a status of closed
    function statusClosed(element) {
        element.classList.add('closed');
        element.childNodes[2].textContent = 'Closed';
    }
})

//Search
const searcher = document.getElementById('searcher');
const search = document.getElementById('search');
const searchContainer = document.querySelector('.search_wrap');

searcher.addEventListener('click', function() {
    if (searcher.classList.contains('active')) {
        searcher.classList.remove('active');
        searchContainer.classList.remove('active');
    } else {
        searcher.classList.add('active');
        searchContainer.classList.add('active');
        search.focus();
    }
})

//Submit on Enter of search input
search.addEventListener('keypress', function(e) {
    e = e || window.event;
    if(e.keyCode === 13) {
        //document.getElementById('search-form').submit();
    }
})


// Sticky Header
window.addEventListener('scroll', function() {
    stickyHeader()
})

// Get the navbar
let header = document.querySelector('.headerWrap');

// Get the offset position of the navbar
const sticky = header.offsetTop;
const stickyHeight = header.offsetHeight;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyHeader() {
  if (window.pageYOffset >= (sticky + stickyHeight / 2)) {
    header.classList.add('sticky')
  } else {
    header.classList.remove('sticky');
  }
}

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

// Events
// $('.events .group').slick({
//   autoplay: true,
//   autoplaySpeed: 5000,
//   dots: true,
//   infinite: true,
//   fade: false,
//   speed: 700,
//   slidesToShow: 3,
//   slidesToScroll: 3,
//   prevArrow:'<button class="prev" title="Previous Slide"><i class="fal fa-chevron-left"></i></button>',
//   nextArrow:'<button class="next" title="Next Slide"><i class="fal fa-chevron-right"></i></button>'
// });
