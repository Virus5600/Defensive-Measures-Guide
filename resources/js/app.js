try {
	// Setting user language
	window.lang = (window.navigator.userLanguage || window.navigator.language);

	// Bootstrap 5.3
	require('./libs/bootstrap5');

	// Sweetalert 2
	require('./libs/swal');

	// Fontawesome 6
	require('./libs/fontawesome');
} catch (ex) {
	console.error(ex);
}