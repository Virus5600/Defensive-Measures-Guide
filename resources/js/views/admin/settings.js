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

		$.get("https://dma-guide.test/api/admin/settings/supported-websites", (response) => {
			if (response.success) {
				let sites = JSON.parse(response.websites);

				for (site in sites)
					websiteOptions += `<option data-icon="fa-brands fa-${site}" value="${sites[site]}">${sites[site]}</option>`;

				const template = `
				<tr class="slideInLeft">
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

							<select class="form-select" name="website[]" autocomplete="off">
								${websiteOptions}
								<option data-icon="fas fa-globe" value="Other" selected>Other</option>
							</select>
						</div>
					</td>

					<td class="align-middle p-3">
						<input type="text" class="form-control" name="url[]"></input>
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
			text: "This action is irreversible unless you refresh the page, of course... but that would also remove all your changes. LMAO.",
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

	// SOCIAL LINK ICON CHANGE HANDLER
	$(document).on(`change`, `select[name="website[]"]`, (e) => {
		let target = $(e.target);
		let icon = target.find(`option:selected`).attr(`data-icon`);

		target.closest(`td`).find(`span`).html(`<i class="${icon}"></i>`);
	});

	// ANIMATION HANDLER
	$(document).on(`animationstart`, `.slideFromLeft`, (e) => {
		let obj = $(e.target);
		obj.removeClass(`opacity-0`);
	});

	$(document).on(`animationend`, `.slideFromLeft`, (e) => {
		let obj = $(e.target);
		obj.removeClass(`slideFromLeft delay-animation`)
			.removeAttr(`style`)
			.removeProp(`style`);
	});

	// REVERT CHANGES HANDLER
	$(`#revert`).on(`click`, (e) => {
		$.ajax({
			url: "https://dma-guide.test/api/admin/settings/reset",
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
								.attr("src", `https://dma-guide.test/uploads/settings/${setting.value}`);
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
