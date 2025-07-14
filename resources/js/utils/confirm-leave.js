if (!Swal)
	throw Error('Sweetalert2 not instantiated. Please include the said library (https://sweetalert2.github.io/).');

/**
 * Warns the user that they're leaving without saving their changes.
 * @param {string} urlTo String value. The page they're attempting to open. Required.
 * @param {string} title String value. The title of the warning. Default is "Are you sure?".
 * @param {string} message String value. The message of the warning. Default is "You might have unsaved changes.".
 */
function confirmLeave(urlTo, title = "Are you sure?", message = "You might have unsaved changes.") {
	Swal.fire({
		icon: 'warning',
		html: `<h4>${title}</h4><p>${message}</p>`,
		showDenyButton: true,
		confirmButtonText: 'Yes',
		denyButtonText: 'No',
		customClass: {
			confirmButton: 'override-style btn btn-danger',
			denyButton: 'override-style btn btn-secondary',
		},
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = urlTo;
		}
	});
}

/**
 * Warns the user that they're submitting a form. Used for API calls and regular form
 * submissions. This function is asynchronous to allow awaiting of the value returned by the
 * confirmLeaveApi function. If the user confirms, the form will be submitted. Otherwise, it will
 * not.
 *
 * @param {HTMLFormElement} form HTML Form Element. The form to be submitted.
 * @param {string} title String value. The title of the warning.
 * @param {string} message String value. The message of the warning.
 */
async function confirmFormSubmit(form, title = "Are you sure?", message = "You might have unsaved changes.") {
	// Support for DOS (Disable on Submit) library by Virus5600.
	var hasDOS = typeof DOS === "function";

	confirmLeaveApi(title, message).then((result) => {
		if (result.isConfirmed) {
			form.dataset.clFormSubmitOngoing = 'true';

			if (hasDOS) {
				let instanceDOS = DOS.getInstance(form);

				if (!["undefined", null].includes(instanceDOS)) {
					instanceDOS.triggerEffect();
				}
			}

			form.submit();
		}
		else {
			if (hasDOS) {
				let instanceDOS = DOS.getInstance(form);

				if (["undefined", null].includes(instanceDOS))
					instanceDOS.revertFormChanges();
			}
		}
	});
}

/**
 * Warns the user that they're resetting a form.
 *
 * @param {HTMLFormElement} form HTML Form Element. The form to reset. Required.
 * @param {string} title String value. The title of the warning. Default is "This will reset the form.".
 * @param {string} message String value. The message of the warning. Default is "Are you sure you want to reset the form?".
 */
async function confirmFormReset(form, title = "This will reset the form.", message = "Are you sure you want to reset the form?") {
	confirmLeaveApi(title, message).then((result) => {
		if (result.isConfirmed) {
			form.reset();
		}
	});
}

/**
 * Warns the user that they're leaving without saving their changes. Used for API calls and thus, is created as an asynchronous function to allow awaiting of value.
 * @param {string} title String value. The title of the warning. Default is "Are you sure?".
 * @param {string} message String value. The message of the warning. Default is "You might have unsaved changes."
 */
async function confirmLeaveApi(title = "Are you sure?", message = "You might have unsaved changes.") {
	return Swal.fire({
		icon: 'warning',
		html: `<h4>${title}</h4><p>${message}</p>`,
		showDenyButton: true,
		confirmButtonText: 'Yes',
		denyButtonText: 'No',
		customClass: {
			confirmButton: 'override-style btn btn-danger',
			denyButton: 'override-style btn btn-secondary',
		},
	}).then((result) => {
		return result;
	});
}

// Automatically add event listeners to all forms with the data-cl-form attribute.
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(`[data-cl-form]`).forEach((form) => {
		// For submitting forms
		if (form.hasAttribute(`data-cl-form-submit`))
			form.addEventListener('submit', (e) => {
				if (form.dataset.clFormSubmitOngoing !== 'true') {
					e.preventDefault();
					e.stopPropagation();

					confirmFormSubmit(form, form.dataset.clFormSubmitTitle, form.dataset.clFormSubmitMessage);
				}
			});

		// For resetting forms
		if (form.hasAttribute(`data-cl-form-reset`))
			form.addEventListener('reset', (e) => {
				if (form.dataset.clFormResetOngoing === 'true') {
					form.removeAttribute('data-cl-form-reset-ongoing');
					return;
				}
				e.preventDefault();
				e.stopPropagation();

				form.setAttribute('data-cl-form-reset-ongoing', 'true');

				confirmFormReset(
					form,
					form.dataset.clFormResetTitle,
					form.dataset.clFormResetMessage
				);
			});
	});
}, { once: true });

// Automatically add event listeners to all items with the data-cl-leave attribute.
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(`[data-cl-leave]`).forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();

			confirmLeave(
				item.dataset.clLeaveHref ?? item.href,
				item.dataset.clLeaveTitle,
				item.dataset.clLeaveMessage
			);
		});
	});
}, { once: true });
