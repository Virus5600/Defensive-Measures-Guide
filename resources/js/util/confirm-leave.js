if (!Swal)
	throw Error('Sweetalert2 not instantiated. Please include the said library (https://sweetalert2.github.io/).');

/**
 * Warns the user that they're leaving without saving their changes.
 * @param urlTo String value. The page they're attempting to open.
 * @param title String value. The title of the warning.
 * @param message String value. The message of the warning.
 */
function confirmLeave(urlTo, title = "Are you sure?", message = "You might have unsaved changes.") {
	Swal.fire({
		icon: 'warning',
		html: `<h4>${title}</h4><p>${message}</p>`,
		showDenyButton: true,
		confirmButtonText: 'Yes',
		denyButtonText: 'No'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location.href = urlTo;
		}
	});
}

async function confirmFormSubmit(form, title = "Are you sure?", message = "You might have unsaved changes.") {
	confirmLeaveApi(title, message).then((result) => {
		if (result.isConfirmed) {
			form.submit();
		}
	});
}

/**
 * Warns the user that they're leaving without saving their changes. Used for API calls and thus, is created as an asynchronous function to allow awaiting of value.
 * @param title String value. The title of the warning.
 * @param message String value. The message of the warning.
 */
async function confirmLeaveApi(title = "Are you sure?", message = "You might have unsaved changes.") {
	return Swal.fire({
		icon: 'warning',
		html: `<h4>${title}</h4><p>${message}</p>`,
		showDenyButton: true,
		confirmButtonText: 'Yes',
		denyButtonText: 'No'
	}).then((result) => {
		return result;
	});
}

// Automatically add event listeners to all forms with the data-cl-form attribute.
document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll(`[data-cl-form]`).forEach((form) => {
		form.addEventListener('submit', (e) => {
			e.preventDefault();
			e.stopPropagation();

			confirmFormSubmit(form, form.dataset.clFormTitle, form.dataset.clFormMessage);
		});
	});
}, {once: true});
