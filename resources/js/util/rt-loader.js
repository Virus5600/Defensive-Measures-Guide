/**
 * RT Loader is a JavaScript library that enables developers to load a part of their
 * website using the power of XHR. These parts are called components and are manually
 * defined by the developer by creating an instance of RTLoader, which will then be
 * automatically stored in a private `components` object.
 *
 * To obtain there instances, you can use the static `RTLoader.getInstance` method, which
 * will return the instance of the component you want to obtain.
 *
 * When instantiating a new RTLoader, you must provide an id that will be used
 * to identify the component, and an object of options.
 *
 * @author Virus5600
 * @version 1.0.0
 */
class RTLoader {
	/**
	 * The list of components registered in this session.
	 */
	static #components = {};

	/**
	 * The default options for the component.
	 */
	static #defaultOptions = {
		url:				window.location.href,
		action:				"GET",
		data:				"",
		pushHistoryState:	false,
		// CALLBACKS
		success: (data) => {
			let el = new DOMParser().parseFromString(data, 'text/html')
				.querySelector(this.elementID);

			document.getElementById(this.elementID)
				.insertAdjacentElement('beforeend', el);
		},
		error: (e) => {
			console.error(e);
		},
		finally: () => {
			if (this.options.pushHistoryState) {
				window.history.pushState(
					{"content": $(`#${this.elementID}`).html()},
					"",
					this.options.url
				);
			}
		},
	};

	/**
	 * This component's id attribute.
	 */
	#elementID;

	/**
	 * This component's options. This can be changed at any time by using
	 * {@linkcode RTLoader.setOptions} method.
	 */
	#options = {};

	/**
	 * Identifies whether this component is currently fetching data from the server.
	 */
	#isFetching = false;

	/**
	 * The event handler for the popstate event in this component.
	 */
	#popstateEventFn;

	/**
	 * Creates a new instance of {@linkcode RTLoader} and stores it in the
	 * private `components` object. If the component already exists, an error
	 * will be thrown.
	 *
	 * If you want to obtain an instance of a component, use the static
	 * {@linkcode RTLoader.getInstance} method.
	 *
	 * @param {string} id		The component's id attribute.
	 * @param {object} options	The component's options. If none are passed, the default options from {@linkcode RTLoader.defaultOptions} will be used.
	 */
	constructor(id, options = {}) {
		let element = document.getElementById(id);

		if (!element) {
			throw new Error(`Element with id "${id}" not found.`);
		}

		this.#elementID = this.id;
		this.#options = {
			...RTLoader.defaultOptions,
			...options
		};

		RTLoader.#components[querySelector] = this;

		// If popstate is enabled, add the event listener.
		if (this.options.pushHistoryState)
			enablePopstateEvent();
	}

	/**
	 * Sets a new options for this component. This new option will overwrite the old one
	 * and in a case of a conflict, the new option will be used. Furthermore, if the new
	 * option lacks a key that the old option has, the old option's key will be kept.
	 *
	 * @param {object} options	The component's options.
	 *
	 * @returns {RTLoader}		This component's instance.
	 */
	setOptions(options) {
		this.#options = {
			...RTLoader.defaultOptions,
			...this.#options,
			...options
		};

		return this;
	}

	/**
	 * Sets a new option value for a specific key. The key must be a string, pointing to a
	 * specific option using the dot notation.
	 *
	 * @param {string} key		The option's key.
	 * @param {string} value	The option's value.
	 *
	 * @returns {RTLoader}		This component's instance.
	 */
	setOptions(key, value) {
		let keys = key.split(/\./g);
		key = keys.pop();
		let option = Tutorial.#options;

		if (option === null || Object.keys(option).length <= 0) {
			option = Tutorial.defaultOptions;
		}

		let node = keys.reduce(
			(node, key) => node[key],
			option
		);
		node[key] = value;

		return this;
	}

	/**
	 * Disposes the component's instance. The component will now be a static HTML
	 * and will not be able to be loaded again unless a new instance of {@linkcode RTLoader}
	 * is created.
	 */
	dispose() {
		this.disabledPopstateEvent();
		delete RTLoader.#components[this.#elementID];
	}

	/**
	 * An alias to {@linkcode RTLoader.dispose}.
	 *
	 * @see {@link RTLoader.dispose}
	 */
	destroy() {
		this.dispose();
	}

	/**
	 * Updates the component by fetching the data from the server and loading it. The data
	 * can be updated in this call by passing the `updatedData` parameter. The provided
	 * callbacks (`options.success` & `options.error`) will be called when the request
	 * is successful or not, respectively.
	 *
	 * By default, the `options.success` callback will load the data into the component's
	 * element. If you want to change this behavior, you can change the `options.success`
	 * callback by using {@linkcode RTLoader.setOptions} method.
	 *
	 * The `options.error` callback will be called when the request fails. By default,
	 * this callback will log the error into the console. If you want to change this
	 * behavior, you can change the `options.error` callback by using
	 * {@linkcode RTLoader.setOptions} method.
	 *
	 * Furthermore, if you want to debug the data, you can set the `logData` parameter to
	 * `true`. This will log the data into the console.
	 *
	 * This method will not do anything if the component is already fetching data.
	 *
	 * @param {string} updatedData	The data to be sent to the server. Defaults to the component's original data.
	 * @param {boolean} logData		Whether to log the data into the console or not. Defaults to `false`.
	 */
	update(updatedData = undefined, logData = false) {
		this.#fetchData(updatedData, logData);
	}

	/**
	 * Enables the popstate event for this component. This will enable the component
	 * to load the data from the server when the user navigates back to the page.
	 * This will also enable the component to push the current state into the history
	 * when the data is loaded.
	 */
	enablePopstateEvent() {
		this.#options.pushHistoryState = true;

		this.#popstateEventFn = ((e) => {
			document.getElementById(this.elementID)
				.innerHTML = e.state.content;
		}).bind(this);

		window.addEventListener('popstate', this.#popstateEventFn);
	}

	/**
	 * Disables the popstate event for this component. This will disable the component
	 * to load the data from the server when the user navigates back to the page.
	 * This will also disable the component to push the current state into the history
	 * when the data is loaded. However, the component will still be able to load the
	 * already pushed state into the component's element.
	 */
	disabledPopstateEvent() {
		this.#options.pushHistoryState = false;

		window.removeEventListener('popstate', this.#popstateEventFn);
	}

	/**
	 * Fetches the data from the server and loads it into the component's element.
	 *
	 * If you want to change the behavior of this method, you can change the
	 * `options.success` callback by using {@linkcode RTLoader.setOptions} method.
	 * On the other hand, the `options.error` callback will be called when the request
	 * fails and you can change it by using {@linkcode RTLoader.setOptions}.
	 *
	 * Furthermore, if you want to debug the data, you can set the `logData` parameter to
	 * `true`. This will log the data into the console.
	 *
	 * @param {string} updatedData	The data to be sent to the server. Defaults to the component's original data.
	 * @param {boolean} logData		Whether to log the data into the console or not. Defaults to `false`.
	 */
	async #fetchData(updatedData = undefined, logData = false) {
		// Prevents the component from fetching data if it is already fetching.
		if (this.#isFetching) return;

		// Sets the component's fetching state to true.
		this.#isFetching = true;
		// Check which data to use; the updated data or the original data, and sets it.
		updatedData = updatedData ?? this.#options.data;

		// Fetches the data from the server.
		let response = await fetch(this.#options.url, {
			method: this.#options.action,
			body: this.#options.data
		});

		if (logData)
			console.log("Response:\n", response);

		// Calls the success callback if the request was successful.
		if (response.ok) {
			response.text()
				.then((data) => {
					if (logData)
						console.log("Data:\n", data);

					this.#options.success(data);
				});
		}
		// Calls the error callback if the request failed.
		else {
			if (logData)
				console.error(response);

			this.#options.error(response);
		}

		// Calls the finally callback then sets the component's fetching state to false.
		this.#options.finally();
		this.#isFetching = false;
	}

	/**
	 * Gets the component's {@link RTLoader} instance. The returned value is a reference
	 * to the component's instance, so any changes made to the returned value will
	 * be made to the component's instance.
	 *
	 * @param {string} id	The component's id attribute.
	 *
	 * @returns {RTLoader}	The component's instance.
	 */
	static getInstance(id) {
		return RTLoader.#components[document.getElementById(id)];
	}

	/**
	 * Gets the component's {@link RTLoader} instance. If the component's instance
	 * does not exist, a new instance will be created and returned.
	 *
	 * @param {string} id		The component's id attribute.
	 * @param {object} options	The component's options.
	 *
	 * @returns {RTLoader}		The component's instance.
	 */
	static getOrCreateInstance(id, options = {}) {
		let el = document.getElementById(id);
		if (el && RTLoader.#components[el]) {
			return RTLoader.#components[id];
		}

		return new RTLoader(id, options);
	}

	/**
	 * Retrieves a copy of the default options used by {@linkcode RTLoader}.
	 */
	static get defaultOptions() {
		return JSON.parse(JSON.stringify(RTLoader.#defaultOptions));
	}

	/**
	 * Retrieves a copy of the component's options. Any changes made to the returned
	 * value will not be applied to the component's instance.
	 *
	 * @returns {object}	The component's options.
	 */
	get options() {
		return JSON.parse(JSON.stringify(this.#options));
	}

	/**
	 * Retrieves the component's id attribute.
	 *
	 * @returns {string}	The component's id attribute.
	 */
	get elementID() {
		return this.#elementID;
	}

	/**
	 * Retrieves the component's fetching state.
	 *
	 * @returns {boolean}	`true` if the component is fetching data, `false` otherwise.
	 */
	get isFetching() {
		return this.#isFetching;
	}
}

export const RTLoader = RTLoader;
