{{-- Navigation Bar --}}
<nav class="navbar navbar-expand-lg fixed-top shadow px-3 bg-body-tertiary font-minecraftia" id="mainNavbar">
	{{-- Branding --}}
	<a href="{{ route('home') }}" class="navbar-brand m-0">
		<img src="{{ asset('/images/ui/Cannon Turret.png') }}" alt="Defensive Measures Logo" width="auto" height="50" class="mh-100 m-0 p-0">
		<img src="{{ asset('/images/ui/Defensive Measures Guide.png') }}" alt="Defensive Measures Logo" width="auto" height="33" class="mh-100 m-0 p-0">
	</a>

	{{-- Navbar Toggler (on small screens) --}}
	<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle Navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	{{-- Navbar Contents --}}
	<div class="collapse navbar-collapse" id="navbarContent">
		<ul class="navbar-nav ms-auto">
			<li class="nav-item">
				@if (\Request::is('/'))
				<span class="nav-link active">Home</span>
				@else
				<a href="{{ route('home') }}" class="nav-link">Home</a>
				@endif
			</li>

			<li class="nav-item">
				@if (\Request::is('downloads'))
				<span class="nav-link active">Downloads</span>
				@elseif (\Request::is('downloads*'))
				<a href="{{ route('home') }}" class="nav-link active">Downloads</a>
				@else
				<a href="{{ route('home') }}" class="nav-link">Downloads</a>
				@endif
			</li>

			<li class="nav-item">
				@if (\Request::is('installation'))
				<span class="nav-link active">Installations</span>
				@elseif (\Request::is('installation*'))
				<a href="{{ route('home') }}" class="nav-link active">Installations</a>
				@else
				<a href="{{ route('home') }}" class="nav-link">Installations</a>
				@endif
			</li>

			<li class="nav-item">
				@if (\Request::is('contents'))
				<span class="nav-link active">Contents</span>
				@elseif (\Request::is('contents*'))
				<a href="{{ route('home') }}" class="nav-link active">Contents</a>
				@else
				<a href="{{ route('home') }}" class="nav-link">Contents</a>
				@endif
			</li>
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