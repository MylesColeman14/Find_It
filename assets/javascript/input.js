//let apiKey = 'AIzaSyAWFIyP0ivtZCbMWaqdl7sYS-IIDJkGQHs';
//let transitMode = ''
function locationInput(){
	event.preventDefault();
	
	//getDirections(startLocation,endLocation);

	
	
    
    if($("#start-location").val().trim() != "Current Location")
    {
    	//event.preventDefault();
    	submission();
    	let startLocation = $("#start-location").val().trim();
		let endLocation = $("#end-location").val().trim();
		console.log("Location input: "+startLocation+ " + "+endLocation);
    	getDirections(startLocation,endLocation);
    }else if($("#start-location").val().trim() === "Current Location")
    {
    	submission();
    	let endLocation = $("#end-location").val().trim();
    	console.log("Destination input: "+endLocation);
    	let request = {
        location: pyrmont,
        radius: '5000',
        keyword: [$('#end-location').val().trim()]
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    }
}
function callback(results, status) {
    console.log(results);
    let bounds = new google.maps.LatLngBounds();

    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        let content = {
          name: results[i].name,
          priceLevel:results[i].price_level,
          rating:results[i].rating,
          isOpen:results[i].opening_hours.open_now
        }

        let markerLocation ={
          coords: {
            latitude: place.geometry.viewport.f.b,
            longitude: place.geometry.viewport.b.b,
          }
        }
        var myLatLng = new google.maps.LatLng(markerLocation.coords.latitude, markerLocation.coords.longitude);
        bounds.extend(myLatLng);
        map.fitBounds(bounds);
        
        console.log(content);
        createMarker(markerLocation, content.name, map);
        /*priceChoice = $("#price-range").val().trim();
        for(let j=0; j<results.length;j++){
          if(content.isOpen){
            if(content.priceLevel <= priceChoice){
              createMarker(markerLocation, content.name, map);
            }  
          } 
        }*/
      }
    }
  }
//function changeTravel(){
	//$(this).attr('src', $(this).attr('data-animate'))
//	transitMode = $(this).value;
//}
$(document).on("click", "#find-button", locationInput);
$(document).on("click", "#menu", showform);
//$(document).on("click", "#menu", showform);

//$(document).on("click", ".transit-mode", changeTravel);



	