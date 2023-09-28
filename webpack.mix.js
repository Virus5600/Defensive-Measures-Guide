const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

// START
mix
	// Configurations
	.webpackConfig({
		resolve: {
			alias: {
				jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
				jQuery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js')
			}
		},
		devtool: 'inline-source-map'
	})
	.sourceMaps()
	.disableNotifications()

	// JavaScript
	.js('resources/js/app.js', 'public/js')
	
	.js('resources/js/custom/components/login-page.js', 'public/js/custom/components')
	.js('resources/js/custom/components/navbar-dynamic.js', 'public/js/custom/components')

	// JS Libs
	.js('resources/js/libs/popperjs.js', 'public/js/libs')
	.js('resources/js/libs/slick.js', 'public/js/libs')
	.js('resources/js/libs/summernote.js', 'public/js/libs')
	.js('resources/js/libs/swal.js', 'public/js/libs')
	
	// JS Utilities
	.copy('resources/js/util/', 'public/js/util')

	// SASS
	.sass('resources/scss/app.scss', 'public/css')
	.sass('resources/scss/general.scss', 'public/css')

	// SASS Libs
	.sass('resources/scss/libs/slick.scss', 'public/css/libs')
	.sass('resources/scss/libs/summernote.scss', 'public/css/libs')
	.sass('resources/scss/libs/swal.scss', 'public/css/libs')

	// SASS Utilities
	.sass('resources/scss/util/image-input.scss', 'public/css/util')
	.sass('resources/scss/util/text-counter.scss', 'public/css/util')

	// WIDGETS
	// Cards
	.sass('resources/scss/widget/card-widget.scss', 'public/css/widget')

	// LAYOUTS
	// Public Layout
	.sass('resources/scss/views/layouts/public.scss', 'public/views/layouts/public')

	// Admin Layout
	.sass('resources/scss/views/layouts/admin.scss', 'public/views/layouts/admin')
	.js('resources/js/views/layouts/admin.js', 'public/views/layouts/admin')

	// VIEWS
	// Index (Home) Page
	.js('resources/js/views/index.js', 'public/views/index')
	.sass('resources/scss/views/index.scss', 'public/views/index')

	// Login Page
	.js('resources/js/views/login.js', 'public/views/login')
	.sass('resources/scss/views/login.scss', 'public/views/login')
	// ENDING
	;