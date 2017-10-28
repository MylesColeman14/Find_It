var formshowing = false;

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
	$("#weather_report").show();
	$("#listing-display").show();
}