/***************************************
Gallery page
****************************************/

//Problem: When the user clicks on an image, they go to a dead end
//Solution: Create an overlay with the large image - LightBox


var $overlay = $("<div id='overlay'></div>");
var $image = $("<img>");
var $caption = $("<h2></h2>");

//Append caption to overlay
$($overlay).append($caption);
//Append image to overlay
$($overlay).append($image);
//Append the overlay to the body of the document
$("body").append($overlay);




//When the user clicks the link on an image
$("#gallery a").click(function(event){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	//Update overlay with the image linked in the link
	$image.attr("src", imageLocation);
	//Show the overlay
	$overlay.show();
	//Get the child's alt attribute and set it as the caption for the image
	var captionText = $(this).children('img').attr('alt');
	$caption.text(captionText);
});

	
//When the user clicks the overlay
$($overlay).click(function(){
	//Hide the overlay
	$overlay.hide();
});