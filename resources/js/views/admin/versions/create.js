$(() => {
	const editor = {};

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
	$(`#description_hidden`).on(`blur`, (e) => {
		console.log(e.currentTarget.value);
		editor.description.setMarkdown(e.currentTarget.value);
	});
	if ($(`#description_hidden`).val().length > 0) {
		$(`#description_hidden`).trigger(`blur`);
	}

	desc.find('*')
		.addClass(`font-minecraftia`);

	// Submit Handler
	$('form [type=submit]').on('click', (e) => {
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

	$(`form`).on(`dos-done`, (e) => {
		let form = $(e.currentTarget);

		if (form[0].reportValidity()) {
			form.trigger('submit');
		}
	});

	// Return Handler
	$('[data-return]').on('click', (e) => {
		let target = $(e.currentTarget).data('return');
		confirmLeave(target);
	});

	// Reset Handler
	$('[type=reset]').on('click', (e) => {
		editor.description.setMarkdown('');
		SwalFlash.info("Form reset!");
	});

	// Changelog Handler
	$(`#addAdd, #addMod, #addRem`).on('click', (e) => {
		let obj = $(e.currentTarget);
		let log = obj.attr('id').substring(3).toLowerCase();
		let target = $(`#${log}`);

		let html = `
		<div class="row my-3">
			<div class="col-2 d-flex justify-content-center align-items-center">
				<button type="button" class="remove-button-style log-remover" title="Remove Entry">
					<i class="fas fa-circle-minus text-danger"></i>
				</button>
			</div>

			<div class="col-9">
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
	$(`#addBedrock, #addJava`).on('click', (e) => {
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
	$(`#addBedrockLink, #addJavaLink`).on('click', (e) => {
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
});
