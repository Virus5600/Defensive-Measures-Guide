$(() => {
	// All resizing events
	$(window).on('resize', (e) => {
		let win = $(e.target);
		let obj = $('[data-dmg-toggle=sidebar-collapse]');
		let target = $(obj.attr('data-dmg-target'));

		if (win.width() >= 992) {
			target.attr('aria-expanded', 'true');
			target.find('.aria-link').attr('aria-hidden', 'false');
			target.find('.aria-link').removeAttr('tabindex');
		}
		else {
			target.attr('aria-expanded', 'false');
			target.find('.aria-link').attr('aria-hidden', 'true');
			target.find('.aria-link').attr('tabindex', '-1');
		}
	});
	$(window).trigger('resize');

	// Toggle the sidebar on smaller screen
	$('[data-dmg-toggle=sidebar-collapse]').on('click', function(e) {
		let obj = $(e.currentTarget);
		let target = $(obj.attr('data-dmg-target'));

		if (target.hasClass("show")) {
			target.removeClass("show");
			target.attr('aria-expanded', 'false');
			target.find('.aria-link').attr('aria-hidden', 'true');
			target.find('.aria-link').attr('tabindex', '-1');
		}
		else {
			target.addClass("show");
			target.attr('aria-expanded', 'true');
			target.find('.aria-link').attr('aria-hidden', 'false');
			target.find('.aria-link').removeAttr('tabindex');
		}
	});
});
