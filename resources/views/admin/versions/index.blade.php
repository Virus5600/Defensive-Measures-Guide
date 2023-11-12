@extends('layouts.admin')

@section('title', "Versions")

@section('content')
<div class="d-flex flex-column h-100">
	<div class="row">
		{{-- HEADER --}}
		<div class="col-12 col-lg-6 mt-3">
			<div class="row">
				<div class="col-12 text-center text-lg-start">
					<h1 class="fs-2 my-0">Versions</h1>
				</div>
			</div>
		</div>

		<div class="col-12 col-lg-6 mt-3">
			<div class="row">
				<div class="col-12 text-center text-lg-end">
					<a href="{{ route('admin.versions.create') }}" class="btn btn-outline-light">
						<i class="fas fa-plus-circle me-2"></i>Add Version
					</a>
				</div>
			</div>
		</div>
	</div>

	<hr class="border-3 my-4">

	<div class="card shadow-lg py-2 px-3 mb-3" id="inner-content">
		<div class="row">
			{{-- FILTERS --}}
			<div class="col-12 col-lg-3 d-flex flex-column">
				<form class="my-2 d-flex flex-column flex-grow-1" id="filters">
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

						{{-- STATUS --}}
						<div class="col-1 pe-0"><hr></div>
						<div class="col-3 px-0 fs-2xs d-flex justify-content-center align-items-center">Status</div>
						<div class="col-8 ps-0"><hr></div>

						<div class="col-12 my-2">
							<div class="form-group d-inline-block">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="1" id="active" name="stat[]" {{ in_array('1', $filters->stat) ? 'checked' : '' }}>
									<label for="active" class="form-check-label">Active</label>
								</div>
							</div>

							<div class="form-group d-inline-block">
								<div class="form-check">
									<input class="form-check-input" type="checkbox" value="2" id="inactive" name="stat[]" {{ in_array('2', $filters->stat) ? 'checked' : '' }}>
									<label for="inactive" class="form-check-label">Inactive</label>
								</div>
							</div>
						</div>
					</div>

					{{-- SUBMIT/RESET BUTTONS --}}
					<div class="d-flex justify-content-center mt-auto">
						<button type="submit" class="btn btn-primary me-2">Filter</button>
						<button type="reset" class="btn btn-secondary">Reset</button>
					</div>
				</form>
			</div>

			<div class="col-12 col-lg-9">
				<div class="border rounded table-responsive-container">
					<div class="table-responsive">
						<table class="table table-striped table-hover table-sm">
							<thead>
								<tr>
									<th class="p-3" scope="col">Version</th>
									<th class="p-3 d-none d-lg-table-cell" scope="col">Description</th>
									<th class="p-3" scope="col">Status</th>
									<th class="p-3" scope="col"></th>
								</tr>
							</thead>

							<tbody class="table-group-divider">
								@php($i = 0)
								@forelse ($versions as $version)
								<tr class="slideFromLeft delay-animation" style="--anim-delay: {{ $i }}s;">
									<th class="align-middle p-3 text-nowrap" scope="row">{{ $version->getVersion() }}</th>
									<td class="align-middle p-3 text-nowrap d-none d-lg-table-cell">
										<div class="text-truncate">
											{{ Str::limit($version->description, 35) }}
										</div>
									</td>
									<td class="align-middle p-3 text-nowrap">
										@if ($version->trashed())
										<i class="fas fa-circle text-danger me-2"></i>Inactive
										@else
										<i class="fas fa-circle text-success me-2"></i>Active
										@endif
									</td>
									<td class="align-middle p-3 text-nowrap">
										<div class="dropdown">
											<button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Actions</button>

											<ul class="dropdown-menu dropdown-menu-end">
												{{-- EDIT --}}
												<li>
													<a href="#" class="dropdown-item">
														<i class="fas fa-pen-to-square me-2 col-2"></i>Edit
													</a>
												</li>

												{{-- ARCHIVE/UNARCHIVE --}}
												<li>
													@if ($version->trashed())
													<a href="#" class="dropdown-item">
														<i class="fas fa-eye me-2 col-2"></i>Unarchive
													</a>
													@else
													<a href="#" class="dropdown-item">
														<i class="fas fa-eye-slash me-2 col-2"></i>Archive
													</a>
													@endif
												</li>

												{{-- DELETE --}}
												<li>
													<a href="#" class="dropdown-item">
														<i class="fas fa-trash me-2 col-2"></i>Delete
													</a>
												</li>
											</ul>
										</div>
									</td>
								</tr>
								@php($i += .25)
								@empty
								<tr>
									<td colspan="4" class="text-center py-2">Nothing to show <i class="fas fa-wind"></i></td>
								</tr>
								@endforelse
							</tbody>
							<tfoot class="{{ $versions->hasPages() ? "" : "d-none" }}">
								<tr>
									<td colspan="4">
										<div class="text-center d-flex justify-content-center mt-3">
											{!! $versions->links() !!}
										</div>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
<script type="text/javascript" src="{{ mix('views/admin/versions/index.js') }}"></script>
@endsection
