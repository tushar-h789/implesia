<script lang="ts">
	import { onMount } from 'svelte';
	import { Check, ArrowRight, Loader2 } from 'lucide-svelte';
	import emailjs from '@emailjs/browser';
	import { toast } from 'svelte-sonner';
	import type { ContactFormData, ContactFormErrors } from '$lib/types/contact';

	// EmailJS configuration
	const EMAILJS_SERVICE_ID = 'service_84p2e8c';
	const EMAILJS_TEMPLATE_ID = 'template_t0pzd4i';
	const EMAILJS_PUBLIC_KEY = '_0R3oIgW1dmKY_H1M';

	// Form state
	let formData = $state<ContactFormData>({
		name: '',
		phone: '',
		email: '',
		companyName: '',
		dueDate: '',
		message: '',
		acceptedTerms: false
	});

	// UI state
	let isSubmitting = $state(false);
	let formErrors = $state<ContactFormErrors>({});

	/**
	 * Initialize EmailJS with public key
	 */
	onMount(() => {
		emailjs.init(EMAILJS_PUBLIC_KEY);
	});

	/**
	 * Validates email format
	 */
	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email.trim());
	}

	/**
	 * Validates phone number format
	 */
	function isValidPhone(phone: string): boolean {
		const cleaned = phone.replace(/[^\d+]/g, '');
		return cleaned.replace('+', '').length >= 10;
	}

	/**
	 * Validates the contact form data
	 */
	function validateForm(): ContactFormErrors {
		const errors: ContactFormErrors = {};

		// Validate name
		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		} else if (formData.name.trim().length < 2) {
			errors.name = 'Name must be at least 2 characters';
		}

		// Validate phone
		if (!formData.phone.trim()) {
			errors.phone = 'Phone number is required';
		} else if (!isValidPhone(formData.phone)) {
			errors.phone = 'Please enter a valid phone number';
		}

		// Validate email
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!isValidEmail(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}

		// Validate message
		if (!formData.message.trim()) {
			errors.message = 'Message is required';
		} else if (formData.message.trim().length < 10) {
			errors.message = 'Message must be at least 10 characters';
		}

		// Validate terms acceptance
		if (!formData.acceptedTerms) {
			errors.acceptedTerms = 'You must accept the terms and privacy policy';
		}

		return errors;
	}

	/**
	 * Resets the form to its initial state
	 */
	function resetForm() {
		formData = {
			name: '',
			phone: '',
			email: '',
			companyName: '',
			dueDate: '',
			message: '',
			acceptedTerms: false
		};
		formErrors = {};
	}

	/**
	 * Clears error for a specific field when user starts typing
	 */
	function clearFieldError(fieldName: keyof ContactFormData) {
		if (formErrors[fieldName]) {
			formErrors = { ...formErrors, [fieldName]: undefined };
		}
	}

	/**
	 * Handles form submission with EmailJS
	 */
	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Reset previous errors
		formErrors = {};

		// Validate form
		const validationErrors = validateForm();
		if (Object.keys(validationErrors).length > 0) {
			formErrors = validationErrors;
			toast.error('Please fix the errors in the form', {
				description: 'Check all required fields and try again.'
			});
			return;
		}

		isSubmitting = true;

		// Show loading toast
		const loadingToast = toast.loading('Sending your message...');

		try {
			// Prepare template parameters for EmailJS
			const templateParams = {
				from_name: formData.name,
				from_email: formData.email,
				phone: formData.phone,
				company_name: formData.companyName || 'Not provided',
				due_date: formData.dueDate
					? new Date(formData.dueDate).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})
					: 'Not specified',
				message: formData.message
			};

			// Send email using EmailJS
			const response = await emailjs.send(
				EMAILJS_SERVICE_ID,
				EMAILJS_TEMPLATE_ID,
				templateParams
			);

			if (response.status === 200) {
				// Dismiss loading toast
				toast.dismiss(loadingToast);

				// Show success toast
				toast.success('Message sent successfully!', {
					description: 'Thank you for contacting us! We will get back to you soon.',
					duration: 5000
				});

				// Reset form
				resetForm();
			} else {
				// Dismiss loading toast
				toast.dismiss(loadingToast);

				// Show error toast
				toast.error('Failed to send message', {
					description: 'Please try again later or contact us directly.',
					duration: 5000
				});
			}
		} catch (error) {
			// Dismiss loading toast
			toast.dismiss(loadingToast);

			// Handle EmailJS errors
			console.error('EmailJS error:', error);
			toast.error('Something went wrong', {
				description: 'Please try again or contact us directly.',
				duration: 5000
			});
		} finally {
			isSubmitting = false;
		}
	}
</script>

<section class="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#e4e4e2] overflow-visible">
	<div class="container mx-auto max-w-7xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
			<!-- Left Section: Contact Form -->
			<div class="w-full order-2 lg:order-1">
				<form onsubmit={handleSubmit} class="space-y-6" novalidate>
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
								oninput={() => clearFieldError('name')}
								required
								class="w-full px-4 py-3 bg-white border-2 {formErrors.name
									? 'border-red-400'
									: 'border-[#0BC1C0]/30'} rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Your name"
								aria-invalid={formErrors.name ? 'true' : 'false'}
								aria-describedby={formErrors.name ? 'name-error' : undefined}
							/>
							{#if formErrors.name}
								<p id="name-error" class="mt-1 text-sm text-red-600" role="alert">
									{formErrors.name}
								</p>
							{/if}
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
								oninput={() => clearFieldError('phone')}
								required
								class="w-full px-4 py-3 bg-white border-2 {formErrors.phone
									? 'border-red-400'
									: 'border-[#0BC1C0]/30'} rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Your phone"
								aria-invalid={formErrors.phone ? 'true' : 'false'}
								aria-describedby={formErrors.phone ? 'phone-error' : undefined}
							/>
							{#if formErrors.phone}
								<p id="phone-error" class="mt-1 text-sm text-red-600" role="alert">
									{formErrors.phone}
								</p>
							{/if}
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
								oninput={() => clearFieldError('email')}
								required
								class="w-full px-4 py-3 bg-white border-2 {formErrors.email
									? 'border-red-400'
									: 'border-[#0BC1C0]/30'} rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Your email"
								aria-invalid={formErrors.email ? 'true' : 'false'}
								aria-describedby={formErrors.email ? 'email-error' : undefined}
							/>
							{#if formErrors.email}
								<p id="email-error" class="mt-1 text-sm text-red-600" role="alert">
									{formErrors.email}
								</p>
							{/if}
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
								oninput={() => clearFieldError('companyName')}
								class="w-full px-4 py-3 bg-white border-2 {formErrors.companyName
									? 'border-red-400'
									: 'border-[#0BC1C0]/30'} rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900"
								placeholder="Company name"
								aria-invalid={formErrors.companyName ? 'true' : 'false'}
								aria-describedby={formErrors.companyName ? 'company-error' : undefined}
							/>
							{#if formErrors.companyName}
								<p id="company-error" class="mt-1 text-sm text-red-600" role="alert">
									{formErrors.companyName}
								</p>
							{/if}
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
							oninput={() => clearFieldError('message')}
							required
							rows="6"
							class="w-full px-4 py-3 bg-white border-2 {formErrors.message
								? 'border-red-400'
								: 'border-[#0BC1C0]/30'} rounded-lg focus:outline-none focus:border-[#0BC1C0] transition-colors duration-300 text-gray-900 resize-y"
							placeholder="Your message"
							aria-invalid={formErrors.message ? 'true' : 'false'}
							aria-describedby={formErrors.message ? 'message-error' : undefined}
						></textarea>
						{#if formErrors.message}
							<p id="message-error" class="mt-1 text-sm text-red-600" role="alert">
								{formErrors.message}
							</p>
						{/if}
					</div>

					<!-- Terms and Privacy Checkbox -->
					<div class="flex items-start gap-3">
						<input
							id="terms"
							type="checkbox"
							bind:checked={formData.acceptedTerms}
							onchange={() => clearFieldError('acceptedTerms')}
							required
							class="mt-1 w-5 h-5 border-2 {formErrors.acceptedTerms
								? 'border-red-400'
								: 'border-[#0BC1C0]/30'} rounded focus:ring-2 focus:ring-[#0BC1C0] text-[#0BC1C0] cursor-pointer"
							aria-invalid={formErrors.acceptedTerms ? 'true' : 'false'}
							aria-describedby={formErrors.acceptedTerms ? 'terms-error' : undefined}
						/>
						<label
							for="terms"
							class="text-sm text-gray-700 cursor-pointer flex-1"
						>
							I HAVE READ AND ACCEPTED TERMS AND PRIVACY
						</label>
					</div>
					{#if formErrors.acceptedTerms}
						<p id="terms-error" class="mt-1 text-sm text-red-600" role="alert">
							{formErrors.acceptedTerms}
						</p>
					{/if}

					<!-- Submit Button -->
					<button
						type="submit"
						disabled={isSubmitting}
						class="w-full bg-[#089a99] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#078888] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
					>
						{#if isSubmitting}
							<Loader2 class="w-5 h-5 animate-spin" />
							<span>Sending...</span>
						{:else}
							<span>Submit Form</span>
							<ArrowRight class="w-5 h-5" />
						{/if}
					</button>
				</form>
			</div>

			<!-- Right Section: Promotional Content -->
			<div class="flex flex-col justify-center space-y-6 sm:space-y-8 order-1 lg:order-2 mb-8 lg:mb-0">
				<!-- "CONTACT US" Label -->
				<div class="inline-block">
					<span
						class="inline-block px-4 py-2 bg-[#0d6b6b] text-white text-xs sm:text-sm font-bold rounded-full uppercase tracking-wide"
					>
						CONTACT US
					</span>
				</div>

				<!-- Main Headline -->
				<div class="space-y-2">
					<h2
						class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#089a99] leading-tight"
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
							class="shrink-0 w-6 h-6 rounded-full bg-[#089a99]/20 flex items-center justify-center mt-0.5"
						>
							<Check class="w-4 h-4 text-[#089a99]" stroke-width="3" />
						</div>
						<p class="text-gray-700 font-medium text-base sm:text-lg">
							Free Strategy Session
						</p>
					</div>

					<div class="flex items-start gap-3">
						<div
							class="shrink-0 w-6 h-6 rounded-full bg-[#089a99]/20 flex items-center justify-center mt-0.5"
						>
							<Check class="w-4 h-4 text-[#089a99]" stroke-width="3" />
						</div>
						<p class="text-gray-700 font-medium text-base sm:text-lg">
							Quick & Friendly Communication
						</p>
					</div>

					<div class="flex items-start gap-3">
						<div
							class="shrink-0 w-6 h-6 rounded-full bg-[#089a99]/20 flex items-center justify-center mt-0.5"
						>
							<Check class="w-4 h-4 text-[#089a99]" stroke-width="3" />
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
		accent-color: #089a99;
		cursor: pointer;
	}

	/* Form input focus styles */
	input:focus,
	textarea:focus {
		box-shadow: 0 0 0 3px rgba(8, 154, 153, 0.1);
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
