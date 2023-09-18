$(document).ready(() => {
	$('#masthead').on('click', (e) => {
		let obj = $(e.currentTarget);
		let counter = obj.attr('data-count');

		if (typeof counter == 'undefined') {
			obj.attr('data-count', 0);
	
			counter = obj.attr('data-count');
		}

		if (counter < 5) {
			obj.attr('data-count', parseInt(counter) + 1);

			setTimeout(() => {
				if (obj.attr('data-count') > 0)
					obj.attr('data-count', parseInt(obj.attr('data-count')) - 1);
				
				if (obj.attr('data-count') == 0)
					obj.removeAttr('data-count');
			}, 5000);
		}
		else {
			if (obj.attr('data-url') === undefined)
				window.location = `/login`;
			else
				window.location = obj.attr('data-url');
		}
	});
});