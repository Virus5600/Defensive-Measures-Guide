// Missing image handling
const head = document.getElementsByTagName('head')[0];
const img = document.getElementsByTagName('img');

let i = 1;
Array.from(img).forEach((v) => {
	v.addEventListener('error', function fallbackImageOnErrorReplace(e) {
		let obj = e.currentTarget;
		let dfiAttr1 = obj.getAttribute('data-fallback-image');
		let dfiAttr2 = obj.getAttribute('data-fallback-img');

		if (dfiAttr1 !== null && dfiAttr1 != 'none') {
			obj.src = dfiAttr1;
		}
		else if (dfiAttr2 !== null && dfiAttr2 != 'none') {
			obj.src = dfiAttr2;
		}
		else {
			let fiFallbackImgURL = typeof fiFallbackImg != 'undefined' ?
				fiFallbackImg : (typeof fiFallbackImage != 'undefined' ?
					fiFallbackImage : 'https://imgur.com/d4xML4G.jpg'
				);

			obj.src = fiFallbackImgURL;

			if (typeof fiFallbackImgURL == 'undefined') {
				obj.id = `imgFallbackMissing${i++}`;
				obj.classList.add('img-fallback-missing');
				console.warn('It seems that this element does not have a fallback image:\n', (window.location.href.indexOf('#') < 0 ? window.location.href : window.location.href.substring(0, window.location.href.indexOf('#'))) + "#" + obj.id);
			}
		}

		obj.removeEventListener('error', fallbackImageOnErrorReplace);
	});
});
