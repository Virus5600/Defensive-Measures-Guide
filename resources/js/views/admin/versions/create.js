$(() => {
	const editor = {};
	const state = {original: history.state?.original ?? $(`form#form-content`).html()};

	// Description MD Editor
	let desc = $(`#description`);
	editor.description = new Editor({
		el: desc[0],
		initialEditType: 'markdown',
		theme: 'dark',
		placeholder: 'Description',
		initialValue: $(`#description_hidden`).val(),
		autofocus: false,
		events: {
			blur: () => {
				document.getElementById(`description_hidden`)
					.value = editor.description.getMarkdown();
			}
		}
	});
	$(document).on(`blur`, `#description_hidden`, (e) => {
		editor.description.setMarkdown(e.currentTarget.value);
	});
	if ($(`#description_hidden`).val().length > 0) {
		$(`#description_hidden`).trigger(`blur`);
	}

	desc.find('*')
		.addClass(`font-minecraftia`);

	// Submit Handler
	$(document).on('click', 'form#form-content [type=submit]', (e) => {
		e.preventDefault();
		let target = $(`#description_hidden`);
		target.removeClass(`d-none`);

		// Handles the form-validation of BS5 for the description
		if (target.is(`:valid`)) {
			$(editor.description.options.el)
			.addClass('is-valid')
			.removeClass('is-invalid');
		}
		else if (target.is(`:invalid`)) {
			$(editor.description.options.el)
			.addClass('is-invalid')
			.removeClass('is-valid');
		}
		else {
			$(editor.description.options.el)
			.removeClass('is-valid')
			.removeClass('is-invalid');
		}

		target.addClass(`d-none`);
	});

	$(document).on(`dos-done`, `form#form-content`, (e) => {
		let form = $(e.currentTarget);

		$(`#description_hidden`).addClass(`d-none`);

		// Stores the current state of the form...
		state.content = form.html();
		window.history.replaceState(
			state,
			"",
			window.location.href
		);

		// Submit the form if it is valid
		if (form[0].reportValidity()) {
			form.trigger('submit');
		}
	});

	// Return Handler
	$(document).on('click', '[data-return]', (e) => {
		let target = $(e.currentTarget).data('return');
		confirmLeave(target);
	});

	// Reset Handler
	$(document).on('click', '[type=reset]', (e) => {
		editor.description.setMarkdown('');
		SwalFlash.info("Form reset!");
	});

	// Changelog Handler
	$(document).on('click', `#addAdd, #addMod, #addRem`, (e) => {
		let obj = $(e.currentTarget);
		let log = obj.attr('id').substring(3).toLowerCase();
		let target = $(`#${log}`);

		let html = `
		<div class="row my-3 justify-content-center">
			<div class="col-1 d-flex justify-content-center align-items-center">
				<button type="button" class="remove-button-style log-remover" title="Remove Entry">
					<i class="fas fa-circle-minus text-danger"></i>
				</button>
			</div>

			<div class="col-10">
				<input type="text" class="form-control" name="${log}[]" required>
			</div>
		</div>
		`;

		target.append(html);
	});

	// Log Remover Handler
	$(document).on('click', `.log-remover`, (e) => {
		$(e.currentTarget).closest('.row').remove();
	});

	// Compatibility Handler
	$(document).on('click', `#addBedrock, #addJava`, (e) => {
		let obj = $(e.currentTarget);
		let ver = obj.attr('id').substring(3).toLowerCase();
		let target = $(`#${ver}`);

		let html = `
		<div class="col-6 col-lg-4 py-3 version-entry">
			<div class="input-group">
				<button type="button" class="btn btn-danger entry-remover d-flex justify-content-center align-items-center" title="Remove Entry">
					<i class="fas fa-minus"></i>
				</button>

				<input type="text" class="form-control" name="${ver}[]" required pattern="(^\\d{1,3})(\\.)(\\d{1,3})(\\.(?=\\d{1,3})\\d{1,3})?$">
			</div>
		</div>
		`;

		target.append(html);
	});

	// Version Remover Handler
	$(document).on(`click`, `.entry-remover`, (e) => {
		$(e.currentTarget).closest(`.version-entry`).remove();
	});

	// Download Link Handler
	$(document).on('click', `#addBedrockLink, #addJavaLink`, (e) => {
		let obj = $(e.currentTarget);
		let ver = obj.attr('id').substring(3).toLowerCase();
			ver = ver.substring(0, ver.indexOf('link'));
		let target = $(`#${ver}DL`);

		let html = `
		<div class="row my-3">
			<div class="col-2 d-flex justify-content-center align-items-center">
				<button type="button" class="remove-button-style link-remover" title="Remove Entry">
					<i class="fas fa-circle-minus text-danger"></i>
				</button>
			</div>

			<div class="col-5">
				<input type="text" class="form-control" name="${ver}DL[]" placeholder="URL" required>
			</div>

			<div class="col-5">
				<input type="text" class="form-control" name="${ver}DLW[]" placeholder="Website" required>
			</div>
		</div>
		`;

		target.append(html);
	});

	// Download Link Remover Handler
	$(document).on('click', `.link-remover`, (e) => {
		$(e.currentTarget).closest('.row').remove();
	});

	// Restores the form to its original state if refreshed. If not,
	// it restores the recent state of the form. Very useful for when
	// the user clicks the back button.
	if (isPageRefreshed() && history.state?.original) {
		state.content = history.state.original;
		$(`form#form-content`).html(state.content);
		window.history.replaceState(
			state,
			"",
			window.location.href
		);
	}
	else if (history.state?.content) {
		$(`form#form-content`).html(history.state.content);
	}

	// Hide all hidden forms once more if they were hidden before
	$(`form#form-content`).find(`select, input, textarea`)
			.css('visibility', '')
			.css('opacity', '')
			.css('display', '')
			.removeAttr('data-dos-invisible');

	// Enables all disabled buttons...
	$(`[data-dos-clicked=true]`).each((k, v) => {
		let btn = $(v);

		btn.html(`${btn.data("dos-prev")}`)
			.removeClass(`disabled cursor-default`)
			.attr('data-dos-clicked', 'false')
			.attr('data-dos-prev');
	});
});
