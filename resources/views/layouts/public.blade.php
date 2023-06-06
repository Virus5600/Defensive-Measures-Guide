@php
use App\Models\Settings;

$webName = Settings::getValue('web-name');
$webDesc = Settings::getValue('web-desc');
$webLogo = Settings::getInstance('web-logo')->getImage();
@endphp

<!DOCTYPE html>
<html lang="en" data-bs-theme="dark">
	<head>

		{{-- META DATA --}}
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
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

		{{-- COMMON LIBS --}}
		<link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}">
		<link rel="stylesheet" type="text/css" href="{{ mix('css/general.css') }}">
		<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>

		{{-- CUSTOM STYLES --}}
		@yield('css')

		{{-- TITLE --}}
		<title>{{ $webName }} | @yield('title')</title>
	</head>

	<body>
		{{-- NOSCRIPT --}}
		@include('includes.noscript')

		<div class="d-flex flex-column min-vh-100 js-only">
			{{-- HEADER --}}
			<header class="header dark-shadow">
				<style type="text/css">:root { --carousel-arrow: url('{{ asset("images/settings/carousel/arrow.png") }}'); }</style>
				@yield('header')
			</header>

			{{-- CONTENTS --}}
			<main class="content d-flex flex-column flex-grow-1 my-3 my-lg-5" id="content">
				<div class="container-fluid content flex-fill m-0">
					@yield('content')
				</div>
			</main>

			{{-- FOOTER --}}
			<footer class="footer">
				<div class="container-fluid">
					@include('includes.footer')
				</div>
			</footer>
		</div>

		{{-- SCRIPTS --}}
		@include('includes.swal-flash')

		{{-- CUSTOM SCRIPTS --}}
		@yield('js')
	</body>
</html>