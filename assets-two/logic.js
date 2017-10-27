function sidebarslide() {
	event.preventDefault();
	// Code for Safari
    document.getElementById("side-bar").style.WebkitTransform = "translateX(-200px)";
    // Code for IE9
    document.getElementById("side-bar").style.msTransform = "translateX(-200px)";
    // Standard syntax
    document.getElementById("side-bar").style.transform = "translateX(-200px)";
    document.getElementById("side-bar").style.width = "0px";
    $("#submit").hide();
    $("#weather_report").show();
    $("#listing-display").show();
}