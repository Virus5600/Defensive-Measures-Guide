function openInput(obj) {
	if (obj instanceof jQuery)
		obj = obj[0];

	document.querySelectorAll(`input[name=${obj.id}]:not([readonly])`)
		.forEach(el => el.click());
}

function swapImgFile(obj) {
	if (obj instanceof jQuery)
		obj = obj[0];

	/**
	 * Defines the max file size for the image input. Default is 3 MB to allow
	 * files to be temporarily cached in the session storage for validation.
	 */
	const maxSizeMB = $(obj).attr('data-max-size') ?? 3;
	const maxFileSize = parseInt(maxSizeMB) * 1024 * 1024;
	/**
	 * Defines the max size for the session storage. This is set to 3MB and shall
	 * never be changed. This is to prevent the session storage from throwing errors.
	 */
	const maxSSSize = 3 * 1024 * 1024;

	if ($(obj).attr('data-warned') != 'true' && maxSizeMB > 3) {
		$(obj).attr('data-warned', true);
		console.warn(`The max file size for the image input is set to ${maxSizeMB}MB. Files exceeding 3MB size will not be cached in the session storage for validation.`);
	}

	let targetImgContainer = $($(obj).attr('data-target-image-container'));
	let targetNameContainer = $($(obj).attr('data-target-name-container'));

	if (obj.files && obj.files[0]) {
		let allowed = obj.accept.split(',');
		let allowedTypes = [];
		allowed.forEach((v) => {
			allowedTypes.push(v.substring(1));
		});
		allowed = new RegExp(allowedTypes.join("|"));

		if (!obj.files[0].type.match(/image.+/) || !obj.files[0].type.match(allowed)) {
			if (SwalFlash)
				SwalFlash.error('Invalid file type', `Only images are allowed (${allowedTypes.join(", ").toUpperCase()})`, true);
			else
				alert(`Only images are allowed (${allowedTypes.join(", ").toUpperCase()})`);

			$(obj).val('');
			sessionStorage.removeItem(`image-input-${obj.name}`);
			return false;
		}

		let reader = new FileReader();

		reader.onload = function (e) {
			let valid = true;

			if (obj.files[0].size <= maxSSSize) {
				sessionStorage.setItem(`image-input-${obj.name}`, `${obj.files[0].name}~${e.target.result}`);
			}

			if (obj.files[0].size > maxFileSize) {
				if (SwalFlash)
					SwalFlash.error('File size too large', `The file size of ${obj.files[0].name} exceeds the limit of ${maxSizeMB} MB`, true);
				else
					alert(`The file size of ${obj.files[0].name} exceeds the limit of ${maxSizeMB} MB`);

				valid = false;

				$(obj).val('')
					.trigger('change');
			}

			if (valid) {
				targetImgContainer.attr("src", e.target.result);
				targetNameContainer.html(obj.files[0].name);
			}
		}

		reader.readAsDataURL(obj.files[0]);

		targetImgContainer.on('error', function (e) {
			let obj = $(e.currentTarget);
			obj.attr("src", obj.attr('data-default-src'));
			return false;
		});
	}
	else {
		targetImgContainer.attr("src", targetImgContainer.attr('data-default-src'));
		targetNameContainer.html(targetNameContainer.attr('data-default-name'));
	}
}

// Handles missing images for image-input
$($('.image-input-scope input[type=file]').attr('data-target-image-container')).bind("error", function (e) {
	let obj = $(e.currentTarget);
	$(obj).attr("src", $(obj).attr('data-default-src'));
});

$(() => {
	// Profile Image Changing
	$(document).on("click", ".image-input-scope .image-input-float", function (e) {
		openInput($(this));
	});

	$(document).on("keydown", ".image-input-scope .image-input-float", function (e) {
		if (e.keyCode == 32) {
			e.preventDefault();
			openInput($(this));
		}
	});

	$(document).on("change", ".image-input-scope .image-input input[type=file]", function (e) {
		swapImgFile(this);
	});

	$(document).on("change keyup", ".image-input-scope .image-input input[type=text]", function (e) {
		let obj = $(e.currentTarget);

		if (obj.val().length == 0) {
			$(obj.attr('data-target-image-container')).attr("src", $(obj.attr('data-target-image-container')).attr('data-default-src'));
		}
		else {
			$(obj.attr('data-target-image-container')).attr("src", obj.val());
			$(obj.attr('data-target-image-container')).attr('onerror', `this.src="${$(this).attr('data-default-src')}";$(this).removeAttr('onerror');`);
		}
	});

	// Profile Image Changing method swapping (File to URL and vice versa)
	$($(".image-input-scope").attr('data-settings')).on('change', function (e) {
		let obj = $(e.currentTarget).find('.image-input-switch');
		let fileInp = $('.image-input-scope input[type=file]');
		let textInp = $('.image-input-scope input[type=text]');

		$(".image-input-scope input[name=avatar], .image-input-scope input[data-role=image-input]").removeAttr('name');

		if (!obj.prop('checked'))
			fileInp.attr('name', 'avatar');
		else
			textInp.attr('name', 'avatar');
	});

	// Remove Image (AJAX)
	$(document).on('click', '.image-input-reset', function (e) {
		let obj = $(e.target);

		let inputFiles = obj.closest('.image-input-scope').find('input[type=file]');
		inputFiles.each((k, v) => {
			sessionStorage.removeItem(`image-input-${v.name}`);
		});

		if (obj.attr(`data-mode`)?.toLowerCase() == `ajax`) {
			let dataPacket = {
				_token: $('[name=_token]').val(),
				type: obj.attr('data-category'),
				id: obj.attr('data-id')
			}

			$.post(
				obj.attr('data-target-url'), dataPacket
			).done((response) => {
				// VALIDATION ERROR
				if (response.type == 'validation_error') {
					let msg = "Parameter error:\n";

					$.each(response.errors, (k, v) => {
						msg += "\n[" + k + "]: " + v;
					});

					console.warn(msg);

					Swal.fire({
						icon: `info`,
						title: 'Something went wrong... Please contact web developers',
						position: `top`,
						showConfirmButton: false,
						toast: true,
						background: `#17a2b8`,
						customClass: {
							title: `text-white`,
							popup: `px-3`
						},
					});
				}
				// FATAL ERROR
				else if (response.type == 'error') {
					console.error('Something went wrong:\n', response.error);

					Swal.fire({
						icon: 'warning',
						title: 'An error occurred, please contact the web developers immediately',
						position: 'top',
						showConfirmButton: false,
						toast: true,
						background: `#dc3545`,
						customClass: {
							title: `text-white`,
							popup: `px-3`
						},
					});
				}
				// SUCCESS
				else if (response.type == 'success') {
					Swal.fire({
						icon: `info`,
						title: response.message,
						position: `top`,
						showConfirmButton: false,
						toast: true,
						timer: 10000,
						background: `#17a2b8`,
						customClass: {
							title: `text-white`,
							popup: `px-3`
						},
					});

					$(obj.attr('data-target')).find('img.avatar').attr('src', response.fallback);
				}
				// EMPTY
				else if (response.type == 'empty') {
					console.warn(response.message);
				}
			}).fail((response) => {
				Swal.fire({
					icon: 'warning',
					title: 'An error occured, please contact the web developers immediately',
					position: 'top',
					showConfirmButton: false,
					toast: true,
					background: `#dc3545`,
					customClass: {
						title: `text-white`,
						popup: `px-3`
					},
				});
			});
		}
		else {
			let imgContainer = $(obj.attr('data-target-image-container'));
			let nameContainer = $(obj.attr('data-target-name-container'));

			imgContainer.attr(`src`, imgContainer.attr('data-default-src'));
			nameContainer.html(nameContainer.attr('data-default-name'));
		}

		inputFiles.each((k, v) => {
			$(v).val('')
				.trigger('change');
		});
	})

	// Restore Image
	$(document).on('click', '.image-input-restore', function (e) {
		let obj = $(e.target),
			inputFile = obj.closest('.image-input-scope').find('input[type=file]')[0],
			imgContainer = $(obj.attr('data-target-image-container')),
			nameContainer = $(obj.attr('data-target-name-container'));
		url = imgContainer.attr('data-restore-src') ?? imgContainer.attr('data-default-src'),
			filename = nameContainer.attr('data-restore-name') ?? nameContainer.attr('data-default-name');

		const XHR = new XMLHttpRequest();
		XHR.onload = function () {
			if (XHR.status == 200) {
				let file = new File(
					[XHR.response],
					filename,
					{
						type: XHR.response.type,
						lastModified: new Date().getTime()
					},
					'utf-8'
				);

				let transfer = new DataTransfer();
				transfer.items.add(file);
				inputFile.files = transfer.files;
				swapImgFile(inputFile);
			}
		};

		XHR.open('GET', url);
		XHR.responseType = 'blob';
		XHR.send();
	});

	// Drop Image Handler
	$(document).on('dragover', '.image-input-scope.drag-drop', function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		let obj = $(e.currentTarget).closest('.image-input-scope.drag-drop');
		let overlay = obj.find('.drag-drop-overlay');

		overlay.addClass('show');
	});

	$(document).on("dragleave", '.image-input-scope.drag-drop', function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		let obj = $(e.currentTarget).closest('.image-input-scope.drag-drop');
		let overlay = obj.find('.drag-drop-overlay');

		overlay.removeClass('show');
		if (overlay.hasClass('animated')) {
			overlay.removeClass('animated');
			void overlay[0].offsetWidth;
			overlay.addClass('animated');
		}
	});

	$(document).on("drop", '.image-input-scope.drag-drop', function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();

		if (e.originalEvent.dataTransfer.files.length == 0)
			return;

		let obj = $(e.currentTarget).closest('.image-input-scope.drag-drop');
		let input = obj.find('input[type=file]');

		obj.trigger('dragleave');

		let files = e.originalEvent.dataTransfer.files;
		if (input.attr('multiple') == undefined) {
			files = new DataTransfer()
			files.items.add(e.originalEvent.dataTransfer.files[0]);
			files = files.files;
		}

		input.prop('files', files);
		input.trigger('change');
	});

	// Reset Form Handlers
	$(document).on('reset', 'form', function (e) {
		let obj = $(e.currentTarget);

		setTimeout(() => {
			obj.find('input[type=file]').trigger('change');
		});
	});

	// Set the old images as the input's value on validation error
	if (window.imageInputError === true) {
		let obj = $('.image-input-scope input[type=file]');

		if (obj.length > 0) {
			const uriToBlob = (uri) => {
				let binary = atob(uri.split(',')[1]);
				let array = [];

				for (i = 0; i < binary.length; i++)
					array.push(binary.charCodeAt(i));

				let type = uri.split(',')[0].split(':')[1].split(';')[0];
				return new Blob(
					[new Uint8Array(array)],
					{
						type: type
					});
			}

			const setInputFile = (input, file) => {
				let fileList = new DataTransfer();
				fileList.items.add(file);

				input.files = fileList.files;
			}

			obj.each((k, v) => {
				let baseURI = sessionStorage.getItem(`image-input-${v.name}`);
				if (baseURI === null)
					return;

				let blob = uriToBlob(baseURI);
				let img = new File(
					[blob],
					`${baseURI.split('~')[0]}`,
					{ type: blob.type }
				);

				setInputFile(v, img);
				$('.image-input-restore').trigger('click');
			});
		}
	}

	$('.image-input-restore').trigger('click');
});
