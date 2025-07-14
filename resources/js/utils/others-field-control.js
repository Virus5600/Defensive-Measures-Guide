document.addEventListener('DOMContentLoaded', () => {
	const OFC = (parent) => {
		// Constants
		const PARENT = parent;
		const TARGETS = PARENT.getAttribute('data-ofc-targets');
		delete parent;

		const DEBUG = PARENT.getAttribute('data-ofc-debug') ?
			PARENT.getAttribute('data-ofc-debug') == 'true' : false;

		if (DEBUG) {
			console.log({
				parent: PARENT,
				targets: TARGETS,
				checked: PARENT.checked,
			});
		}
		document.querySelectorAll(TARGETS).forEach((target) => {
			// If the parent is checked
			if (PARENT.checked) target.removeAttribute('disabled');
			// If the parent is unchecked
			else target.setAttribute('disabled', 'disabled');
		});
	};

	document.querySelectorAll(`[data-ofc-parent]`).forEach((parent) => {
		// Add Event Listener
		parent.addEventListener('change', () => {
			OFC(parent);
		});

		// Add Event Listener for the other radio buttons if it is a radio button
		if (parent.getAttribute('type') === 'radio') {
			document.querySelectorAll(`[name="${parent.getAttribute('name')}"]`).forEach((sibling) => {
				sibling.addEventListener('change', () => {
					OFC(parent);
				});
			});
		}
	});
});
