@extends('layouts.admin')

@section('title', "Updates - {$type}")

@section('content')
<div class="d-flex flex-column h-100">
	<div class="row">
		<div class="col-12 col-lg-4 col-lg mt-3">
			<div class="row">
				{{-- HEADER --}}
				<div class="col-12 text-center text-lg-start">
					<h1 class="fs-2 my-0">Updates - {{ $type }}</h1>
				</div>
			</div>
		</div>
	</div>

	<hr class="border-3 my-4">

	<div class="card shadow-lg py-2 px-3 mb-3" id="inner-content">
		<div class="row">
			<div class="col-12">
				<div class="border rounded table-responsive-container">
					<div class="table-responsive">
						<table class="table table-striped table-hover table-sm my-2">
							<thead>
								<tr>
									<th class="p-3" scope="col">Version</th>
									<th class="p-3" scope="col">Description</th>
									<th class="p-3" scope="col"></th>
								</tr>
							</thead>

							<tbody class="table-group-divider">
								@php($i = 0)
								@forelse ($updates as $update)
								<tr class="slideFromLeft delay-animation opacity-0" style="--anim-delay: {{ $i }}s;">
									<td class="align-middle p-3">{{ $update->getVersion() }}</td>
									<td class="align-middle p-3 text-wrap text-truncate">{{ $update->description }}</td>
									<td class="align-middle p-3"></td>
								</tr>
								@php($i += .25)
								@empty
								@endforelse
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection
