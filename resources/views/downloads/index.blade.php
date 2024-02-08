@extends('layouts.public')

@section('title', 'Downloads')

@section('content')
<section class="container-fluid my-5 p-lg-5 p-3 body-container">
</section>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('views/index/index.css') }}">
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('views/index/index.js') }}" nonce="{{ csp_nonce() }}"></script>
@endsection
