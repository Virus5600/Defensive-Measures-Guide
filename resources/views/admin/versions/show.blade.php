@extends('layouts.admin')

@section('title', "Version {$version->tag}")

@section('content')
<div class="card floating-header rounded my-5">
	{{-- HEADER --}}
	<h2 class="card-header header-center header-lg-start border border-secondary bg-body rounded">
		<a href="{{ route('admin.versions.index') }}" class="link-light text-decoration-none">
			<i class="fas fa-share fa-flip-horizontal me-3"></i>{{ $version->tag }}
		</a>
	</h2>
</div>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('css/widget/card-widget.css') }}">
@endsection
