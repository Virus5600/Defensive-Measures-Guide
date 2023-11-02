$(() => {
	// ADD SOCIAL LINK HANDLER
	$(`#addSocialLink`).on(`click`, (e) => {
		let target = $(	`#socialLinkList`);

		let websiteOptions = ``;

		$.ajaxSetup({
			headers: {
				'Authorization': `Bearer ${$("meta[name=bearer]").attr('content')}`
			}
		});

		$.get(API.sites, (response) => {
			if (response.success) {
				let sites = JSON.parse(response.websites);

				for (site in sites)
					websiteOptions += `<option data-icon="fa-brands fa-${site}" value="${sites[site]}">${sites[site]}</option>`;

				const template = `
				<tr class="slideFromLeft">
					<td class="align-middle p-3">
						<div class="d-flex w-100 h-100 justify-content-center align-items-center">
							<i class="fas fa-circle-minus fa-xs btn btn-outline-danger btn-sm p-1 rounded-circle remove-sl"></i>
						</div>
					</td>

					<td class="align-middle p-3">
						<div class="input-group">
							<span class="input-group-text">
								<i class="fas fa-globe"></i>
							</span>

							<select class="form-select form-control w-auto website-input" autocomplete="off">
								${websiteOptions}
								<option data-icon="fas fa-globe" value="Other" selected>Other</option>
							</select>

							<input type="text" class="form-control small w-auto website-input-alt" name="website[]" value="Other">
						</div>
					</td>

					<td class="align-middle p-3">
						<input type="text" class="form-control w-auto w-lg-100" name="url[]"></input>
					</td>
				</tr>
				`;

				target.append(template);
			}
			else {
				SwalFlash.error("Something went wrong, please try again later.");
				return 0;
			}
		});

	});

	// REMOVE SOCIAL LINK HANDLER
	$(document).on(`click`, `.remove-sl`, (e) => {
		let container = $(e.target).closest(`tr`);

		Swal.fire({
			title: "Are you sure?",
			text: "This action is irreversible unless you refresh the page, of course... but that would also remove all your changes.",
			icon: "warning",
			showCancelButton: true,
			showDenyButton: false,
			confirmButtonText: "Proceed",
			customClass: {
				confirmButton: "btn-bad",
				cancelButton: "btn-good",
			},
		}).then((response) => {
			if (response.isConfirmed) {
				container.on(`animationend`, (ev) => {
					$(ev.target).remove();
				});

				container.addClass(`slideToRight`);
			}
		});
	});

	// SOCIAL LINK ICON AND WEBSITE INPUT CHANGE HANDLER
	$(document).on(`change`, `select.website-input`, (e) => {
		let target = $(e.target);
		let icon = target.find(`option:selected`).attr(`data-icon`);

		if (icon == "fas fa-globe") {
			target.removeAttr(`name`)
				.closest(`td`)
				.find(`.website-input-alt`)
				.attr(`name`, `website[]`)
				.removeClass(`d-none`);
		}
		else {
			target.attr(`name`, `website[]`)
				.closest(`td`)
				.find(`.website-input-alt`)
				.removeAttr(`name`)
				.addClass(`d-none`);
		}

		target.closest(`td`)
			.find(`span`)
			.html(`<i class="${icon}"></i>`)
		.closest(`td`)
			.find(`.website-input-alt`)
			.val(target.val());
	});

	// REVERT CHANGES HANDLER
	$(`#revert`).on(`click`, (e) => {
		$.ajax({
			url: API.reset,
			type: "POST",
			dataType: "json",
			headers: {
				'Authorization': `Bearer ${$("meta[name=bearer]").attr('content')}`,
				'XSRF-TOKEN': $("meta[name=xsrf]").attr('content')
			},
			data: {
				_method: "PATCH"
			},
			success: (response) => {
				if (response.success) {
					let settings = JSON.parse(response.settings);
					for (setting of settings) {
						let target = $(`[name="${setting.name}"]`);

						if (setting.name == "web-logo") {
							target.val("")
								.parent()
								.find("img")
								.attr("src", `${API.home}/uploads/settings/${setting.value}`);
						}
						else {
							if (target.length > 0) {
								target.val(setting.value)
									.trigger("change");
							}
						}
					}

					SwalFlash.success(response.message);
				}
				else {
					let errors = JSON.parse(response.errors);
					console.table(errors);

					SwalFlash.error("Something went wrong, please try again later.");
				}
			}
		});
	});
});
