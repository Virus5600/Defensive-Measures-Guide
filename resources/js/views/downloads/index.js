$(() => {
	// Onload handler
	window.history.replaceState(
		{"content": $(`#inner-content`).html()},
		"",
		window.location.href
	);

	let form = $(`#filters`);
	new RTLoader("filters", {
		url: form.prop(`action`),
		action: form.prop(`method`),
		data: form.serialize(),
		pushHistoryState: true,
		success: (data) => {
			data = new DOMParser().parseFromString(data, `text/html`);
			filters = data.querySelector(`#filters`);
			form = data.querySelector(`#table-content`);

			$(`#filters`).html(filters.innerHTML);
			$(`#table-content`).html(form.innerHTML);
		}
	});

	// Filters submit handler
	$(document).on(`submit`, `#filters`, (e) => {
		e.preventDefault();
		e.stopPropagation();

		let form = $(e.currentTarget);
	});

	// Reset handler
	$(document).on(`reset`, `#filters`, (e) => {
		let obj = $(e.currentTarget);

		$.ajax({
			"url": obj.prop(`action`) ?? window.location.href.split("?")[0],
			"type": obj.prop(`method`),
			"success": (data) => {
				data = new DOMParser().parseFromString(data, `text/html`);

				filters = data.querySelector(`#filters`);
				form = data.querySelector(`#table-content`);

				$(`#filters`).html(filters.innerHTML);
				$(`#table-content`).html(form.innerHTML);

				// History handler
				window.history.pushState(
					{"content": $(`#inner-content`).html()},
					"",
					window.location.href.split("?")[0]
				);
			}
		});
	});

	// Popstate handler
	$(window).on(`popstate`, (e) => {
		let data = e.originalEvent.state.content;

		$(`#filters`).html(filters.innerHTML);
		$(`#table-content`).html(form.innerHTML);
	});
});