$(() => {
	// Onload handler
	window.history.replaceState(
		{"content": $(`#inner-content`).html()},
		"",
		window.location.href
	);

	// Filters submit handler
	$(document).on(`submit`, `#filters`, (e) => {
		e.preventDefault();
		e.stopPropagation();

		let form = $(e.currentTarget);

		$.ajax({
			"url": form.attr(`action`),
			"type": form.attr(`method`),
			"data": form.serialize(),
			"success": (data) => {
				data = new DOMParser().parseFromString(data, `text/html`);
				data = data.querySelector(`#inner-content`);

				$(`#inner-content`).html(data.innerHTML);

				// History handler
				window.history.pushState(
					{"content": $(`#inner-content`).html()},
					"",
					window.location.href + "?" + form.serialize()
				);
			}
		});
	});

	// Reset handler
	$(document).on(`reset`, `#filters`, (e) => {
		let obj = $(e.currentTarget);

		$.ajax({
			"url": obj.attr(`action`) ?? window.location.href.split("?")[0],
			"type": obj.attr(`method`),
			"success": (data) => {
				data = new DOMParser().parseFromString(data, `text/html`);

				data = data.querySelector(`#inner-content`);
				filters = data.querySelector(`#filters`);

				$(`#inner-content`).html(data.innerHTML);
				$(`#filters`).html(filters.innerHTML);

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
		$(`#inner-content`).html($(e.originalEvent.state.content));
	});
});
