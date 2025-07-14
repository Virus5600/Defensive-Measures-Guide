$(() => {
	const ellipsis = $(`[data-paginator-ellipsis]`),
		max = ellipsis.data('paginator-max'),
		min = ellipsis.data('paginator-min'),
		url = ellipsis.data('paginator-url');

	ellipsis.on('click', (e) => {
		e.preventDefault();

		Swal.fire({
			title: `Go to Page`,
			input: `number`,
			inputLabel: `Go to a page between 1 and ${max}`,
			inputAttributes: {
				min: min,
				max: max
			},
			showConfirmButton: true,
			showCancelButton: true,
			confirmButtonText: `Go`,
			cancelButtonText: `Cancel`,
			confirmButtonColor: `var(--bs-it-primary)`,
			cancelButtonColor: `var(--bs-secondary)`,
			inputValidator: (value) => {
				if (!value) {
					return `You need to write something!`
				}

				value = parseInt(value.trim());

				if (isNaN(value)) {
					return `You need to write a number!`
				}

				if (value < min || value > max) {
					return `You need to write a number between 1 and ${max}!`
				}
			}
		}).then((result) => {
			if (result.isConfirmed)
				window.location.href = window.location.href.replace(/page=\d+/, `page=${result.value}`);
		});
	});
});
