/*********************************************
Home page
*******************************************/
swal({
	title : "Welcome to MoviePlatform",
	text : "The World's Premier Movie Publication",
	allowEscapeKey : true,
	imageUrl : "img/film_icon.png",
	imageSize : "100x100"
});

$(".slider").unslider({
	autoplay : true,
	speed : 800,
	delay : 5000
});