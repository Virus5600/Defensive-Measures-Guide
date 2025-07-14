/// Fragment Link
///
/// This script is used to scroll smoothly to the target element when a link with a hash is
/// clicked. It also includes an optional history state push when the link has the attribute
/// [data-fl-history]. This is useful when you want to include the scroll position in the
/// browser history.
///
/// The `data-fl-history` attribute can be set to `true` or `1` to include the history state.
/// Using any other value will exclude the history state.
///
/// Example:
/// ```html
/// <a href="#section-1" data-fl-history>Go to Section 1</a>
/// ```
///
/// The above example will scroll to the element with the ID `section-1` and include the
/// scroll position in the browser history.
///
/// Note: This script is only for internal links. External links will not be affected.
///
/// @author Virus5600
/// @version 1.0.0

document.addEventListener('DOMContentLoaded', () => {
	let pushState = false;
	if (document.body.hasAttribute('data-fl-history')) {
		let dhVal = document.body.getAttribute('data-fl-history');

		switch (dhVal) {
			case "true":
			case "1":
			case "":
				pushState = true;
				break;

			default:
				pushState = false;
				break;
		}
	}

	document.querySelectorAll(`a[href^="#"]`).forEach(anchor => {
		// Defines the local push state setting. Null means it will use the global setting.
		let localPushState = null;
		if (anchor.hasAttribute('data-fl-history')) {
			let dhVal = anchor.getAttribute('data-fl-history');

			switch (dhVal) {
				case "true":
				case "1":
				case "":
					localPushState = true;
					break;

				default:
					localPushState = false;
					break;
			}
		}

		// Add the global push state setting to the element
		anchor.fragmentLink = {
			pushState: {
				global: pushState,
				local: localPushState
			}
		};

		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const EL = e.target;
			const TARGET = document.querySelector(EL.getAttribute('href'));

			TARGET.scrollIntoView({
				behavior: 'smooth'
			});

			let shouldPushState = EL.fragmentLink.pushState.global;

			if (EL.fragmentLink.pushState.local !== null) {
				shouldPushState = EL.fragmentLink.pushState.local;
			}

			if (shouldPushState) {
				history.pushState(null, null, EL.getAttribute('href'));
				window.location.hash = EL.getAttribute('href');
			}
		});
	});
});
