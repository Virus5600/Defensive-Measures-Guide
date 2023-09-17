<!-- FOOTER -->
<div class="row py-3 bg-body-tertiary">
	<div class="col-12 col-md-3 text-center">
		<div class="d-flex flex-column">
			<a href="{{ route('home') }}" class="fw-bold text-decoration-none btn btn-outline-dark text-light-emphasis border-0 bg-transparent">Home</a>
		</div>
	</div>
	
	<div class="col-12 col-md-3 text-center">
		COL 2
	</div>

	<div class="col-12 col-md-6">
		<div class="d-flex flex-row">
			<a href="{{ route('home') }}" class="ms-md-auto w-100 w-md-50 w-lg-25" aria-label="Defensive Measures Guide">
				<div class="d-flex flex-column align-items-end">
					<img src="{{ $webLogo }}" alt="Defensive Measures" class="mt-2 mb-0 img img-fluid">
					<img src="{{ asset('/images/ui/Defensive Measures Guide.png') }}" alt="Defensive Measures Guide" class="mt-0 mb-2 img img-fluid">
				</div>
			</a>
		</div>
	</div>
</div>