<footer class="flex flex-col p-4 lg:p-8 dark:bg-secondary/50 light:bg-black js-only" id="mainFooter">
	<div class="row gap-y-8">
		{{-- EXTERNAL LINKS --}}
		<div class="sized-col w-full lg:w-1/6 flex flex-col gap-y-1 custom-gap items-center lg:items-start *:text-center *:lg:text-start">
			<p class="font-black text-xl text-light mb-3 indent-0">Government Links</p>

			<a href="https://www.officialgazette.gov.ph/" class="link" rel="noreferrer nofollow">Official Gazette</a>
			<a href="https://web.senate.gov.ph/" class="link" rel="noreferrer nofollow">Senate of The Philippines</a>
			<a href="https://www.congress.gov.ph/" class="link" rel="noreferrer nofollow">House of Representatives</a>
		</div>

		<div class="sized-col w-full lg:w-1/6 flex flex-col gap-y-1 custom-gap items-center lg:items-start *:text-center *:lg:text-start">
			<p class="font-black text-xl text-light mb-3 indent-0">Transparency</p>

			<a href="https://philgeps.gov.ph/" class="link" rel="noreferrer nofollow">PhilGeps</a>
			<a href="https://dilg.gov.ph/" class="link" rel="noreferrer nofollow">Department of Interior and Local Government (DILG)</a>
			<a href="https://www.coa.gov.ph/" class="link" rel="noreferrer nofollow">Commission On Audit (COA)</a>
		</div>

		<div class="sized-col w-full lg:w-1/6 flex flex-col gap-y-1 custom-gap items-center lg:items-start *:text-center *:lg:text-start">
			<p class="font-black text-xl text-light mb-3 indent-0">Contact Us</p>

			<a href="{{ route("home") }}#address" class="link">Taytay Municipal Hall</a>
			<a href="{{ route("home") }}#emergency-hotlines" class="link">Emergency Hotlines</a>
			<a href="{{ route("home") }}#contact-us" class="link">Contact Us</a>
		</div>

		{{-- NEWSLETTER --}}
		<div class="sized-col w-full lg:w-3/6 flex">
			<div class="ml-auto w-full lg:w-2/3">
				<p class="text-center lg:text-left font-black text-xl text-light indent-0">Subscribe to our Newsletter</p>
				<p class="text-center lg:text-left indent-0">Stay updated with the latest news and announcements from {{ $webName }}</p>

				{{-- TODO: Implement Custom Request --}}
				<form action="@{{ route("api.register-to-newsletter") }}" method="POST" enctype="multipart/form-data" novalidate class="needs-validation" x-data="newsletterForm" @submit="submitNewsletterForm">
					@csrf

					<div class="flex flex-col lg:flex-row gap-4 mt-2 items-center lg:items-start">
						<input type="email" name="newsletter-email" id="newsletterEmail" placeholder="Enter your email" class="form-control !rounded-lg inline-block w-full lg:w-2/3 text-dark text-center lg:text-left placeholder:text-center placeholder:lg:text-left"
							required>
						<button type="submit" class="btn btn-lg !leading-4 btn-outline-accent w-1/3 !h-full">Subscribe</button>
					</div>
				</form>
			</div>
		</div>
	</div>

	<hr class="my-4 lg:my-8">

	<div class="flex flex-col lg:flex-row justify-start items-center gap-4">
		<a href="#" class="link no-line">Privacy Policy</a>
		<a href="#" class="link no-line">Cookie Policy</a>
		<a href="#" class="link no-line">Site Map</a>

		<p class="indent-0 text-center lg:text-left m-0 lg:ms-auto">Copyright &copy; {{ date("Y") }} {{ $webName }}. All rights reserved.</p>
	</div>
</footer>

@push("scripts")
	{{-- @vite(["resources/js/views/templates/footer.js"]) --}}
@endpush
