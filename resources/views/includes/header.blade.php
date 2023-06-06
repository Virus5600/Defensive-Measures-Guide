{{-- Navigation Bar --}}
<nav class="navbar navbar-expand-lg fixed-top shadow px-lg-3 bg-body-tertiary font-minecraftia" id="mainNavbar">
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
		<ul class="navbar-nav ml-auto">
			<li class="nav-item">
				@if (\Request::is('/'))
				<span class="nav-link active">Home</span>
				@else
				<a href="{{ route('home') }}" class="nav-link"></a>
				@endif
			</li>

			<li class="nav-item">
				@if (\Request::is('downloads'))
				@elseif (\Request::is('downloads*'))
				@else
				@endif
			</li>

			<li class="nav-item">
				@if (\Request::is('installation'))
				@elseif (\Request::is('installation*'))
				@else
				@endif
			</li>

			<li class="nav-item">
				@if (\Request::is('contents'))
				@elseif (\Request::is('contents*'))
				@else
				@endif
			</li>
		</ul>
	</div>
</nav>

@php ($carousel = array())

{{-- Carousel --}}
<section class="container-fluid mt-5 pt-5">
	<div class="row">
		<div class="col-10 offset-1">
			<div class="carousel js-only">
				@forelse($carousel as $c)
				<div class="bg-secondary" style="--bg-img: url('{{ $c->file }}')">
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