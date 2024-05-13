@extends('layouts.public')

@section('title', 'Testing Page')

@section('content')
<section id="testingBody" class="w-100"></section>
@endsection


@section('scripts')
<script type="module" src="{{ mix('views/test/test.js') }}" nonce="{{ csp_nonce() }}" defer></script>
@endsection
