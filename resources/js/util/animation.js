$(() => {
	// ANIMATION HANDLER
	$(document).on(`animationend`, `.delay-animation`, (e) => {
		console.log(e.target);
		let bodyStyle = e.target.style;

		if (bodyStyle.removeAttribute)
			bodyStyle.removeAttribute('--anim-delay');
		else
			bodyStyle.removeProperty('--anim-delay');

		$(e.target).removeClass(`delay-animation`);
	});
});
