<!DOCTYPE html>
<html lang="en">
	<head>
		{{-- META DATA --}}
		<meta http-equiv="Content-Type" content="text/html">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta http-equiv="Content-Language" content="en-US" />
		<meta name="csp-nonce" content="{{ csp_nonce() }}">

		{{-- CUSTOM META --}}
		@yield('meta')

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
		<meta name="og:url" content="{{ Request::url() }}">
		<meta name="og:type" content="website">
		<meta name="og:title" content="{{ $webName }}">
		<meta name="og:description" content="{{ $webDesc }}">
		<meta name="og:image" content="{{ asset('uploads/settings/meta-banner.png') }}">

		{{-- FAVICON --}}
		<link rel="icon" href="{{ $webLogo }}">
		<link rel="shortcut icon" href="{{ $webLogo }}">
		<link rel="apple-touch-icon" href="{{ $webLogo }}">
		<link rel="mask-icon" href="{{ $webLogo }}">

		@yield('meta')

		{{-- COMMON LIBS --}}
		<link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ mix('css/general.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ mix('css/util/animations.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ mix('css/util/custom-scrollbar.css') }}">
		<script type="text/javascript" src="{{ mix('js/app.js') }}" data-auto-add-css="false"></script>

		{{-- CUSTOM STYLES --}}
		<link rel="stylesheet" type="text/css" href="{{ mix('views/layouts/admin/admin.css') }}">
		@yield('css')

		{{-- TITLE --}}
		<title>{{ $webName }} | @yield('title')</title>
	</head>

	<body class="custom-scrollbar apply-to-all">
		{{-- NOSCRIPT --}}
		@include('includes.noscript')

		<div class="d-flex flex-column min-vh-100 js-only">
			{{-- HEADER --}}
			<header class="header shadow-lg">
				@include('includes.admin.header')
			</header>

			{{-- CONTENTS --}}
			<main class="d-flex flex-column flex-fill m-0" id="content">
				<div class="d-flex flex-fill m-0">
					<div class="d-flex flex-fill position-relative h-100">
						{{-- SIDEBAR --}}
						@include('includes.admin.sidebar')

						{{-- CONTENT --}}
						<div class="container-fluid content flex-fill m-0 pt-2 pb-5 min-h-100">
							@yield('content')
						</div>
					</div>
				</div>
			</main>
		</div>

		@include('includes.swal-flash')

		{{-- COMMON LIBS --}}
		<script type="text/javascript" src="{{ mix('js/util/animation.js') }}"></script>
		<script type="text/javascript" src="{{ mix('js/util/confirm-leave.js') }}" defer></script>
		<script type="text/javascript" src="{{ mix('js/util/dirty-form.js') }}" defer></script>
		<script type="text/javascript" src="{{ mix('js/util/disable-on-submit.js') }}" defer></script>
		<script type="text/javascript" src="{{ mix('js/util/fallback-image.js') }}" defer></script>
		<script type="text/javascript" src="{{ mix('js/util/swal-flash.js') }}"></script>
		<script type="text/javascript" src="{{ mix('js/util/text-counter.js') }}" defer></script>

		<script type="text/javascript" src="{{ mix('views/layouts/admin/admin.js') }}"></script>
		@yield('scripts')
	</body>
</html>
