@extends('layouts.public')

@section('title', 'Downloads')

@section('content')
<section class="container-fluid my-5 body-container">
	<div class="d-flex">
		{{-- FILTERS --}}
		<div class="col-12 col-lg-3 p-3 d-flex flex-column">
			<form class="d-flex flex-column flex-grow-1 card card-body" id="filters" data-dos-not-affected>
				<div class="row">
					{{-- SEARCH --}}
					<div class="col-12 my-2">
						<div class="input-group">
							<input type="text" class="form-control" name="search" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value="{{ $filters->search }}" />
							<button type="submit" class="btn btn-outline-secondary" id="seach-addon" data-action="icon-search">
								<i class="fas fa-search"></i>
							</button>
						</div>
					</div>

					{{-- VERSION --}}
					<div class="col-1 pe-0"><hr></div>
					<div class="col-6 px-0 fs-2xs d-flex justify-content-center align-items-center">Development Stage</div>
					<div class="col-5 ps-0"><hr></div>

					<div class="col-12 my-2">
						<div class="form-group d-inline-block">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="1" id="alpha" name="type[]" {{ in_array('1', $filters->type) ? 'checked' : '' }}>
								<label for="alpha" class="form-check-label">Alpha</label>
							</div>
						</div>

						<div class="form-group d-inline-block">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="2" id="beta" name="type[]" {{ in_array('2', $filters->type) ? 'checked' : '' }}>
								<label for="beta" class="form-check-label">Beta</label>
							</div>
						</div>

						<div class="form-group d-inline-block">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="3" id="release" name="type[]" {{ in_array('3', $filters->type) ? 'checked' : '' }}>
								<label for="release" class="form-check-label">Release</label>
							</div>
						</div>
					</div>

					{{-- SORT BY --}}
					<div class="col-1 pe-0"><hr></div>
					<label class="col-3 px-0 fs-2xs d-flex justify-content-center align-items-center" for="sort_by">Sort By</label>
					<div class="col-8 ps-0"><hr></div>

					<div class="col-12 my-2">
						<div class="form-group">
							<select name="sortBy" id="sort_by" class="form-select">
								<option value="version" {{ $filters->sortBy == 'version' ? 'selected' : '' }}>Version</option>
								<option value="java_release_date" {{ $filters->sortBy == 'java_release_date' ? 'selected' : '' }}>Java Release Date</option>
								<option value="bedrock_release_date" {{ $filters->sortBy == 'bedrock_release_date' ? 'selected' : '' }}>Bedrock Release Date</option>
								<option value="website_release_date" {{ $filters->sortBy == 'website_release_date' ? 'selected' : '' }}>Website Release Date</option>
							</select>
						</div>
					</div>

					{{-- SORT DIRECTION --}}
					<div class="col-1 pe-0"><hr></div>
					<label class="col-5 px-0 fs-2xs d-flex justify-content-center align-items-center" for="sort_dir">Sort Direction</label>
					<div class="col-6 ps-0"><hr></div>

					<div class="col-12 my-2">
						{{-- ASCENDING --}}
						<div class="form-group d-inline-block">
							<div class="form-check">
								<input type="radio" class="form-check-input" name="sortDir" id="asc" autocomplete="off" {{ $filters->sortDir == 'asc' ? 'checked' : ''}} value="asc">
								<label class="form-check-label" for="asc">Oldest</label>
							</div>
						</div>

						{{-- DESCENDING --}}
						<div class="form-group d-inline-block">
							<div class="form-check">
								<input type="radio" class="form-check-input" name="sortDir" id="dsc" autocomplete="off" {{ $filters->sortDir == 'desc' ? 'checked' : ''}} value="desc">
								<label class="form-check-label" for="dsc">Latest</label>
							</div>
						</div>
					</div>
				</div>

				{{-- SUBMIT/RESET BUTTONS --}}
				<div class="d-flex justify-content-center my-3 mt-lg-auto mb-lg-0">
					<button type="submit" class="btn btn-primary me-2">Filter</button>
					<button type="reset" class="btn btn-secondary">Reset</button>
				</div>
			</form>
		</div>

		{{-- TABLE --}}
		<div class="col-12 col-lg-9 p-3">
			<div class="border rounded table-responsive-container h-100">
				<table class="table table-striped table-hover table-sm text-center h-100">
					<thead>
						<tr>
							<th class="p-3" scope="col">Version</th>
							<th class="p-3 d-none d-lg-table-cell" scope="col">Description</th>
							<th class="p-3" scope="col">Variant</th>
							<th class="p-3" scope="col">Java Link</th>
							<th class="p-3" scope="col">Bedrock Link</th>
						</tr>
					</thead>

					<tbody class="table-group-divider" id="table-content">
						@php($i = 0)
						@forelse ($downloads as $download)
						<tr class="slideFromLeft delay-animation" style="--anim-delay: {{ $i }}s;">
							<th class="text-nowrap align-middle">
								<a href="#">{{ $download->getVersion() }}</a>
							</th>

							<td class="align-middle">
								{!!
								str()->limit(
									strip_tags(
										str()->markdown($download->description)
									), 35
								)
								!!}
							</td>

							<td class="align-middle">
								<div class="d-flex flex-column">
									@php ($rd = json_decode($download->release_date))

									@if (property_exists($rd, 'java'))
									<span class="badge rounded-pill text-bg-dark border">Java</span>
									@endif

									@if (property_exists($rd, 'bedrock'))
									<span class="badge rounded-pill text-bg-dark border">Bedrock</span>
									@endif
								</div>
							</td>

							<td class="align-middle">

							</td>

							<td class="align-middle">

							</td>
						</tr>
						@php($i += .25)
						@empty
						<tr>
							<td colspan="5" class="text-center py-2">Nothing to show <i class="fas fa-wind"></i></td>
						</tr>
						@endforelse
					</tbody>
				</table>
			</div>
		</div>
	</div>
</section>
@endsection

@section('css')
<link rel="stylesheet" type="text/css" href="{{ mix('views/index/index.css') }}">
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('js/util/rt-loader.js') }}" nonce="{{ csp_nonce() }}"></script>
<script type="text/javascript" src="{{ mix('views/downloads/index/index.js') }}" nonce="{{ csp_nonce() }}"></script>
@endsection
