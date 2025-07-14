class DOS {
	static #EVENTS = {
		'click': new MouseEvent('click', { view: window }),
		'submit': new SubmitEvent('submit')
	};

	/**
	 * The actual form that holds the submit button.
	 * @type {HTMLFormElement}
	 */
	#form;

	/**
	 * The submit button for the {@link #form}.
	 * @type {HTMLButtonElement|HTMLInputElement}
	 */
	#submitBtn;

	/**
	 * The action the {@link #submitBtn} does.
	 * @type {String}
	 */
	#submitAct;

	/**
	 * Supports the confirmLeave functions.
	 *
	 * This is used to determine if the form is using the confirmLeave functions
	 * developed by Virus5600.
	 *
	 * @type {Boolean}
	 */
	#hasConfirmLeave = false;

	/**
	 * Determines if the form has been submitted by the confirmLeave functions.
	 * @type {Boolean}
	 */
	#confirmLeaveSubmitted = false;

	/**
	 * Determines if the form is currently submitting. This is used to prevent multiple submissions.
	 */
	#isSubmitting = false;

	/**
	 * Creates an instance of DOS for a specified form.
	 *
	 * @param {HTMLElement|jQuery} form The form element to create an instance with.
	 * @returns {DOS|Array<DOS>} If a single element is passed, returns an instance of DOS. However, if there
	 * 	are multiple forms passed using the `jQuery` object, they will be iterated and returned as an array of
	 * 	DOS instances.
	 */
	constructor(form) {
		if ((typeof jQuery != "undefined" && jQuery != null) && form instanceof jQuery) {
			if (form.length > 1) {
				toReturn = [];

				for (let f of form)
					if (f instanceof HTMLFormElement)
						toReturn.push(DOM.getOrCreateInstance(f));

				return toReturn;
			}

			form = form[0];
		}

		this.#form = form;
		this.#hasConfirmLeave = (typeof confirmFormReset === "function" || typeof confirmFormSubmit === "function") && this.#form.hasAttribute('data-cl-form');
		this.#confirmLeaveSubmitted = !this.#hasConfirmLeave;

		if (!form.hasAttribute('data-dos-not-affected')) {
			this.#submitBtn = this.#form.querySelector(`[type=submit], [data-dos-action]`);
			this.#submitAct = this.#submitBtn.getAttribute('data-dos-action');
		}
		else {
			throw new Error('Form is not affected by DOS');
		}

		this.#form['disableOnSubmit'] = this;

		this.#submitBtn.addEventListener('click', (e) => {
			if ((!this.#hasConfirmLeave || this.#confirmLeaveSubmitted) && !this.#isSubmitting) {
				this.#checkFormValidity(e);
				this.#updateSubmitBtn();
				this.#confirmLeaveSubmitted = !this.#hasConfirmLeave;
				this.#isSubmitting = true;
			}
		});

		this.#form.addEventListener('submit', (e) => {
			this.#submitBtn.dispatchEvent(DOS.#EVENTS.click);
		});
	}

	/**
	 * Updates the submit button to show that it is either updating or submitting.
	 */
	#updateSubmitBtn() {
		if (!this.#form.classList.contains(`needs-validation`))
			this.#form.classList.add(`needs-validation`);

		// Store previous button content
		let previousContent = this.#submitBtn.innerHTML;
		this.#submitBtn.setAttribute(`data-dos-prev`, previousContent);

		// Update inner html to the designated action text and spinner`
		let btnLabel = `<i class="fas fa-circle-notch fa-spin"></i> `,
			isHtml = (this.#submitBtn.dataset['dos-is-html'] ?? false) === 'true',
			matched = false;

		switch (this.#submitAct) {
			case 'update':
				btnLabel += `Updating...`;
				matched = true;
				break;

			case 'filter':
				btnLabel += `Filtering...`;
				matched = true;
				break;

			case 'login':
				btnLabel += `Logging in...`;
				matched = true;
				break;

			case 'submit':
				btnLabel += `Submitting...`;
				matched = true;
				break;

			case 'icon-search':
				btnLabel = btnLabel.trim();
				matched = true;
				break;
		}

		// If the action does not match any of the above...
		if (!matched) {
			let altLabel = this.#submitBtn.getAttribute('data-dos-disabled-label') ?? this.#submitBtn.getAttribute('data-dos-label');

			// ...and there is no label, default to "Submitting..."
			if (typeof btnLabel === "undefined") {
				btnLabel += `Submitting...`;
			}

			if (isHtml)
				btnLabel = altLabel.trim();
			else
				btnLabel += altLabel.trim();
		}

		// Sets the submit button properties
		this.#submitBtn.innerHTML = btnLabel;
		this.#submitBtn.classList.add(`disabled`, `cursor-default`);
		this.#submitBtn.setAttribute('data-dos-clicked', 'true');
	}

	/**
	 * Checks if the form is valid or not. If it is not, the form is prevented from being submitted and the submit button is reverted to its original state.
	 *
	 * @param {Event} event The event that triggered the form submission.
	 */
	#checkFormValidity(event) {
		let isAlreadySetup = this.#setupFormForChecking(event);

		if (!isAlreadySetup) {
			let showValidity = this.#form.getAttribute('data-dos-show-validity') ?? false;
			showValidity = showValidity == 'true' || showValidity == '' ? true : false;

			let isValid = this.#form.reportValidity();

			if (!isValid || showValidity) {
				if (!isValid) {
					console.warn("Form is not valid");

					event.preventDefault();
					event.stopPropagation();

					this.revertFormChanges();
				}
			}
		}
	}

	/**
	 * Sets up the form for checking if it is valid or not. This includes making all form elements visible, setting the novalidate prop, and setting an ID if none is present.
	 * The submit button is also updated to show that it is either updating or submitting. If the button is already clicked, the event is prevented from being triggered once more
	 * to avoid multiple submissions of the form and to show the user that the form is already being processed.
	 *
	 * @returns {boolean} Returns `true` if the form is already set up for checking, `false` otherwise.
	 */
	#setupFormForChecking(event) {
		// If this button is already clicked
		if (this.#submitBtn.getAttribute('data-dos-clicked') == 'true') {
			// Prevent the event from being triggered once more
			event.preventDefault();
			event.stopPropagation();

			return true;
		}

		// Makes all the form elements visible
		this.#form.querySelectorAll(`select, input, textarea`)
			.forEach((v) => {
				if (v.hasAttribute('data-dos-style'))
					v.setAttribute("data-dos-style", v.getAttribute('style'));

				if (v.hasAttribute('data-dos-invisible'))
					v.getAttribute("data-dos-invisible", true);

				v.setAttribute('style', `${v.getAttribute('style')} visibility: visible!important; opacity: 1!important; display: block!important;`);
			});

		// Checks if there's a novalidate prop
		if (typeof this.#form.novalidate == 'undefined' || typeof this.#form.formnovalidate == 'undefined') {
			// if there's none, default the prop to true
			this.#form["novalidate"] = true;
			this.#form.setAttribute("novalidate", true);

			this.#form["formnovalidate"] = true;
			this.#form.setAttribute("formnovalidate", true);
		}

		// Checks for an ID
		if (typeof this.#form.getAttribute("data-dos-id") == 'undefined') {
			// If there's no id, generate one
			let hash = Math.random().toString(16).slice(2);

			// Check if the hash is already in use
			while ($(`[data-dos-id=disableOnSubmit${hash}]`).length > 0)
				hash = Math.random().toString(16).slice(2);

			this.#form.setAttribute("data-dos-id", `disableOnSubmit${hash}`);
		}

		// If continuous validation, uses the pseudo selectors, otherwise, uses the classes
		if (this.#form.getAttribute("data-continuous-validation") == 'true')
			this.#form.classList.add('was-validated');

		return false;
	}

	/**
	 * Reverts the form to its original state, enabling the submit button once more
	 * while restoring the elements visibility back to its default states.
	 */
	revertFormChanges() {
		// If not, proceed to redo the earlier changes so button can be used to submit again (only if it's alread clicked.)
		if (this.#submitBtn.getAttribute('data-dos-clicked') == 'false')
			return;

		// Reverts the submit button...
		this.#submitBtn.innerHTML = this.#submitBtn.getAttribute("data-dos-prev");
		this.#submitBtn.classList.remove(`disabled`, `cursor-default`);
		this.#submitBtn.setAttribute('data-dos-clicked', 'false');

		// Reverts the form elements...
		let invalids = this.#form.querySelectorAll(`:invalid:not(.dont-validate)`);
		let valids = this.#form.querySelectorAll(`:valid:not(.dont-validate)`);

		invalids.forEach((v) => {
			v.classList.add('is-invalid');
			v.classList.remove('is-valid');

			let selectEl = v.closest('.form-control:not(.bootstrap-select > select)');
			selectEl.classList.add('is-invalid');
			selectEl.classList.remove('is-valid');
		});

		valids.forEach((v) => {
			v.classList.add('is-valid');
			v.classList.remove('is-invalid');

			let selectEl = v.closest('.form-control:not(.bootstrap-select > select)');
			selectEl?.classList.add('is-valid');
			selectEl?.classList.remove('is-invalid');
		});

		// Reverts the form itself...
		this.#form.classList.remove('was-validated');

		// Reverts the style changes
		this.#form.querySelectorAll(`.dont-validate`)
			.forEach((v) => {
				v.classList
					.remove('is-valid is-invalid');

				v.closest('.form-control')
					.classList
					.remove('is-valid is-invalid');
			});

		// Reverts the style changes
		this.#form.querySelectorAll(`select, input, textarea`)
			.forEach((v) => {
				v.setAttribute('style', v.dataset['dos-style']);
				v.removeAttribute('data-dos-invisible');
				v.removeAttribute('data-dos-style');
			});

		// Let the form know that it's not submitting anymore
		this.#isSubmitting = false;
	}

	/**
	 * Triggers the submit event of the form.
	 */
	triggerEffect() {
		if (this.#hasConfirmLeave)
			this.#confirmLeaveSubmitted = true;
		this.#form.dispatchEvent(DOS.#EVENTS.submit);
	}

	/**
	 * Gets the current form state; whether it is submitting (`true`) or not (`false`).
	 */
	get isSubmitting() {
		return this.#isSubmitting;
	}

	/**
	 * Gets the instance of the DisableOnSubmit (DOS) class from the form.
	 *
	 * @param {HTMLFormElement} form The form to get the instance from.
	 * @returns {DOS} The instance of the DisableOnSubmit (DOS) class.
	 *
	 * @see getOrCreateInstance For getting an existing instance or creating a new one
	 * @see create For creating a new instance
	 */
	static getInstance(form) {
		if (form instanceof HTMLButtonElement || form instanceof HTMLInputElement)
			form = form.closest('form');
		return form['disableOnSubmit'];
	}

	/**
	 * Gets the instance of the DisableOnSubmit (DOS) class from the form. If the instance does not exist, creates a new instance
	 * and returns it.
	 *
	 * @param {HTMLFormElement} form The form to get the instance from.
	 * @returns {DOS} The instance of the DisableOnSubmit (DOS) class.
	 *
	 * @see getInstance For checking if an instance already exists.
	 * @see create For creating a new instance.
	 */
	static getOrCreateInstance(form) {
		let instance = DOS.getInstance(form);

		if (typeof instance === 'undefined')
			instance = new DOS(form);

		return instance;
	}

	/**
	 * Creates a new instance of the DisableOnSubmit (DOS) class from the form. This function
	 * prevents the creation of multiple instances of the class for the same form by checking if
	 * an instance already exists. If an instance exists, it is returned. If not, a new instance is
	 * created and returned.
	 *
	 * This function basically acts similarly to the `getOrCreateInstance()` functions.
	 *
	 * @param {HTMLFormElement} form The form to create a new instance from.
	 * @returns {DOS} The instance of the DisableOnSubmit (DOS) class.
	 *
	 * @see getInstance For checking if an instance already exists.
	 * @see getOrCreateInstance For getting an existing instance or creating a new one
	 */
	static create(form) {
		return DOS.getOrCreateInstance(form);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll(`form:not([data-dos-not-affected]) [type=submit][data-dos], form:not([data-dos-not-affected]) [data-dos-action]`)
		.forEach((btn) => {
			let form = btn.closest('form');
			DOS.getOrCreateInstance(form);
		});

	document.addEventListener('click', (e) => {
		let target = e.target;
		let targetTags = ['button', 'input'];

		if (!targetTags.includes(target.tagName.toLowerCase())) {
			target = target.closest('button, input');

			if (target === null)
				return;
		}

		if (target.getAttribute('type').toLowerCase() === 'submit'
			|| target.hasAttribute('data-dos-action')) {

			let parentForm = target.closest('form');
			if (!parentForm.hasAttribute('data-dos-not-affected')) {
				DOS.getOrCreateInstance(parentForm);
			}
		}
	});
});

// UMD Adapter
var global = window || global;

DOS = new Proxy(DOS, {
	get: (target, prop) => {
		if (prop in target)
			return target[prop];
		if (prop in DOS)
			return DOS[prop];
	}
});

global.document.addEventListener('DOMContentLoaded', () => {
	global.DOS = DOS;

	global.document.addEventListener("click", (e) => {
		const obj = e.target;
		const flash = obj.closest(`.swal-flash`)

		if (flash && Swal.isVisible())
			Swal.close();
	});

	(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
			typeof define === 'function' && define.amd ? define(factory) :
				(global = global || self, global.DOS = factory());
	}(this, function () {
		"use strict";
		return DOS;
	}));
});
