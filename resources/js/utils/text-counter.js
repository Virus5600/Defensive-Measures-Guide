document.addEventListener('DOMContentLoaded', function init() {
	document.querySelectorAll('.text-counter-input').forEach((el) => {
		el.addEventListener('change', TextCounter.UpdateCounter);
		el.addEventListener('keyup', TextCounter.UpdateCounter);
		el.addEventListener('keydown', TextCounter.UpdateCounter);

		el.dispatchEvent(new Event('change'));
	});
});

/**
 * TextCounter Class for counting the number of characters in a text input.
 *
 * This class is used to count the number of characters in a text input and display the
 * count in a separate element. It also has the ability to restrict the number of characters
 * that can be entered into the input.
 *
 * By default, the class will look for all elements with the class `text-counter-input` and
 * attach the event listeners to them. You can also manually attach the event listeners to
 * specific elements by calling the `TextCounter.init()` method or by creating a new instance
 * of the class with the element as the first argument.
 *
 * When using the manual way, the class will look for its parent element with the class
 * `text-counter-parent`. If the parent element is not found, it will create a new parent
 * element and clone the input element into it. It will then insert the new parent element
 * after the input element and remove the input element. Below is the structure of a complete
 * parent element:
 * ```html
 * <div class="text-counter-parent">
 * 	<input type="text" class="text-counter-input"
 * 		data-tc-max="255"
 * 		data-tc-warn-at="50"
 * 		data-tc-restrict="true"
 * 	>
 * 	<span class="text-counter">255</span>
 * </div>
 * ```
 *
 * On the other hand, below is the structure of a simple input element:
 * ```html
 * <input type="text" class="text-counter-input"
 * 	data-tc-max="255"
 * 	data-tc-warn-at="50"
 * 	data-tc-restrict="true"
 * >
 * ```
 *
 * Alternatively, you could simplify the input element by removing all the attributes and
 * manually setting the attributes in the class constructor. Below is an example of a simple
 * input element:
 * ```html
 * <input type="text" class="text-counter-input">
 * <script>
 * 	document.addEventListener('DOMContentLoaded', () => {
 * 		new TextCounter('.text-counter-input', {
 * 			max: 255,
 * 			warnAt: 50,
 * 			restrict: true,
 * 		});
 * 		// OR
 * 		TextCounter.init('.text-counter-input', {
 * 			max: 255,
 * 			warnAt: 50,
 * 			restrict: true,
 * 		});
 * 	});
 * </script>
 * ```
 *
 * The input element must have the following attributes:
 * - **`data-tc-max`**: `int`		- The maximum number of characters allowed. Default is `255`.
 * - **`data-tc-warn-at`**: `int`	- The number of characters to warn at. Default is `0`.
 *
 * The following attributes are optional:
 * - **`data-tc-restrict`**: `bool`	- Whether to restrict the number of characters. Default is `false`.
 *
 * The class also has a debug mode that can be enabled by setting the `TextCounter.debug` property
 * to `true`. This will log the attributes before and after setting them.
 *
 * ---
 * ### How it works
 * If an element with the class `text-counter-input` is found, the class will attach the
 * event listeners to the element. When the input element's value changes, the class will
 * update the counter element based on the input element's value. The class will also check
 * if the number of characters is below the warning threshold and apply the warning style to
 * the counter element and input element. If the number of characters exceeds the maximum
 * number of characters allowed, the class will apply the danger style to the counter
 * element and input element. The class will also restrict the number of characters entered
 * into the input element if the `data-tc-restrict` attribute is set to `true`.
 *
 * The class is also capable of handling multiple input elements by putting them in a parent
 * element with the class `text-counter-parent`. The parent element must contain the input
 * element and the counter element which must have the classes `text-counter-input` and
 * `text-counter` respectively. The parent element can also contain other elements if needed
 * and could be nested within other elements as desired, allowing for more flexibility.
 *
 * @version 1.0.0
 *
 * @class TextCounter
 *
 * ---
 * @method init(el, options)
 * \- Initializes the TextCounter class with the specified element and options.
 * ---
 * @method UpdateCounter(e)
 * \- Updates the counter element based on the input element's value. This method is called
 * automatically when the input element's value changes as this is used only as an event
 * listener function. You can also call this method manually if needed by passing the event
 * object as an argument. See the function for more details.
 * ---
 *
 * @author Virus5600
 * @GitHub https://github.com/Virus5600
 */
class TextCounter {
	/**
	 * Defines whether to enable debug mode or not. This affects all instances of the class.
	 * @type {boolean}
	 */
	static debug = false;

	/**
	 * Creates an instance of the TextCounter class.
	 *
	 * @param {HTMLElement|string} el	 - The input element or the selector of the input element.
	 * @param {Object} options			 - The options for the TextCounter class.
	 */
	constructor(el, {
		max = 255,
		warnAt = 0,
		restrict = false,
	} = options) {
		if (TextCounter.debug) {
			console.log("Initial Attributes:", { el, max, warnAt, restrict });
		}

		// If the element is a string, convert it to a DOM element
		if (typeof el === 'string')
			el = document.querySelector(el);

		// If the element is not found, throw an error
		if (!el)
			throw new Error('Element not found.');

		// Get the parent element
		let parent = el.closest('.text-counter-parent');

		// If the input element does not have the class 'text-counter-input', add it
		if (!el.classList.contains('text-counter-input'))
			el.classList.add('text-counter-input');

		// If the input does not have a parent with the class 'text-counter-parent'
		// and the parent does not have a child with the class 'text-counter'...
		if (!parent) {
			// Create a new parent element and clone the input element
			parent = `
				<div class="text-counter-parent">
					${el.cloneNode(true).outerHTML}
					<span class="text-counter">${max}</span>
				</div>
			`;

			// Insert the new parent element after the input element
			el.insertAdjacentHTML('afterend', parent);
			parent = el.nextElementSibling;

			// Then remove the input element and replace it with the new cloned element
			el.remove();
			el = parent.querySelector('.text-counter-input');
		}

		// Set the attributes
		if (!el.getAttribute('data-tc-max') || !el.hasAttribute('data-tc-max'))
			el.setAttribute('data-tc-max', max);
		if (!el.getAttribute('data-tc-warn-at') || !el.hasAttribute('data-tc-warn-at'))
			el.setAttribute('data-tc-warn-at', warnAt);
		if ((!el.getAttribute('data-tc-restrict') || !el.hasAttribute('data-tx-restrict')) && restrict)
			el.setAttribute('data-tc-restrict', restrict);

		// Get the attributes
		if (TextCounter.debug) {
			max = el.getAttribute('data-tc-max');
			warnAt = el.getAttribute('data-tc-warn-at') ?? 0;
			restrict = el.getAttribute('data-tc-restrict') ? el.getAttribute('data-tc-restrict') == 'true' : false;

			console.log("Updated Attributes:", {
				"Updated Attr": { max, warnAt, restrict },
				"Updated El": { el, parent }
			});
		}

		// Attach the event listener to the input element
		el.addEventListener('change', TextCounter.UpdateCounter);
		el.addEventListener('keyup', TextCounter.UpdateCounter);
		el.addEventListener('keydown', TextCounter.UpdateCounter);
	}

	/**
	 * Initializes the TextCounter class with the specified element and options.
	 *
	 * @param {HTMLElement|string} el	 - The input element or the selector of the input element.
	 * @param {Object} options			 - The options for the TextCounter class.
	 */
	static init(el, options = {}) {
		if (TextCounter.debug) {
			console.log("Initial Attributes (Static):", { el, options });
		}

		new TextCounter(el, options);
	}

	/**
	 * Updates the counter element based on the input element's value.
	 *
	 * This method is called automatically when the input element's value changes as this is
	 * used only as an event listener function. You can also call this method manually if
	 * needed by passing the event object as an argument. The method will then update the
	 * counter element based on the input element's value.
	 *
	 * The method will also check if the number of characters is below the warning threshold
	 * and apply the warning style to the counter element and input element. If the number of
	 * characters exceeds the maximum number of characters allowed, the method will apply the
	 * danger style to the counter element and input element.
	 *
	 * The method will also restrict the number of characters entered into the input element
	 * if the `data-tc-restrict` attribute is set to `true`.
	 *
	 * This method is static and can be called directly without creating an instance of the class.
	 *
	 * @param {Event|HTMLElement} e
	 */
	static UpdateCounter(e) {
		let obj;
		if (e instanceof Event)
			obj = e.currentTarget;
		else if (e instanceof HTMLElement)
			obj = e;
		else
			throw new Error('Invalid object.', { "Parameter Passed": e });

		if (TextCounter.debug) {
			console.log("Target Object:", { obj });
		}

		let parent = obj.closest('.text-counter-parent');
		let counter = parent.querySelector('.text-counter');
		let max = obj.getAttribute('data-tc-max');
		let warnAt = obj.getAttribute('data-tc-warn-at') ?? 0;
		let restrictEnabled = obj.getAttribute('data-tc-restrict') ? obj.getAttribute('data-tc-restrict') == 'true' : false;
		const DEBUG = obj.getAttribute('data-tc-debug') ? obj.getAttribute('data-tc-debug') == 'true' : false;

		if (DEBUG) {
			console.log({
				obj,
				parent,
				counter,
				max,
				warnAt,
				DEBUG
			});
		}

		if (typeof warnAt !== 'number' && isNaN(warnAt))
			warnAt = 0;

		counter.innerText = max - obj.value.length;

		warnAt = parseInt(warnAt);
		let textLen = parseInt(counter.innerText);

		if (restrictEnabled) {
			if (textLen < 0) {
				obj.value = obj.value.slice(0, max);
				counter.innerText = 0;
			}
		}

		if (textLen <= warnAt && textLen > 0) {
			counter.classList.add('bg-warning');
			counter.classList.remove('bg-danger');
			obj.classList.add('mark-warning');
			obj.classList.remove('mark-danger');
		}
		else if (textLen <= 0) {
			counter.classList.remove('bg-warning');
			counter.classList.add('bg-danger');
			obj.classList.remove('mark-warning');
			obj.classList.add('mark-danger');
		}
		else {
			counter.classList.remove('bg-danger');
			counter.classList.remove('bg-warning');
			obj.classList.remove('mark-danger');
			obj.classList.remove('mark-warning');
		}
	};
}

// Export the TextCounter class
window.TextCounter = TextCounter;
