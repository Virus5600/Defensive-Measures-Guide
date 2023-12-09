$(() => {
	// Change submit to either "Updating" or "Submitting" after click
	$(document).on('click', '[type=submit], [data-action]', (e) => {
		let btn = $(e.currentTarget);
		let action = btn.attr('data-action');
		let parentForm = btn.closest("form");

		// Checks if there's a 'needs-validation' class
		if (!parentForm.hasClass("needs-validation")) {
			// if there's none, add the class
			parentForm.addClass('needs-validation');
		}

		// Makes all the form elements visible
		parentForm.find(`select, input, textarea`)
			.attr('style', (i, s) => {
				return (s || '') + 'visibility: visible!important; opacity: 1!important; display: block!important;';
			})
			.data('dos-invisible', 'true');

		// Checks if there's a novalidate prop
		if (typeof parentForm[0].novalidate == 'undefined' || typeof parentForm[0].formnovalidate == 'undefined') {
			// if there's none, default the prop to true
			parentForm.prop("novalidate", true);
			parentForm.attr("novalidate", true);

			parentForm.prop("formnovalidate", true);
			parentForm.attr("formnovalidate", true);
		}

		// Checks for an id
		if (typeof parentForm.attr("id") == 'undefined') {
			// If there's no id, generate one
			parentForm.attr("id", `disableOnSubmit${Math.random().toString(16).slice(2)}`);
		}

		// If this button is already clicked
		if (btn.attr('data-dos-clicked') == 'true') {
			// Prevent the event from being triggered once more
			e.preventDefault();
			e.stopPropagation();
		}
		// Otherwise...
		else {
			// Store previous button content
			btn.attr("data-dos-prev", btn.html());

			// Update inner html to the designated action text and spinner
			if (action == 'update')
				btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div> Updating...`);
			else if (action == 'filter')
				btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div> Filtering...`);
			else if (action == 'login')
				btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div> Logging in...`);
			else if (action == 'submit')
				btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div> Submitting...`);
			else if (action == 'icon-search')
				btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div>`);

			// Used when the button does not have an action or does not match anything from above.
			else {
				let btnLabel = btn.attr('data-dos-disabled-label') ?? btn.attr('data-dos-label');
				let isHTML = btn.attr('data-dos-is-html') ?? false;

				if (typeof btnLabel === "undefined")
					btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div> Submitting...`);
				else {
					if (isHTML)
						btn.html(btnLabel);
					else
						btn.html(`<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div> ${btnLabel}...`);
				}
			}

			btn.addClass(`disabled cursor-default`);
			btn.attr('data-dos-clicked', 'true');
		}

		// If continuous validation, uses the pseudo selectors, otherwise, uses the classes
		if (parentForm.attr("data-continuous-validation") == 'true')
			parentForm.addClass('was-validated');

		// Check if form is valid or not. Enter the if scope if it isn't valid
		showValidity = parentForm.attr('data-dos-show-validity') ?? false;
		showValidity = showValidity == 'true' || showValidity == '' ? true : false;
		if (!document.forms[parentForm.attr('id')].reportValidity() || showValidity) {
			if (!document.forms[parentForm.attr('id')].reportValidity())
				console.log("Form is not valid");

			e.preventDefault();
			e.stopPropagation();

			// If not, proceed to redo the earlier changes so button can be used to submit again
			btn.html(`${btn.data("dos-prev")}`)
				.removeClass(`disabled cursor-default`)
				.attr('data-dos-clicked', 'false')
				.attr('data-dos-prev');

			parentForm.find(":invalid")
				.not(".dont-validate")
				.addClass("is-invalid")
				.removeClass("is-valid")
				.closest(".form-control:not(.bootstrap-select > select)")
				.addClass("is-invalid")
				.removeClass("is-valid");

			parentForm.find(":valid")
				.not(".dont-validate")
				.addClass("is-valid")
				.removeClass("is-invalid")
				.closest(".form-control:not(.bootstrap-select > select)")
				.addClass("is-valid")
				.removeClass("is-invalid");

			parentForm.removeClass(".was-validated")
				.find(".dont-validate")
				.removeClass("is-valid is-invalid")
				.closest(".form-control")
				.removeClass("is-valid is-invalid");
		}

		// Makes all the form elements visible
		parentForm.trigger('dos-done')
			.find(`select, input, textarea`)
			.css('visibility', '')
			.css('opacity', '')
			.css('display', '')
			.removeAttr('data-dos-invisible');
	});

	$('form').on('submit', (e) => {
		if (!e.target.reportValidity())
			$(e.target).find('[type=submit]')
				.trigger('click');
	});
});
