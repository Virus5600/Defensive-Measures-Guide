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
		<link rel="stylesheet" type="text/css" href="{{ mix('views/layouts/public/public.css') }}">
		<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>

		{{-- CUSTOM STYLES --}}
		<link rel="stylesheet" type="text/css" href="{{ mix('views/login/login.css') }}">
		<script type="text/javascript" src="{{ mix('views/login/login.js') }}"></script>
		@yield('css')

		{{-- TITLE --}}
		<title>{{ $webName }} | Admin Login</title>
	</head>

	<body>
		{{-- NOSCRIPT --}}
		@include('includes.noscript')

		<div class="d-flex flex-column min-vh-100 js-only position-relative">
			<div class="d-flex flex-row flex-grow-1 h-100">
				{{-- BACKGROUND LEFT --}}
				<div class="w-100 w-md-75 unblur" id="left-hemisphere" style="--bg-img: url('{{ asset("images/home/Defensive Measures Banner.png") }}');">
				</div>

				{{-- BACKGROUND RIGHT --}}
				<div class="d-none d-md-block" id="right-hemisphere">
				</div>
			</div>

			{{-- LOGIN CARD --}}
			<div class="w-75 w-md-50 w-lg-25 position-absolute posabs-center posabs-md-vertical-middle posabs-md-outerright m-md-auto login-card">
				<form class="card" method="POST" action="{{ route("authenticate") }}" enctype="multipart/form-data">
					<div class="card-header text-center">
						<h3 class="card-title d-flex flex-row position-relative">
							<span class="m-auto">LOGIN</span>

							{{-- LOCK/UNLOCK VIEW --}}
							<span id="lock-view" class="position-absolute posabs-vertical-middle posabs-outerright fs-5 ms-auto my-auto unlocked">
								<i class="fas fa-lock-open" data-bs-title="Toggle to lock view" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="dma-tooltip"></i>
								<i class="fas fa-lock" data-bs-title="Toggle to unlock view" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="dma-tooltip"></i>
							</span>
						</h3>
					</div>

					<div class="card-body">
						<div id="login-form">
							{{-- Some Image --}}
							<div class="text-center d-block d-md-none mb-3">
								<img src="{{ asset("images/ui/Defensive Measures Guide.png") }}" class="img img-fluid" draggable="false">
							</div>

							{{-- Actual Form --}}
							<div class="border border-gray rounded p-3">
								@csrf

								{{-- USERNAME --}}
								<div class="form-group">
									<label for="username" class="form-label">Username</label>
									<input id="username" type="text" name="username" class="form-control" value="{{ old('username') }}">
								</div>

								{{-- PASSWORD --}}
								<div class="form-group">
									<label for="password" class="form-label">Password</label>

									<div class="input-group">
										<input id="password" type="password" name="password" class="form-control border-end-0">
										<button type="button" class="btn btn-secondary border-start-0" id="toggle-show-password" aria-label="Show Password" data-target="#password">
											<i id="show" class="fas fa-eye d-none" title="Show"></i>
											<i id="hide" class="fas fa-eye-slash" title="Hide"></i>
										</button>
									</div>
								</div>
							</div>

							{{-- CURSOR ANIMATION --}}
							<span class="cursor-anim"></span>
						</div>
					</div>

					<div class="card-footer d-flex justify-content-center gap-3">
						<button type="submit" data-action="login" class="btn btn-success">Login</button>
						<a href="{{ route('home') }}" class="btn btn-secondary">Go Back</a>
					</div>
				</form>
			</div>

			{{-- TITLE --}}
			<img src="{{ asset("images/ui/Defensive Measures Guide.png") }}" class="img w-50 position-absolute posabs-outerleft posabs-outerbottom d-none d-md-block" draggable="false">
		</div>

		{{-- SCRIPTS --}}
		<script nonce="{{ csp_nonce() }}">
			$(document).ready(() => {
				$('[data-bs-toggle="tooltip"]').tooltip();
			});
		</script>
		<script type="text/javascript" src="{{ mix('js/util/disable-on-submit.js') }}"></script>
		@include('includes.swal-flash')

		@if (Session::has('flash_error'))
		<script type="text/javascript" id="for-removal" nonce="{{ csp_nonce() }}">
			$(document).ready(() => {
				setTimeout(() => {
					$(`#lock-view`)[0].click();
					$(`#for-removal`)[0].remove();
				}, 1000);
			});
		</script>
		@endif
	</body>
</html>
