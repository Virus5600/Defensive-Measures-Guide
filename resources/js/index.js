// Slick Carousel
require('./libs/jQuery');
require('./libs/slick');

$(document).ready(function() {
	$('.carousel').slick({
		autoplay: true,
		infinite: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: true,
		draggable: false,
		pauseOnHover: true
	});
});