@extends("layouts.public")

@section("title", "Home")

@section("content")
	<div class="container mx-auto">
		<h1 class="text-4xl font-bold">Welcome to {{ $webName }}</h1>
		<p class="mt-4">Your one-stop solution for all your needs.</p>
	</div>
@endsection
