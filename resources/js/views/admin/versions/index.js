$(() => {
	// Onload handler
	window.history.replaceState(
		{"content": $(`#inner-content`).html()},
		"",
		window.location.href
	);

	// Reset handler
	$(`#filters`).on(`reset`, (e) => {
		let obj = $(e.currentTarget);

		// Checkbox handler
		obj.find(`[type=checkbox]`)
			.removeAttr(`checked`)
			.removeProp(`checked`);

		// Text handler
		obj.find(`[type=text], textarea`)
			.removeAttr(`value`)
			.removeProp(`value`)
			.val(``);

		// Sort By Handler
		obj.find(`[name=sort_by]`)
			.val(`version`);

		// Sort Order Handler
		obj.find(`[name=sort_order]`)
			.val(`desc`);

		// History handler
		window.history.pushState(
			{"content": $(`#inner-content`).html()},
			"",
			window.location.href.split("?")[0]
		);
	});

	// Popstate handler
	$(window).on(`popstate`, (e) => {
		$(`#inner-content`).html($(e.originalEvent.state.content));
	});
});
