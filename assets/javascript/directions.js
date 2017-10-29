let startLocation, endLocation;
var markerArray = [];
let stepDisplay = new google.maps.InfoWindow;
function getDirections(start, end) {
    console.log("Start: "+start);
    console.log("End: "+end);
    startLocation = start;
    endLocation = end;

    directionsDisplay = new google.maps.DirectionsRenderer();
    let chicago = new google.maps.LatLng(41.850033, -87.6500523);
    let mapOptions = {
    zoom:7,
    center: chicago
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);

    directions();
}

function directions(){
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    

    calculateAndDisplayRoute(directionsService, directionsDisplay);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: startLocation,
        destination: endLocation,
        travelMode: 'DRIVING'
    }, 
    function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log(response);
            showSteps(response, markerArray, stepDisplay, map);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });

    directionsDisplay.setMap(map);
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.
    var myRoute = directionResult.routes[0].legs[0];
    for (var i = 0; i < myRoute.steps.length; i++) {
        var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
        marker.setMap(map);
        marker.setPosition(myRoute.steps[i].start_location);
        attachInstructionText(stepDisplay, marker, myRoute.steps[i].instructions, map);
    }
}
function attachInstructionText(stepDisplay, marker, text, map) {
    google.maps.event.addListener(marker, 'click', function() {
        // Open an info window when the marker is clicked on, containing the text
        // of the step.
        stepDisplay.setContent(text);
        stepDisplay.open(map, marker);
    });
}
