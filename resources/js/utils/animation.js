document.addEventListener(`DOMContentLoaded`, () => {
	// ANIMATION HANDLER
	document.addEventListener(`animationend`, (e) => {
		if (e.target.classList.contains(`delay-animation`)) {
			let bodyStyle = e.target.style;

			if (bodyStyle.removeAttribute)
				bodyStyle.removeAttribute(`--anim-delay`);
			else
				bodyStyle.removeProperty(`--anim-delay`);

			e.target.classList.remove(`delay-animation`);
		}
	});
});
