$(document).ready(() => {
	let wrapper = $('#topbarWrapper');
	let topbar = $('[data-target="#topbarDropdown"]');
	let genSearch = $('#generalSearchForm');

	$(window).on('resize', (e) => {
		let win = $(e.target);

		if (win.width() >= 768)
			// If window's width is 768 or more, put the search at the end
			wrapper.append(genSearch);
		else
			// Otherwise, put the navigation bar at the end
			wrapper.append(topbar);
	});

	$(window).trigger('resize');
});