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
			// Replace nonce...
			if (data.includes("nonce="))
				data = data.replaceAll(/(nonce=)(.\w+.)/g, `$1${document.querySelector('meta[name="csp-nonce"]').content}`);

			data = new DOMParser().parseFromString(data, `text/html`);
			filters = data.querySelector(`#filters`);
			form = data.querySelector(`#table-content`);

			$(`#filters`).html(filters.innerHTML);
			$(`#table-content`).html(form.innerHTML);
		},
		popstateEvent: {
			enabled: true,
			pushFn: () => {
				return {
					'form': document.getElementById('filters').innerHTML,
					'table': document.getElementById('table-content').innerHTML
				};
			},
			popFn: (e) => {
				const data = RTLoader.getStates(e) ?? { content: e.state.content };
				const { form = null, table = null, content = null } = data;

				if (form != null)
					$(`#filters`).html(form);

				if (table != null)
					$(`#table-content`).html(table);

				if (content != null)
					$(`#inner-content`).html(content)
			}
		}
	});

	// Filters submit handler
	$(document).on(`submit`, `#filters`, (e) => {
		e.preventDefault();
		e.stopPropagation();
	});

	// Reset handler
	$(document).on(`reset`, `#filters`, (e) => {
		let obj = $(e.currentTarget);

		$.ajax({
			"url": obj.prop(`action`).split("?")[0] ?? window.location.href.split("?")[0],
			"type": obj.prop(`method`),
			"success": (data) => {
				if (data.includes("nonce="))
					data = data.replaceAll(/(nonce=)(.\w+.)/g, `$1${document.querySelector('meta[name="csp-nonce"]').content}`);
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
});
