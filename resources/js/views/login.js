$(() => {
	// LOCK/UNLOCK VIEW
	const loginWrapper = $(`.login-card`);
	const lockView = $(`.login-card #lock-view`);
	const loginCard = $(`#login-form`);
	const loginCardComp = loginCard.find("*");

	lockView.on('click', (e) => {
		let obj = $(e.currentTarget);

		obj.toggleClass(`locked unlocked`)
			.trigger(`classChange`);

		if (obj.hasClass(`locked`)) {
			loginWrapper.addClass(`show`);
			loginCard.addClass(`show`);
		}
		else if (obj.hasClass(`unlocked`)) {
			loginWrapper.removeClass(`show`);
			loginCard.removeClass(`show`);
		}
	});

	// BLUR CONTROLLER
	let leftHemi = $(`#left-hemisphere`);
	loginCard.on(`mouseover focus`, () => {
		if (!loginCard.hasClass(`show`))
			leftHemi.removeClass(`unblur`);
	}).on(`mouseleave blur`, () => {
		if (!loginCard.hasClass(`show`))
			leftHemi.addClass(`unblur`);
	});

	loginCardComp.on(`focus`, () => {
		loginWrapper.addClass(`show`);
		loginCard.addClass(`show`);
	}).on(`blur`, () => {
		if (!lockView.hasClass(`locked`)) {
			loginWrapper.removeClass(`show`);
			loginCard.removeClass(`show`);
		}
	});

	lockView.on(`classChange`, (e) => {
		let obj = $(e.currentTarget);

		if (obj.hasClass(`locked`)) {
			leftHemi.removeClass(`unblur`);
		}
		else if (obj.hasClass(`unlocked`)) {
			leftHemi.addClass(`unblur`);
		}
	});

	// PASSWORD
	$(document).on('click', '#toggle-show-password, .toggle-show-password', (e) => {
		let obj = $(e.currentTarget);
		let target = $(obj.attr('data-target'));
		let icons = {
			show: obj.find('#show'),
			hide: obj.find('#hide')
		}

		if (target.attr('type') == 'password') {
			obj.attr('aria-label', 'Hide Password');
			target.attr('type', 'text');
			icons.show.removeClass('d-none');
			icons.hide.addClass('d-none');
		}
		else {
			obj.attr('aria-label', 'Show Password');
			target.attr('type', 'password');
			icons.show.addClass('d-none');
			icons.hide.removeClass('d-none');
		}
	});

	// FORGOT PASSWORD
	$('#forgotPassword').on('click', (e) => {
		let obj = $(e.currentTarget);
		let input = $('[name=email]');

		if (input.val().trim().length > 0) {
			let emailQuery = typeof input === 'undefined' ? `` : `?e=${input.val()}`;

			obj.attr('href', `${obj.attr('href')}${emailQuery}`);
		}
	});
});
