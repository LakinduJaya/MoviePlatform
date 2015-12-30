$(".movie_synopsis").trunk8({
	fill : "<a id='read-more' href='#'>...Read More</a>",
	lines : 3
});

$(document).on('click', '#read-more', function(event){
	$(this).parent().trunk8('revert').append("<a id='read-less' href='#'> Read Less </a>");
	return false;
});

$(document).on('click', '#read-less', function(event){
	$(this).parent().trunk8();
	return false;
});