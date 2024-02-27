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
		/**
		 * The URL to fetch the data from.
		 */
		url:					window.location.href,
		/**
		 * The HTTP method to use.
		 */
		action:					"GET",
		/**
		 * The data to be sent to the server. This can be a string or a FormData object.
		 */
		data:					"",
		/**
		 * The event that will trigger the component to load the data from the server.
		 */
		trigger:				"submit",
		/**
		 * Whether to push the current state into the history or not. If this option
		 * is set to `true`, the component will push the current state into the history
		 * when the data is loaded. This will allow the user to navigate back to the
		 * previous state. At the same time, it will also set the `popstateEvent.enabled`
		 * option to `true`.
		 *
		 * If this option is set to `false`, the component will not push the current state
		 * into the history and will not allow the user to navigate back to the previous
		 * state. At the same time, it will also set the `popstateEvent.enabled` option to
		 * `false`.
		 */
		pushHistoryState:		false,
		/**
		 * Whether to update the data or not. If this option is set to `true`, the
		 * component will update the data by fetching the data from the server. If
		 * this option is set to `false`, the component will not update the data
		 * and will use the original data.
		 */
		updateData:				true,
		/**
		 * The event object to be passed to the event listeners.
		 * @property {boolean} preventDefault		Whether to prevent the default behavior or not.
		 * @property {boolean} stopPropagation		Whether to stop the propagation or not.
		 */
		event: {
			/**
			 * Defines whether the event will prevent the default behavior or not.
			 */
			preventDefault:		true,
			/**
			 * Defines whether the event will stop the propagation or not.
			 */
			stopPropagation:	true,
		},
		// CALLBACKS
		/**
		 * Called when the request is successful. By default, this callback will load
		 * the data into the component's element. If you want to change this behavior,
		 * you can change the `options.success` callback by using {@linkcode RTLoader.setOptions}
		 *
		 * @param {string} data The data fetched from the server.
		 */
		success: (data) => {
			if (data.includes("nonce="))
				data = data.replaceAll(/(nonce=)(.\w+.)/g, `$1${document.querySelector('meta[name="csp-nonce"]').content}`);

			let el = new DOMParser().parseFromString(data, 'text/html')
				.getElementById(this.elementID);

			document.getElementById(this.elementID)
				.insertAdjacentElement('beforeend', el);
		},
		/**
		 * Called when the request fails. By default, this callback will log the error
		 * into the console to let developers debug the error. If you want to change
		 * this behavior, you can change the `options.error` callback by using
		 * {@linkcode RTLoader.setOptions}
		 *
		 * @param {Error} e The error object.
		 */
		error: (e) => {
			console.error(e);
		},
		/**
		 * Called when the request is finished, regardless of the result. This callback
		 * will be called after the `options.success` and `options.error` callbacks.
		 * If you want to change this behavior, you can change the `options.finally`
		 * callback by using {@linkcode RTLoader.setOptions}
		 *
		 * @param {RTLoader} component An RTLoader instance.
		 */
		finally: (component) => {},
		// POPSTATE EVENT
		/**
		 * Contains popstate related options such as the popstate event handler and
		 * the push-state function.
		 *
		 * @property {boolean} enabled		Defines whether RT Loader will use the popstate event or not which allows the user to navigate back to the previous state. This option is useful for data that is loaded from the server that will be displayed to the user.
		 * @property {function} popFn		The popstate event handler. This function will be called when the user traverses back or forward the history.
		 * @property {function|null} pushFn		A custom function that will identify what to save in the history. This function will be called when the user triggers the component to load the data from the server. Usually, this will be used in tandem with the `popFn` function, as it will be used to save a custom state into the history instead of the just saving the component's content.
		 */
		popstateEvent: {
			/**
			 * Defines whether RT Loader will use the popstate event or not which allows
			 * the user to navigate back to the previous state. This option is useful for
			 * data that is loaded from the server that will be displayed to the user.
			 *
			 * Defaults to `true`.
			 */
			enabled: true,
			/**
			 * The popstate event handler. This function will be called when the user
			 * traverses back or forward the history.
			 *
			 * @param {Event} e The popstate event.
			 */
			popFn: (e) => {
				let data = e.state.rtContent;

				document.getElementById(this.elementID).innerHTML = data.rtContent;
			},
			/**
			 * A custom function that will identify what to save in the history. This
			 * function will be called when the user triggers the component to load
			 * the data from the server.
			 *
			 * Usually, this will be used in tandem with the `popFn` function, as it
			 * will be used to save a custom state into the history instead of the
			 * just saving the component's content.
			 *
			 * This function must return a serializable object that will be pushed
			 * into the history.
			 *
			 * Defaults to `null`.
			 */
			pushFn: null
		}
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
	 * The event handler for the trigger event in this component.
	 */
	#triggerEventFn;

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

		this.#elementID = id;
		this.#options = {
			...RTLoader.defaultOptions,
			...options
		};

		RTLoader.#components[this.#elementID] = this;

		// Add the listener to the element.
		this.#triggerEventFn = ((e) => {
			if (this.#options.event.preventDefault)
				e.preventDefault();

			if (this.#options.event.stopPropagation)
				e.stopPropagation();

			this.#fetchData();
		}).bind(this);
		element.addEventListener(this.#options.trigger, this.#triggerEventFn);

		// If popstate is enabled, add the event listener.
		if (this.options.pushHistoryState || this.options.popstateEvent.enabled)
			this.enablePopstateEvent();

		RTLoader.#init();
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
		this.disablePopstateEvent();

		document.getElementById(this.elementID)
			.removeEventListener(this.#options.trigger, this.#triggerEventFn);

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
		this.#options.popstateEvent.enabled = true;

		if (this.#options.popstateEvent.popFn == RTLoader.#defaultOptions.popstateEvent.popFn) {
			this.#popstateEventFn = ((e) => {
				document.getElementById(this.elementID)
					.innerHTML = e.state.rtContent;
			}).bind(this);
		}
		else {
			this.#popstateEventFn = this.#options.popstateEvent.popFn.bind(this);
		}

		window.addEventListener('popstate', this.#popstateEventFn);
	}

	/**
	 * Disables the popstate event for this component. This will disable the component
	 * to load the data from the server when the user navigates back to the page.
	 * This will also disable the component to push the current state into the history
	 * when the data is loaded. However, the component will still be able to load the
	 * already pushed state into the component's element.
	 */
	disablePopstateEvent() {
		this.#options.pushHistoryState = false;
		this.#options.popstateEvent.enabled = true;

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
		if (this.#options.updateData) {
			let newParams = new URLSearchParams(Array.from(new FormData(document.getElementById(this.#elementID)))).toString();
			updatedData = updatedData ?? newParams ?? this.#options.data;
		}
		this.#options.data = updatedData = updatedData ?? this.#options.data;

		// Fetches the data from the server.
		let response, newURL = this.#options.url;

		if (this.#options.action.toUpperCase() == "GET") {
			newURL = `${this.#options.url}?${this.#options.data}`;
			response = await fetch(newURL, {
				method: this.#options.action,
			});
		}
		else {
			response = await fetch(this.#options.url, {
				method: this.#options.action,
				body: this.#options.data
			});
		}

		if (logData)
			console.log("Response:\n", response);

		// Calls the success callback if the request was successful.
		if (response.ok) {
			response.text()
				.then((data) => {
					if (logData)
						console.log("Data:\n", data);

					this.#options.success(data);

					// Pushes the current state into the history if the option is enabled.
					// Only runs after a successful request.
					if (this.#options.pushHistoryState || this.#options.popstateEvent.enabled) {
						RTLoader.#pushState(
							document.getElementById(this.#elementID).innerHTML,
							newURL,
							this.#options.popstateEvent.pushFn
						);
					}
				});
		}
		// Calls the error callback if the request failed.
		else {
			if (logData)
				console.error(response);

			this.#options.error(response);
		}

		// Calls the finally callback then sets the component's fetching state to false.
		this.#options.finally(this);
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
	 * Retrieves the states from the popstate event. This method is used to
	 * fetch the states passed to the history when the history is traversed.
	 *
	 * @param {PopStateEvent} e The popstate event.
	 *
	 * @returns {object} The states passed to the history.
	 */
	static getStates(e) {
		return e.state.rtContent;
	}

	static #init() {
		document.addEventListener('readystatechange', (e) => {
			window.history.replaceState(
				{"content": document.getElementById('inner-content').innerHTML},
				"",
				window.location.href
			)
		}, {
			once: true
		});
	}

	/**
	 * Pushes the current state into the history, allowing the user to navigate back
	 * to the previous state.
	 *
	 * This method accepts a custom function that will be called when the state is
	 * pushed. This function must return a serializable object that will be pushed
	 * into the history, which will allow the user to navigate back to the previous
	 * state.
	 *
	 * @param {object} content	The content to be pushed into the history.
	 * @param {string} newUrl	The new URL that will be used by the pushed content.
	 * @param {function} customFn	The custom function to be called when the state is pushed. Defaults to `null`.
	 */
	static #pushState(content, newURL, customFn = null) {
		window.history.pushState(
			{
				"rtContent": customFn == null ? content : customFn()
			},
			"",
			newURL
		);
	}

	/**
	 * Retrieves a copy of the default options used by {@linkcode RTLoader}.
	 *
	 * The following are the options that are available for {@linkcode RTLoader}:
	 * - **string** `url`: The URL to fetch the data from.
	 * - **string** `action`: The HTTP method to use.
	 * - **string** `data`: The data to be sent to the server.
	 * - **string** `trigger`: The event that will trigger the component to load the data from the server.
	 * - **boolean** `pushHistoryState`: Whether to push the current state into the history or not.
	 * - **boolean** `updateData`: Whether to update the data or not.
	 * - **object** `event`: The event object to be passed to the event listeners.
	 * 	- **boolean** `preventDefault`: Whether to prevent the default behavior or not.
	 * 	- **boolean** `stopPropagation`: Whether to stop the propagation or not.
	 * - **function** `success`: The callback to be called when the request is successful.
	 * - **function** `error`: The callback to be called when the request fails.
	 * - **function** `finally`: The callback to be called when the request is finished.
	 * - **object** `popstateEvent`: The popstate event related options.
	 * 	- **boolean** `enabled`: Whether RT Loader will use the popstate event or not.
	 * 	- **function** `popFn`: The popstate event handler.
	 * 	- **function** `pushFn`: The custom function to be called when the state is pushed.
	 */
	static get defaultOptions() {
		return {
			...RTLoader.#defaultOptions
		};
	}

	/**
	 * Retrieves a copy of the component's options. Any changes made to the returned
	 * value will not be applied to the component's instance.
	 *
	 * @returns {object}	The component's options.
	 */
	get options() {
		return {...this.#options};
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

// TODO: Have a setter and option for popstateEventFN
