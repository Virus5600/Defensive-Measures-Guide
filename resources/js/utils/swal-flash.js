if (!Swal)
	throw Error('Sweetalert2 not instantiated. Please include the said library (https://sweetalert2.github.io/). Currently testing for `Swal` keyword.');

/**
 * SwalFlash Class for handling flash messages using SweetAlert2.
 *
 * This class is a singleton wrapper for SweetAlert2 to handle flash messages. It provides a more
 * convenient way to display flash messages using the `error`, `info`, and `success` methods.
 *
 * The `custom` method allows for easier customization of the flash messages. The `fire` method
 * is a direct call to `Swal.fire()` with additional offsets option.
 *
 * For convenience, the class listens to the `flash_error`, `flash_info`, and `flash_success` events
 * to display the flash messages, allowing developers to use the `error`, `info`, and `success` methods
 * to trigger the said events. Additionally, the class listens to the `click` event to close the flash
 * messages when clicked.
 *
 * The class also provides a debug mode to log the options before and after setting the options
 * by setting the `SwalFlash.debug` property to `true`.
 *
 * For reference, the `options` parameter for the `custom` method is as follows:
 * - **`type`**: `string` 			- Must be either `error`, `info`, or `success`.
 * - **`title`**: `string`			- Title of the flash message.
 * - **`msg`**: `string`			- Message of the flash message.
 * - **`plain_text`**: `bool`		- Whether the message (`msg`) is plain text or HTML.
 * - **`has_icon`**: `bool`			- Whether the flash message has an icon. This cannot be customized and will be set based on the type using the built-in icons.
 * - **`toast`**: `bool`			- Whether the flash message is a toast.
 * - **`pos`**: `string`			- Position of the flash message. Default is `top`. All allowed positions are `top`, `top-start`, `top-end`, `center`, `center-start`, `center-end`, `bottom`, `bottom-start`, and `bottom-end`.
 * - **`offsets`**: `object`		- Offsets for the flash message. Default is `undefined`. The object should contain the following properties: `top`, `bottom`, `left`, and `right`.
 * - **`translate`**: `object`		- Applies a translate transformation to the flash message. Default is `undefined`. The object should contain the following properties: `x` and `y`.
 * - **`has_timer`**: `bool`		- Whether the flash message has a timer. Default is `true`.
 * - **`duration`**: `int`			- Duration of the flash message. Default is `10000` which is 10 seconds (10000 milliseconds / 1 second).
 *
 * When using the `custom` method, the `type` property is required. The rest of the
 * properties are optional. Furthermore, all options are also used in the `error`,
 * `info`, and `success` methods in the same order as listed above, with the exception
 * of the `type` property.
 *
 * Similarly, `error`, `info`, and `success` methods now accept an `options` parameter that defaults to the `SwalFlash.DEFAULTS` property.
 * For easier modification of the default options, the `SwalFlash.DEFAULTS` property can be modified directly.
 *
 * ---
 * @method error(title, options)
 * \- Displays an error message.
 * ---
 * @method info(title, options)
 * \- Displays an info message.
 * ---
 * @method success(title, options)
 * \- Displays a success message.
 * ---
 * @method custom(options)
 * \- Displays one of the earlier flashes with easier customization option.
 * ---
 * @method fire(options)
 * \- Standard `Swal.fire()` method with additional offsets option.
 * ---
 *
 * @class SwalFlash
 * @version 1.1.0
 * @author Virus5600
 * @GitHub https://github.com/Virus5600
 */
class SwalFlash {
	static debug = false;
	/**
	 * Defines the class provider for the flash messages. The default provider is `null`.
	 */
	static #provider = null;
	/**
	 * Defines a list of providers for the SwalFlash's class. Currently, the available providers are:
	 * - `bootstrap`	- For Bootstrap 4|5.
	 * - `tailwind`	- For Tailwind CSS.
	 * - `null`		- No provider.
	 */
	static #PROVIDERS = {
		BOOTSTRAP: "bootstrap",
		TAILWIND: "tailwind",
		NONE: null
	};

	static #COMPONENTS = {
		title: "title",
	};

	static #CLASSES = {
		bootstrap: {
			title: "text-center text-white",
		},
		tailwind: {
			title: "!text-center text-[white!important]",
		}
	};

	static #mixin = Swal.mixin({
		position: `top`,
		showConfirmButton: false,
		toast: true,
		timer: 10000,
	});

	static #BACKGROUND_COLORS = {
		error: `#dc3545`,
		info: `#17a2b8`,
		success: `#28a745`,
	};

	static #TYPES = {
		ERROR: `error`,
		INFO: `info`,
		SUCCESS: `success`,
	}

	constructor() {
		if (this instanceof SwalFlash)
			throw Error('SwalFlash is a static class and cannot be instantiated');
	}

	static error(title, options = SwalFlash.OPTIONALS) {
		SwalFlash.#sendEvent(`flash_error`, {
			title: title,
			background: SwalFlash.#BACKGROUND_COLORS.error,
			...options
		});
	}

	static info(title, options = SwalFlash.OPTIONALS) {
		SwalFlash.#sendEvent(`flash_info`, {
			title: title,
			background: SwalFlash.#BACKGROUND_COLORS.info,
			...options
		});
	}

	static success(title, options = SwalFlash.OPTIONALS) {
		SwalFlash.#sendEvent(`flash_success`, {
			title: title,
			background: SwalFlash.#BACKGROUND_COLORS.success,
			...options
		});
	}

	static custom(options) {
		if (!options.type)
			throw Error('Type is required.');

		let type = options.type;
		delete options.type;

		if (!['error', 'info', 'success'].includes(type))
			throw Error('Invalid type. Must be either `error`, `info`, or `success`.');

		options.background = SwalFlash.#BACKGROUND_COLORS[type];

		SwalFlash.#mixin.fire(__setSwalFlashOptions(options, type));
	}

	static modifyMixin(options) {
		SwalFlash.#mixin = Swal.mixin(options);
	}

	static resetMixin() {
		SwalFlash.#mixin = Swal.mixin(SwalFlash.OVERRIDES);
	}

	static #sendEvent(type, params) {
		window.dispatchEvent(new CustomEvent(type, {
			detail: params
		}));
	}

	/**
	 * Displays a flash message using SweetAlert2.
	 * In addition to the options, the method also accepts an `offsets` option
	 * which allows for setting the top, bottom, left, and right margins of the
	 * flash message.
	 *
	 * @param {object} options - SweetAlert2 options.
	 */
	static fire(options) {
		// Check if the offsets are set
		let offsets = undefined;
		if (options[`offsets`]) {
			// If they are, transfer the offsets to another variable
			offsets = options[`offsets`];
			delete options[`offsets`];
		}

		// Check if the translate option is set
		let translate = undefined;
		if (options[`translate`]) {
			translate = {};

			// If they are, transfer the translate to another variable
			translate.x = options[`translate`][`x`] ?? `0%`;
			translate.y = options[`translate`][`y`] ?? `0%`;
			delete options[`translate`];
		}

		// Check if the position is set
		if (!Object.keys(options).includes['position'] || !options['position']) {
			options['position'] = 'top' + (translate ? '-start' : '');
		}

		let bgFromSF = Object.values(SwalFlash.#BACKGROUND_COLORS).includes(options[`background`]);

		options = {
			customClass: {
				title: SwalFlash.styleClasses('title'),
				htmlContainer: SwalFlash.styleClasses('title'),
				popup: `px-3`
			},
			...options,
			title: `${options.title}`,
		}

		if (SwalFlash.debug) {
			console.log("OPTIONS:", options);
		}

		SwalFlash.#mixin.fire(__setSwalFlashOptions(options, options[`icon`] ?? 'null'));

		if (offsets) {
			if (SwalFlash.debug)
				console.log("OFFSETS:", offsets);

			let obj = Swal.getPopup();

			obj.style.top = offsets.top ?? "auto";
			obj.style.bottom = offsets.bottom ?? "auto";

			obj.style.left = offsets.left ?? "auto";
			obj.style.right = offsets.right ?? "auto";
		}

		if (translate) {
			if (SwalFlash.debug)
				console.log("translate:", translate);

			let obj = Swal.getPopup();

			obj.style.transform = `translate(${translate.x}, ${translate.y})`;
		}
	}

	// GETTERS AND SETTERS
	/**
	 * Returns the optional parameters for the SwalFlash class. These
	 * optional parameters are used to add more customization to the
	 * flash messages.
	 *
	 * ### Optional Parameters:
	 * - **message**: `string`		- The message to display in the flash message.
	 * - **plain_text**: `bool`		- Whether the message is plain text or HTML.
	 * - **has_icon**: `bool`		- Whether the flash message has an icon.
	 * - **offsets**: `object`		- The offsets for the flash message.
	 * - **translate**: `object`	- The translate transformation for the flash message.
	 *
	 * #### Offsets:
	 * - **top**: `string`		- The top offset for the flash message **(OPTIONAL)**.
	 * - **bottom**: `string`	- The bottom offset for the flash message **(OPTIONAL)**.
	 * - **left**: `string`		- The left offset for the flash message **(OPTIONAL)**.
	 * - **right**: `string`	- The right offset for the flash message **(OPTIONAL)**.
	 *
	 * #### Translate:
	 * - **x**: `string`		- The x-axis translation for the flash message **(OPTIONAL)**.
	 * - **y**: `string`		- The y-axis translation for the flash message **(OPTIONAL)**.
	 *
	 * An example of the optional parameters is as follows:
	 * ```javascript
	 * const options = {
	 * 	message: "This is a flash message.",
	 * 	plain_text: false,
	 * 	has_icon: false,
	 * 	offsets: {
	 * 		top: "10px",
	 * 		left: "10px"
	 * 	},
	 * 	translate: {
	 * 		x: "10%",
	 * 		y: "10%"
	 * 	}
	 * }
	 * ```
	 *
	 * OR
	 *
	 * ```javascript
	 * const options = SwalFlash.OPTIONALS;
	 * options.message = "This is a flash message.";
	 * options.plain_text = false;
	 * options.has_icon = false;
	 * options.offsets = { top: "10px", left: "10px" };
	 * options.translate = { x: "10%", y: "10%" };
	 * ```
	 *
	 * @returns {object} The optional parameters for the SwalFlash class.
	 */
	static get OPTIONALS() {
		return structuredClone({
			message: undefined,
			plain_text: false,
			has_icon: false,
			offsets: undefined,
			translate: undefined,
		});
	}

	/**
	 * Returns the default options for the SwalFlash class. These
	 * options are used as the default options for the `error`, `info`,
	 * and `success` methods but can be overridden by simply passing
	 * any of the options from `SwalFlash.OVERRIDES` property.
	 *
	 * ### Default Options:
	 * - **position**: `top`			- The position of the flash message.
	 * - **showConfirmButton**: `false`	- Whether to show the confirm button.
	 * - **toast**: `true`				- Whether the flash message is a toast or not.
	 * - **timer**: `10000`				- The duration of the flash message in milliseconds.
	 *
	 * @returns {object} The default options for the SwalFlash class.
	 */
	static get OVERRIDES() {
		return structuredClone({
			position: `top`,
			showConfirmButton: false,
			toast: true,
			timer: 10000,
		});
	}

	/**
	 * Returns the available providers for the SwalFlash class.
	 * Currently, the available providers are:
	 * - `bootstrap`	- For Bootstrap 4|5.
	 * - `tailwind`		- For Tailwind CSS.
	 */
	static get PROVIDERS() {
		return structuredClone(SwalFlash.#PROVIDERS);
	}

	/**
	 * Returns the available components for the SwalFlash class.
	 * Currently, the available components are:
	 * - `title`		- Title of the flash message.
	 */
	static get COMPONENTS() {
		return structuredClone(SwalFlash.#COMPONENTS);
	}

	/**
	 * Returns the available types for the SwalFlash bacground colors.
	 * Currently, the available types are:
	 * - `error`	- For error messages.
	 * - `info`		- For info messages.
	 * - `success`	- For success messages.
	 *
	 * @returns {object} The available types for the SwalFlash background colors.
	 */
	static get BACKGROUND_COLORS() {
		return structuredClone(SwalFlash.#BACKGROUND_COLORS);
	}

	/**
	 * Returns the available types for the SwalFlash class.
	 * Currently, the available types are:
	 * - `error`	- For error messages.
	 * - `info`		- For info messages.
	 * - `success`	- For success messages.
	 */
	static get TYPES() {
		return structuredClone(SwalFlash.#TYPES);
	}

	/**
	 * Returns the associated style classes for the SwalFlash class
	 * based on the provider and component.
	 *
	 * @param {SwalFlash.COMPONENTS} component - The component to get the style classes from.
	 * @returns {object | string} The style classes for the component or an object of all style classes.
	 */
	static styleClasses(component = null) {
		if (component != null)
			return SwalFlash.styleClasses()[component];
		return SwalFlash.#CLASSES[SwalFlash.provider];
	}

	/**
	 * Sets the provider for the SwalFlash singleton class.
	 * @param {SwalFlash.PROVIDERS} provider - The provider to set.
	 *
	 * @throws {Error} If the provider is not yet supported.
	 *
	 * @see SwalFlash.PROVIDERS
	 */
	static set provider(provider) {
		provider = provider.toLowerCase();

		if (!Object.values(SwalFlash.PROVIDERS).includes(provider))
			throw Error(`${provider} provider is not yet supported.`);
		SwalFlash.#provider = provider;
	}

	/**
	 * Returns the current provider for the SwalFlash singleton class.
	 *
	 * @see SwalFlash.PROVIDERS
	 */
	static get provider() {
		return SwalFlash.#provider;
	}
}

var global = window || global;

global.addEventListener('flash_error', (e) => {
	SwalFlash.fire(__setSwalFlashOptions(e.detail, 'error'));
});

global.addEventListener('flash_info', (e) => {
	SwalFlash.fire(__setSwalFlashOptions(e.detail, 'info'));
});

global.addEventListener('flash_success', (e) => {
	SwalFlash.fire(__setSwalFlashOptions(e.detail, 'success'));
});

const __setSwalFlashOptions = (flash, type) => {
	let options = {
		...SwalFlash.OVERRIDES,
		...SwalFlash.OPTIONALS,
	};

	if (SwalFlash.debug)
		console.log("START:", { options, flash });

	options = { ...options, ...flash };

	if (SwalFlash.debug)
		console.log("DEFAULT MERGE:", { options, flash });

	let plainText = false;
	if (flash.plain_text != undefined)
		plainText = flash.plain_text == true ? true : false;

	if (flash.has_icon != undefined && flash.has_icon)
		options["icon"] = `${type}`;

	if (flash.message != undefined)
		options[plainText ? "text" : "html"] = `${flash.message}`;

	if (flash.position != undefined)
		options["position"] = flash.position;

	if (flash.offsets != undefined)
		options["offsets"] = flash.offsets;

	if (flash.translate != undefined)
		options["translate"] = flash.translate;

	if (flash.is_toast != undefined)
		options["toast"] = flash.is_toast;

	if (flash.has_timer != undefined)
		if (flash.has_timer)
			options['timer'] = flash.duration != undefined ? flash.duration : 10000;
		else
			delete options['duration'];

	const FOR_REMOVAL = ["message", "plain_text", "has_icon", "offsets", "translate"];
	FOR_REMOVAL.forEach((key) => {
		delete options[key];
	});

	if (SwalFlash.debug)
		console.log("END:", { options, flash });

	return options;
}

SwalFlash = new Proxy(SwalFlash, {
	get: (target, prop) => {
		if (prop in target)
			return target[prop];
		if (prop in SwalFlash)
			return SwalFlash[prop];
	}
});

global.document.addEventListener('DOMContentLoaded', () => {
	global.SwalFlash = SwalFlash;

	global.document.addEventListener("click", (e) => {
		const obj = e.target;
		const flash = obj.closest(`.swal-flash`)

		if (flash && Swal.isVisible())
			Swal.close();
	});

	(function (global, factory) {
		typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
			typeof define === 'function' && define.amd ? define(factory) :
				(global = global || self, global.SwalFlash = factory());
	}(this, function () {
		"use strict";
		return SwalFlash;
	}));
});
