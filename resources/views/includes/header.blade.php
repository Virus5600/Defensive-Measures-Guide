{{-- Navigation Bar --}}
<nav class="navbar navbar-expand-lg fixed-top shadow-lg px-3 bg-body-tertiary font-minecraftia" id="mainNavbar">
	{{-- Branding --}}
	<a href="{{ route('home') }}" class="navbar-brand m-0">
		<img src="{{ asset('/images/ui/Cannon Turret.png') }}" alt="Defensive Measures Logo" class="m-0 p-0" style="max-height: 2.5rem;">
		<img src="{{ asset('/images/ui/Defensive Measures Guide.png') }}" alt="Defensive Measures Logo" class="m-0 p-0" style="height: 33px;">
	</a>

	{{-- Navbar Toggler (on small screens) --}}
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle Navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	{{-- Navbar Contents --}}
	<div class="collapse navbar-collapse" id="navbarContent">
		<ul class="navbar-nav ms-auto text-center text-lg-start">
			{{-- HOME --}}
			<li class="nav-item">
				@if (\Request::is('/'))
				<span class="nav-link active">Home</span>
				@else
				<a href="{{ route('home') }}" class="nav-link">Home</a>
				@endif
			</li>

			{{-- DOWNLOADS --}}
			<li class="nav-item">
				@if (\Request::is('downloads'))
				<span class="nav-link active">Downloads</span>
				@elseif (\Request::is('downloads*'))
				<a href="{{ route('home') }}" class="nav-link active">Downloads</a>
				@else
				<a href="{{ route('home') }}" class="nav-link">Downloads</a>
				@endif
			</li>

			{{-- INSTALLATION --}}
			<li class="nav-item">
				@if (\Request::is('installation'))
				<span class="nav-link active">Installations</span>
				@elseif (\Request::is('installation*'))
				<a href="{{ route('home') }}" class="nav-link active">Installations</a>
				@else
				<a href="{{ route('home') }}" class="nav-link">Installations</a>
				@endif
			</li>

			{{-- CONTENTS --}}
			<li class="nav-item">
				@if (\Request::is('contents'))
				<span class="nav-link active">Contents</span>
				@elseif (\Request::is('contents*'))
				<a href="{{ route('home') }}" class="nav-link active">Contents</a>
				@else
				<a href="{{ route('home') }}" class="nav-link">Contents</a>
				@endif
			</li>

			{{-- Additional directories if authenticated --}}
			@auth
			{{-- SEPARATOR --}}
			<li class="nav-item">
				<div class="vr h-100 d-none d-lg-block" style="width: 2.5px;"></div>
				<hr class="w-100 d-block d-lg-none" style="border-width: 2.5px;">
			</li>

			{{-- ADMIN DIRECTORIES --}}
			<li class="nav-item">
				<div class="dropdown my-auto">
					{{-- Dropdown Trigger --}}
					<a href="#" role="button" class="nav-link dropdown-toggle fs-6" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{!! auth()->user()->getAvatar(false, true, false) !!}
						{{ auth()->user()->getName() }}
					</a>

					<div class="dropdown-menu dropdown-menu-end text-center text-lg-end">
						{{-- DASHBOARD --}}
						<a href="{{ route('admin.dashboard') }}" class="dropdown-item">Dashboard</a>

						<div class="dropdown-divider"></div>

						{{-- VERSIONS --}}
						<a href="{{ route('admin.versions.index') }}" class="dropdown-item">Versions</a>

						<div class="dropdown-divider"></div>

						{{-- LOGOUT --}}
						<form action="{{ route('logout') }}" method="POST" class="dropdown-item">
							@csrf
							<button type="submit" class="remove-button-style w-100 text-center text-lg-end">Logout</button>
						</form>
					</div>
				</div>
			</li>
			@endauth
		</ul>
	</div>
</nav>

@php ($carousel = array())

{{-- Carousel --}}
<section class="container-fluid mt-5 pt-5">
	<div class="row">
		<div class="col-10 offset-1" id="masthead">
			<div class="carousel js-only">
				@forelse($carousel as $c)
				<div class="bg-secondary carousel-item" style="--bg-img: url('{{ $c->file }}')">
					<div class="backdrop-lg-blur opacity-lg-100 opacity-0">
						<img class="mx-auto" src="{{$c->file}}"/>
					</div>
				</div>
				@empty
				<div class="bg-secondary">
					<div class="backdrop-lg-blur">
						<h3 class="text-center p-5">Nothing for now</h3>
					</div>
				</div>
				@endforelse
			</div>
		</div>
	</div>
</section>
