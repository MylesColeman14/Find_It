//let apiKey = 'AIzaSyAWFIyP0ivtZCbMWaqdl7sYS-IIDJkGQHs';
//let transitMode = ''
function locationInput(){
	let startLocation = $("#start-location").val().trim();
	let endLocation = $("#end-location").val().trim();
	getDirections(startLocation,endLocation);

	console.log("Location input:"+startLocation+ "+"+endLocation);
}
//function changeTravel(){
	//$(this).attr('src', $(this).attr('data-animate'))
//	transitMode = $(this).value;
//}
$(document).on("click", "#find-button", locationInput);

//$(document).on("click", ".transit-mode", changeTravel);



	
