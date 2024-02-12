// Missing image handling
const head = document.getElementsByTagName('head')[0];
const img = document.getElementsByTagName('img');
const nonce = head.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');

const style = `
<style ${nonce ? `nonce=${nonce}` : ''}>
	@keyframes img-fallback-missing-pulse {
		0% {
			opacity: 0.125;
			width: 0%;
			height: 0%;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.125;
			width: 100%;
			height: 100%;
		}
	}

	.img-fallback-missing {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.img-fallback-missing::before {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);

		content: '';
		width: 100%;
		height: 100%;

		border-radius: 5px;
		box-shadow: 0px 0px 12.5px #ff0000 inset;

		-webkit-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;
		-moz-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;
		-ms-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;
		-o-animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;
		animation: 1.25s cubic-bezier(0.5, 1, 0.5, 1) img-fallback-missing-pulse;

		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		-ms-animation-iteration-count: infinite;
		-o-animation-iteration-count: infinite;
		animation-iteration-count: infinite;
	}
</style>
`;

head.insertAdjacentHTML("beforeend", style);

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
				fiFallbackImg : fiFallbackImage;

			obj.src = fiFallbackImgURL;

			if (typeof fiFallbackImgURL == 'undefined') {
				obj.id = `imgFallbackMissing${i++}`;
				obj.classList.add('img-fallback-missing');
				console.warn('It seems that this element does not have a fallback image:\n', (window.location.href.indexOf('#') < 0 ? window.location.href : window.location.href.substr(0, window.location.href.indexOf('#'))) + "#" + obj.id);
			}
		}

		obj.removeEventListener('error', fallbackImageOnErrorReplace);
	});
});
