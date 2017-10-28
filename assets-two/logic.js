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