<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
	<head>
		{{-- META DATA --}}
		<meta http-equiv="Content-Type" content="text/html">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="Content-Language" content="en-US" />

		{{-- SITE META --}}
		<meta name="type" content="website">
		<meta name="title" content="{{ $webName }}">
		<meta name="description" content="{{ $webDesc }}">
		<meta name="image" content="{{ asset('uploads/settings/meta-banner.png') }}">
		<meta name="keywords" content="{{ env('APP_KEYW') }}">
		<meta name="application-name" content="{{ $webName }}">

		{{-- TWITTER META --}}
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:title" content="{{ $webName }}">
		<meta name="twitter:description" content="{{ $webDesc }}">
		<meta name="twitter:image" content="{{ asset('uploads/settings/meta-banner.png') }}">

		{{-- OG META --}}
		<meta property="og:url" name="og:url" content="{{ Request::url() }}">
		<meta property="og:type" name="og:type" content="website">
		<meta property="og:title" name="og:title" content="{{ $webName }}">
		<meta property="og:description" name="og:description" content="{{ $webDesc }}">
		<meta property="og:image" name="og:image" content="{{ asset('uploads/settings/meta-banner.png') }}">

		{{-- FAVICON --}}
		<link rel="icon" href="{{ $webLogo }}">
		<link rel="shortcut icon" href="{{ $webLogo }}">
		<link rel="apple-touch-icon" href="{{ $webLogo }}">
		<link rel="mask-icon" href="{{ $webLogo }}">

		{{-- COMMON LIBS --}}
		<link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ mix('css/general.css') }}">
		<script type="text/javascript" src="{{ mix('js/app.js') }}" nonce="{{ csp_nonce() }}" data-auto-add-css="false"></script>

		{{-- CUSTOM STYLES --}}
		<link rel="stylesheet" type="text/css" href="{{ mix('views/layouts/public/public.css') }}">
		@yield('css')

		{{-- TITLE --}}
		<title>{{ $webName }} | @yield('title')</title>
	</head>

	<body>
		{{-- NOSCRIPT --}}
		@include('includes.noscript')

		<div class="d-flex flex-column min-vh-100 js-only position-relative">
			{{-- HEADER --}}
			<header class="header shadow-lg">
				@include('includes.header')
			</header>

			{{-- CONTENTS --}}
			<main class="content d-flex flex-column flex-grow-1 my-3 my-lg-5" id="content">
				<div class="container-fluid content flex-fill m-0">
					@yield('content')
				</div>
			</main>

			{{-- FOOTER --}}
			<footer class="footer">
				@include('includes.footer')
			</footer>
		</div>

		{{-- SCRIPTS --}}
		@include('includes.swal-flash')

		{{-- CUSTOM SCRIPTS --}}
		@yield('scripts')
	</body>
</html>
