try {
	// Setting user language
	window.lang = global.lang = (window.navigator.userLanguage || window.navigator.language);

	// jQuery 3.6
	require('./libs/jQuery');

	// Bootstrap 5.3
	require('./libs/bootstrap5');

	// Sweetalert 2
	require('./libs/swal');

	// Fontawesome 6
	require('./libs/fontawesome');
} catch (ex) {
	console.error(ex);
}

// Theming Scripts
(() => {
	'use strict';

	const STORED_THEME = localStorage.getItem('theme');

	const isDarkMode = () => {
		return window.matchMedia(`(prefers-color-scheme: dark)`).matches;
	};

	/**
	 * Identifies the user's preferred theme by fetching the stored theme. If a stored theme
	 * does not exists, identify system theme and return it.
	 */
	const getPreferredTheme = () => {
		if (STORED_THEME)
			return STORED_THEME;

		return isDarkMode() ? 'dark' : 'light';
	};

	/**
	 * Sets the theme that this website will use. If the theme is set to "auto", it will
	 * then proceed to identify whether the user prefers dark or light mode and use that
	 * theming.
	 */
	const setTheme = (theme) => {
		if (theme == 'auto' && isDarkMode())
			document.documentElement.setAttribute('data-bs-theme', 'dark');
		else
			document.documentElement.setAttribute('data-bs-theme', theme);
		setNavbarTheme(isDarkMode());
	};

	/**
	 * Updates the theme logo to easily let users know what theme they are using.
	 */
	const showActiveTheme = (theme, focus = false) => {
		return;
		const themeSwitcher = document.querySelector('');

		if (!themeSwitcher)
			return;

		const themeSwitcherText = document.querySelector(``);
		const activeThemeIcon = document.querySelector(``);
		const btnToActive = document.querySelector(``);
		const svgOfActiveBtn = document.querySelector(``);

		document.querySelectorAll(`[data-bs-theme-value]`).forEach(obj => {
			obj.classList.remove('active');
			obj.setAttribute('aria-pressed', 'false');
		});

		btnToActive.classList.add('active');
		btnToActive.setAttribute('aria-pressed', 'true');
		activeThemeIcon.setAttribute('href', svgOfActiveBtn);

		const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
		themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

		if (focus)
			themeSwitcher.focus();
	}

	// ELEMENT SPECIFIC FUNCTIONS

	// Navbar
	const setNavbarTheme = (isDarkMode) => {
		const navbar = document.querySelector('#mainNavbar');
		
		if (navbar != null) {
			if (isDarkMode) {
				navbar.classList.add('bg-body-tertiary');
				navbar.classList.remove('bg-light');
			}
			else {
				navbar.classList.add('bg-light');
				navbar.classList.remove('bg-body-tertiary');
			}
		}
	};

	setTheme(getPreferredTheme());

	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		if (STORED_THEME !== 'light' || STORED_THEME !== 'dark')
			setTheme(getPreferredTheme());
	});

	window.addEventListener('DOMContentLoaded', () => {
		showActiveTheme(getPreferredTheme());

		document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
			toggle.addEventListener('click', () => {
				const theme = toggle.getAttribute('data-bs-theme-value');
				localStorage.setItem('theme', theme);
				setTheme(theme);
				showActiveTheme(theme, true);
			});
		});
	});
})();