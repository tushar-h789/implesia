<script lang="ts">
	import { Check, ArrowRight } from 'lucide-svelte';

	// Form state
	let formData = $state({
		name: '',
		phone: '',
		email: '',
		companyName: '',
		dueDate: '',
		message: '',
		acceptedTerms: false
	});

	// Form submission handler
	function handleSubmit(event: Event) {
		event.preventDefault();
		// Handle form submission here
		console.log('Form submitted:', formData);
		// You can add API call or form handling logic here
	}
</script>

<section class="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#e4e4e2] overflow-visible">
	<div class="container mx-auto max-w-7xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
			<!-- Left Section: Contact Form -->
			<div class="w-full order-2 lg:order-1">
				<form onsubmit={handleSubmit} class="space-y-6">
					<!-- First Row: NAME and PHONE -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label
								for="name"
								class="block text-sm font-semibold text-gray-900 mb-2"
							>
								NAME
							</label>
							<input
								id="name"
								type="text"
								bind:value={formData.name}
								required
								class="w-full px-4 py-3 bg-white border-2 border-[#0BC1C0]/30 rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Your name"
							/>
						</div>
						<div>
							<label
								for="phone"
								class="block text-sm font-semibold text-gray-900 mb-2"
							>
								PHONE
							</label>
							<input
								id="phone"
								type="tel"
								bind:value={formData.phone}
								required
								class="w-full px-4 py-3 bg-white border-2 border-[#0BC1C0]/30 rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Your phone"
							/>
						</div>
					</div>

					<!-- Second Row: EMAIL and COMPANY NAME -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label
								for="email"
								class="block text-sm font-semibold text-gray-900 mb-2"
							>
								EMAIL
							</label>
							<input
								id="email"
								type="email"
								bind:value={formData.email}
								required
								class="w-full px-4 py-3 bg-white border-2 border-[#0BC1C0]/30 rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Your email"
							/>
						</div>
						<div>
							<label
								for="company"
								class="block text-sm font-semibold text-gray-900 mb-2"
							>
								COMPANY NAME
							</label>
							<input
								id="company"
								type="text"
								bind:value={formData.companyName}
								class="w-full px-4 py-3 bg-white border-2 border-[#0BC1C0]/30 rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Company name"
							/>
						</div>
					</div>

					<!-- Third Row: DUE DATE -->
					<div>
						<label
							for="dueDate"
							class="block text-sm font-semibold text-gray-900 mb-2"
						>
							DUE DATE
						</label>
						<input
							id="dueDate"
							type="date"
							bind:value={formData.dueDate}
							class="w-full px-4 py-3 bg-white border-2 border-[#0BC1C0]/30 rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
						/>
					</div>

					<!-- Fourth Row: MESSAGE -->
					<div>
						<label
							for="message"
							class="block text-sm font-semibold text-gray-900 mb-2"
						>
							MESSAGE
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							required
							rows="6"
							class="w-full px-4 py-3 bg-white border-2 border-[#0BC1C0]/30 rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900 resize-y"
							placeholder="Your message"
						></textarea>
					</div>

					<!-- Terms and Privacy Checkbox -->
					<div class="flex items-start gap-3">
						<input
							id="terms"
							type="checkbox"
							bind:checked={formData.acceptedTerms}
							required
							class="mt-1 w-5 h-5 border-2 border-[#0BC1C0]/30 rounded focus:ring-2 focus:ring-[#0BC1C0] text-[#0BC1C0] cursor-pointer"
						/>
						<label
							for="terms"
							class="text-sm text-gray-700 cursor-pointer flex-1"
						>
							I HAVE READ AND ACCEPTED TERMS AND PRIVACY
						</label>
					</div>

					<!-- Submit Button -->
					<button
						type="submit"
						class="w-full bg-[#0BC1C0] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#0a9a99] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
					>
						Submit Form
						<ArrowRight class="w-5 h-5" />
					</button>
				</form>
			</div>

			<!-- Right Section: Promotional Content -->
			<div class="flex flex-col justify-center space-y-6 sm:space-y-8 order-1 lg:order-2 mb-8 lg:mb-0">
				<!-- "CONTACT US" Label -->
				<div class="inline-block">
					<span
						class="inline-block px-4 py-2 bg-[#198888] text-white text-xs sm:text-sm font-bold rounded-full uppercase tracking-wide"
					>
						CONTACT US
					</span>
				</div>

				<!-- Main Headline -->
				<div class="space-y-2">
					<h2
						class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0BC1C0] leading-tight"
					>
						LET'S BUILD YOUR
					</h2>
					<h2
						class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
					>
						NEXT BIG MOVE TOGETHER
					</h2>
				</div>

				<!-- Descriptive Paragraph -->
				<p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
					Got a challenge or an idea? We're here to listen and craft solutions that
					actually work — no fluff, just results.
				</p>

				<!-- Key Benefits/Features -->
				<div class="space-y-4 pt-4">
					<div class="flex items-start gap-3">
						<div
							class="shrink-0 w-6 h-6 rounded-full bg-[#0BC1C0]/20 flex items-center justify-center mt-0.5"
						>
							<Check class="w-4 h-4 text-[#0BC1C0]" stroke-width="3" />
						</div>
						<p class="text-gray-700 font-medium text-base sm:text-lg">
							Free Strategy Session
						</p>
					</div>

					<div class="flex items-start gap-3">
						<div
							class="shrink-0 w-6 h-6 rounded-full bg-[#0BC1C0]/20 flex items-center justify-center mt-0.5"
						>
							<Check class="w-4 h-4 text-[#0BC1C0]" stroke-width="3" />
						</div>
						<p class="text-gray-700 font-medium text-base sm:text-lg">
							Quick & Friendly Communication
						</p>
					</div>

					<div class="flex items-start gap-3">
						<div
							class="shrink-0 w-6 h-6 rounded-full bg-[#0BC1C0]/20 flex items-center justify-center mt-0.5"
						>
							<Check class="w-4 h-4 text-[#0BC1C0]" stroke-width="3" />
						</div>
						<p class="text-gray-700 font-medium text-base sm:text-lg">
							Always Ready to Assist
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Custom checkbox styling */
	input[type='checkbox'] {
		accent-color: #0BC1C0;
		cursor: pointer;
	}

	/* Form input focus styles */
	input:focus,
	textarea:focus {
		box-shadow: 0 0 0 3px rgba(11, 193, 192, 0.1);
	}

	/* Smooth transitions */
	button,
	input,
	textarea {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Ensure section is visible on mobile */
	section {
		display: block !important;
		visibility: visible !important;
		opacity: 1 !important;
		min-height: auto;
		position: relative;
		z-index: 1;
	}

	/* Mobile-specific adjustments */
	@media (max-width: 640px) {
		section {
			padding-top: 2rem;
			padding-bottom: 2rem;
		}

		/* Ensure form inputs are properly sized on mobile */
		input,
		textarea {
			font-size: 16px; /* Prevents zoom on iOS */
			min-height: 44px; /* Better touch target */
		}

		/* Better spacing on mobile */
		form {
			gap: 1rem;
		}
	}

	/* Ensure proper display on all screen sizes */
	@media (max-width: 1024px) {
		.grid {
			display: grid !important;
		}
	}
</style>
