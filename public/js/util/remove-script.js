document.addEventListener(`DOMContentLoaded`, () => {
	document.querySelectorAll(`[data-remove-script]`).forEach((element) => {
		let attVal = element.dataset.removeScript;

		if (attVal.length > 0 && !isNaN(parseInt(attVal))) {
			setTimeout(() => {
				element.remove();
			}, parseInt(attVal) * 1000);
		}
		else {
			element.remove();
		}
	});
});
