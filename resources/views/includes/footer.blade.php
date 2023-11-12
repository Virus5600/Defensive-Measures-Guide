<!-- FOOTER -->
<div class="container-fluid">
	<div class="row py-3 bg-body-tertiary">
		<div class="col-12 col-md-3 text-center">
			<div class="d-flex flex-column">
				<h5 class="fw-bold mb-3 text-dark-emphasis">Site Pages</h5>
				<a href="{{ route('home') }}" class="small my-1 text-decoration-none link-body-emphasis">Home</a>
				<a href="{{ route('home') }}" class="small my-1 text-decoration-none link-body-emphasis">Downloads</a>
				<a href="{{ route('home') }}" class="small my-1 text-decoration-none link-body-emphasis">Installations</a>
				<a href="{{ route('home') }}" class="small my-1 text-decoration-none link-body-emphasis">Contents</a>
			</div>
		</div>

		<div class="col-12 col-md-3 text-center">
			<div class="d-flex flex-column">
				<h6 class="fw-bold mb-3 text-dark-emphasis">Technical Stuff</h6>
				<a href="{{ route('home') }}" class="small my-1 text-decoration-none link-body-emphasis">Privacy Policy</a>
				<a href="{{ route('home') }}" class="small my-1 text-decoration-none link-body-emphasis">About</a>
			</div>
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
</div>
