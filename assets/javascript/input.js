
var formshowing = false;
function locationInput(){
	event.preventDefault();
    
    console.log(getTweets($("#end-location").val().trim()))
    if($("#start-location").val().trim() != "Current Location")
    {
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
      service.nearbySearch(request, Inputcallback);
    }
}
function getTweets(keyWord){

	queryURL= "http://localhost:8001/"+keyWord;
	$.ajax({
            url : queryURL,
            method : "GET",
        })
        .done(function(response){
            console.log(response.split(',break,'));
            return response;
        });
}


function showform() {
	if (formshowing === false) {
		formshowing === true;
		$('.tap-target').tapTarget('open');
	}

	else if (formshowing === true) {
		$('.tap-target').tapTarget('close');
	}
}

function submission () {
	event.preventDefault();
	$("#weather-display").show();
	$("#twitter-display").show();
	$('.tap-target').tapTarget('close');
}
function Inputcallback(results, status) {
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
      }
    }
  }

$(document).on("click", "#find-button", locationInput);
$(document).on("click", "#menu", showform);



	