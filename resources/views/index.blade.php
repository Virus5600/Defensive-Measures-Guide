@extends('layouts.public')

@section('title', 'Home')

@section('header')
@include('includes.header')
@endsection

@section('content')
<section class="container-fluid my-5 p-lg-5 p-3 body-container">
	<div class="row">
		<div class="col">
			{{-- BANNER --}}
			<div class="row">
				<div class="col text-center">
					<img src="{{ asset("images/home/Defensive Measures Add-On Banner.png") }}" alt="Banner" class="w-100 w-lg-75 cursor-pointer" draggable="false" data-bs-toggle="modal" data-bs-target="#banner-modal">

					<div id="banner-modal" class="modal fade" tabindex="-1" aria-label="Defensive Measures Banner" aria-hidden="true">
						<div class="modal-dialog modal-xl modal-fullscreen-md-down modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>

								<div class="modal-body">
									<div class="d-flex flex-column h-100">
										<img src="{{ asset("images/home/Defensive Measures Add-On Banner.png") }}" alt="Banner" class="my-auto" width="100%" draggable="false">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{{-- DESCRIPTION --}}
			<div class="row">
				<div class="col">
					<p class="my-3">
						Defensive Add-on is an add-on that allows players to place defensive turrets and traps to protect 
						themselves, their creations, positions, and so on. The add-on adds Towers, Traps, Entities, Structures, Villager Variants, and Items to the game, which opens a lot of new capabilities, ideas, and creative imaginations for the players to explore.
					</p>
				</div>
			</div>

			{{-- DOWNLOAD LINK --}}
			<div class="row">
				<div class="col text-center">
					<a href="#" class="btn btn-outline-primary circular-border">
						<i class="fas fa-download me-2"></i>Download
					</a>
				</div>
			</div>
		</div>
	</div>

	<hr class="bg-light hr-thick-100 my-3 my-lg-5">

	{{-- LATEST VERSION --}}
	<div class="row">
		<div class="col">
			<h2>What's New</h2>
			<h4>@{{ $latest_version->version }}</h4>
			<div>@{!! $latest_version->description !!}</div>

			<div class="text-center">
				<img src="@{{ $latest_version->banner }}" alt="@{{ $latest_version->version }} Banner" class="version-banner">
			</div>
		</div>
	</div>
	
	<hr class="bg-light hr-thick-100 my-3 my-lg-5">

	{{-- RECENT FACEBOOK VIDEOS --}}
	<div class="row">
		<div class="col">
			<h2>Recent Facebook Videos</h2>

			@foreach($videos as $v)
			<div class="row my-5">
				<dic class="col">
					<div class="card floating-header rounded">
						<h4 class="card-header">
							@if (isset($v->title) || property_exists($v, 'title'))
								{{ $v->title }}
							@elseif (isset($v->description) || property_exists($v, 'description'))
								{{ substr($v->description, 0, 50) }}...
							@else
								{{ \Carbon\Carbon::parse($v->created_time) }}
							@endif
						</h4>

						<div class="card-body text-center">
							<div class="row">
								<div class="col-12 col-md-9 col-lg-6 mx-auto iframe-wrapper">
									{!! $v->embed_html !!}
								</div>
							</div>
						</div>

						<div class="card-footer">
							<p class="text-light">
								@if (isset($v->description) || property_exists($v, 'description'))
									{!! preg_replace("/(https?:\/\/(www\.)?)([a-zA-Z\-]+)([a-zA-Z\-\.\/\?=&0-9]+)/", "<a href=\"$1$3$4\">$3</a>", $v->description) !!}
								@endif
							</p>
						</div>
					</div>
				</dic>
			</div>
			@endforeach

			<h5 class="text-center">
				<a class="btn btn-outline-primary" target="_new" href="https://facebook.com/watch/101775128453596/720160775280918">
					<i class="fab fa-square-facebook me-2"></i>Watch More...
				</a>
			</h5>
		</div>
	</div>
</section>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('views/index/index.css') }}">
<link rel="stylesheet" type="text/css" href="{{ mix('css/widget/card-widget.css') }}">
@endsection

@section('js')
<script type="text/javascript" src="{{ mix('views/index/index.js') }}"></script>
@endsection