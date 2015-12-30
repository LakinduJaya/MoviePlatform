/*******************************************
Navigation 
********************************************/
//Hide the main logo
//Fading in the main logo slowly

$('#main-logo h1').hide().show('slow');

$("#menu").slicknav({
	label: "Menu",
	duration: 500
});

/*******************************************
Footer 
********************************************/

$(".classysocial").ClassySocial();