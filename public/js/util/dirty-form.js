document.addEventListener('DOMContentLoaded', () => {
	// Identifies if the "serialize" keyword is already used
	let serializeUsed = HTMLFormElement.prototype.serialize ? true : false;

	// Function stored in a variable for later comparison
	let serialize = function(isString = false) {
		let data = Object.fromEntries(new FormData(this).entries());
		return isString ? JSON.stringify(data) : data;
	};

	// Create the serialize function
	if (!HTMLFormElement.prototype.serialize)
		HTMLFormElement.prototype.serialize = serialize;
	else if (HTMLFormElement.prototype.serialize.toString() === serialize.toString())
		HTMLFormElement.prototype.serializeDF = serialize;

	// Bind the 
	document.querySelectorAll(`form`).forEach((v) => {
		dirtyForm.bindForm(v);
	});
});

// Initilize the constant
const dirtyForm = {
	/**
	 * Identifies whether the form is dirty (edited or changed) or not. If the form does
	 * not have the object needed, returns `false`.
	 * 
	 * @param form	The form element to identify whether it is "dirty" or not.
	 * 
	 * @return boolean `true` if the form is edited in any way or form; `false` otherwise.
	 */
	isDirty: function(form) {
		return form.isDirty ?? false;
	},

	/**
	 * Binds the "dirty" identifier to the form
	 */
	bindForm: function(form) {
		if (form.nodeName !== 'FORM') {
			console.warn(`Element is not a form element: `, form);
			return false;
		}

		form.isDirty = false;
		form.defaultState = form.serialize(true);

		form.addEventListener("change", function isThisDirty(e) {
			let obj = e.currentTarget;
			let currentSerialized = obj.serialize(true);

			if (obj.defaultState == currentSerialized)
				obj.isDirty = false;
			else
				obj.isDirty = true;
		});
	}
};