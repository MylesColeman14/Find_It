let map;
let service;
let infowindow;
let pyrmont;
let myLocation;
let localPosition;
let content;
let priceChoice = 5;

$(document).ready(function(){
    initialize();
})


function initialize() {
  getPosition()
  .then((position) => {
      createMap(position, createMarker);
  })
  .catch((err) => {
      console.error(err.message);
  });


  function createMap(position, callbackMarker){
    localPosition = position;
    pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

    /*$('#find-button').on('click', function(){
      console.log($('#start-location').val().trim());
      let request = {
        location: pyrmont,
        radius: '5000',
        keyword: [$('#start-location').val().trim()]
      };

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, callback);
    })*/

    content = 'My Location';

    callbackMarker(localPosition, content, map);
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
}


$('.advance').on('click', function(){
})







