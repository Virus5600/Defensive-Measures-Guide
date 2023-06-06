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
	.js('resources/js/custom/components/navbar-dynamic.js', 'public/js/custom/components')

	// JS Libs
	.js('resources/js/libs/bootstrap5.js', 'public/js/libs')
	.js('resources/js/libs/fontawesome.js', 'public/js/libs')
	.js('resources/js/libs/jQuery.js', 'public/js/libs')
	.js('resources/js/libs/popperjs.js', 'public/js/libs')
	.js('resources/js/libs/slick.js', 'public/js/libs')
	.js('resources/js/libs/summernote.js', 'public/js/libs')
	.js('resources/js/libs/swal.js', 'public/js/libs')

	// SASS
	.sass('resources/scss/app.scss', 'public/css')
	.sass('resources/scss/general.scss', 'public/css')

	// SASS Libs
	.sass('resources/scss/libs/bootstrap5.scss', 'public/css/libs')
	.sass('resources/scss/libs/fontawesome.scss', 'public/css/libs')
	.sass('resources/scss/libs/slick.scss', 'public/css/libs')
	.sass('resources/scss/libs/summernote.scss', 'public/css/libs')
	.sass('resources/scss/libs/swal.scss', 'public/css/libs')

	// WIDGETS
	// Cards
	.sass('resources/scss/widget/card-widget.scss', 'public/css/widget')

	// Index (Home) Page
	.js('resources/js/index.js', 'public/views/index')
	.sass('resources/scss/index.scss', 'public/views/index')
	// ENDING
	;