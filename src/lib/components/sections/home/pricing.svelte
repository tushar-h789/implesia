<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Check, ArrowRight } from 'lucide-svelte';

	// Feature interface
	interface Feature {
		title: string;
		description: string;
	}

	// Pricing plan interface
	interface PricingPlan {
		id: string;
		name: string;
		price: string;
		period: string;
		features: Feature[];
		isRecommended?: boolean;
		buttonText: string;
	}

	// Section visibility state
	let sectionElement: HTMLElement;
	let isInView = $state(false);
	let hasAnimated = $state(false);

	// Intersection Observer for scroll detection
	let intersectionObserver: IntersectionObserver | null = null;

	onMount(() => {
		if (!browser || !sectionElement) return;

		// Create Intersection Observer with threshold
		intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isInView = true;
						// Reset animation state first, then trigger animation
						hasAnimated = false;
						// Small delay to ensure smooth animation reset and replay
						setTimeout(() => {
							hasAnimated = true;
						}, 100);
					} else {
						// Reset when leaving view so animation can trigger again next time
						isInView = false;
						hasAnimated = false;
					}
				});
			},
			{
				threshold: 0.2, // Trigger when 20% of section is visible
				rootMargin: '0px'
			}
		);

		intersectionObserver.observe(sectionElement);
	});

	onDestroy(() => {
		if (intersectionObserver) {
			intersectionObserver.disconnect();
		}
	});

	// Pricing plans data (JSON structure)
	const pricingPlans: PricingPlan[] = [
		{
			id: '1',
			name: 'ESSENTIAL PLAN',
			price: '$99',
			period: '/MONTH',
			features: [
				{
					title: 'WEBSITE MAINTENANCE',
					description: 'Keep site updated & secure'
				},
				{
					title: 'BASIC CONTENT UPDATES',
					description: 'Up to 2 content per month'
				},
				{
					title: 'PERFORMANCE MONITORING',
					description: 'Regular checks for web speed'
				},
				{
					title: 'EMAIL SUPPORT',
					description: 'Get responses within 2 days'
				}
			],
			buttonText: 'Choose Plan'
		},
		{
			id: '2',
			name: 'BUSINESS PLAN',
			price: '$249',
			period: '/MONTH',
			features: [
				{
					title: 'DESIGN & DEVELOPMENT SUPPORT',
					description: 'Up to 5 tasks or updates per month'
				},
				{
					title: 'CONTENT MANAGEMENT',
					description: 'Upload blogs, pages, and visuals'
				},
				{
					title: 'SEO OPTIMIZATION',
					description: 'SEO tweaks and keyword integration'
				},
				{
					title: 'REPORT & SUGGESTIONS',
					description: 'Performance, suggestions for growth'
				}
			],
			isRecommended: true,
			buttonText: 'Choose Plan'
		},
		{
			id: '3',
			name: 'PREMIUM PLAN',
			price: '$499',
			period: '/MONTH',
			features: [
				{
					title: 'WEBSITE MANAGEMENT',
					description: 'Updates, security & optimizations'
				},
				{
					title: 'SEO & ANALYTICS',
					description: 'Keyword research and insight'
				},
				{
					title: 'PROJECT MANAGER',
					description: 'Contact for seamless communication'
				},
				{
					title: 'PRIORITY SUPPORT',
					description: 'Fastest response for urgent needs'
				}
			],
			buttonText: 'Choose Plan'
		}
	];
</script>

<section
	bind:this={sectionElement}
	class="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#1A4D4E]"
>
	<div class="container mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="text-center mb-16">
			<!-- Small Label: "PRICING" -->
			<div class="inline-block mb-6">
				<span
					class="inline-block px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border-2 border-white rounded-lg tracking-wide"
				>
					PRICING
				</span>
			</div>

			<!-- Main Title -->
			<div class="mb-4">
				<h2
					class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0BC1C0] mb-2 leading-tight tracking-tight"
				>
					TRANSPARENT PRICING
				</h2>
				<h2
					class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
				>
					REAL RESULTS
				</h2>
			</div>

			<!-- Description -->
			<p
				class="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed px-4"
			>
				No hidden fees, no surprises — just clear, straightforward pricing designed to match
				your goals and deliver measurable results for your business.
			</p>
		</div>

		<!-- Pricing Cards Grid -->
		<div
			class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
		>
			{#each pricingPlans as plan, index (plan.id)}
				<!-- Pricing Card -->
				<div
					class="pricing-card relative rounded-xl shadow-lg overflow-hidden {plan.isRecommended
						? 'bg-[#0BC1C0]'
						: 'bg-white'} {hasAnimated
						? 'card-visible'
						: 'card-hidden'}"
					style="transition-delay: {index * 150}ms;"
				>
					<!-- Recommended Badge -->
					{#if plan.isRecommended}
						<div
							class="absolute top-4 left-4 bg-white text-[#0BC1C0] px-3 py-1 rounded-md text-xs font-bold tracking-wide"
						>
							RECOMMENDED
						</div>
					{/if}

					<!-- Card Content -->
					<div class="p-6 sm:p-8">
						<!-- Plan Name -->
						<h3
							class="text-xl sm:text-2xl font-bold mb-4 {plan.isRecommended
								? 'text-white'
								: 'text-gray-900'}"
						>
							{plan.name}
						</h3>

						<!-- Price -->
						<div class="mb-6">
							<div class="flex items-baseline gap-2">
								<span
									class="text-5xl sm:text-6xl lg:text-7xl font-bold {plan.isRecommended
										? 'text-white'
										: 'text-gray-900'}"
								>
									{plan.price}
								</span>
								<span
									class="text-base sm:text-lg {plan.isRecommended
										? 'text-white/90'
										: 'text-gray-600'}"
								>
									{plan.period}
								</span>
							</div>
						</div>

						<!-- Separator Line -->
						<div
							class="h-px w-full mb-6 {plan.isRecommended
								? 'bg-white/30'
								: 'bg-gray-200'}"
						></div>

						<!-- Features Section -->
						<div class="mb-8">
							<h4
								class="text-sm font-semibold mb-4 uppercase tracking-wide {plan.isRecommended
									? 'text-white/90'
									: 'text-gray-700'}"
							>
								WHAT INCLUDED?
							</h4>

							<ul class="space-y-4">
								{#each plan.features as feature (feature.title)}
									<li class="flex items-start gap-3">
										<!-- Checkmark Icon -->
										<div
											class="shrink-0 mt-1 {plan.isRecommended
												? 'text-white'
												: 'text-gray-700'}"
										>
											<Check class="w-5 h-5" stroke-width="2.5" />
										</div>

										<!-- Feature Content -->
										<div class="flex-1">
											<p
												class="font-semibold text-sm sm:text-base mb-1 {plan.isRecommended
													? 'text-white'
													: 'text-gray-900'}"
											>
												{feature.title}
											</p>
											<p
												class="text-xs sm:text-sm {plan.isRecommended
													? 'text-white/80'
													: 'text-gray-600'}"
											>
												{feature.description}
											</p>
										</div>
									</li>
								{/each}
							</ul>
						</div>

						<!-- CTA Button -->
						<button
							class="w-full py-3.5 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 {plan.isRecommended
								? 'bg-[#198888] hover:bg-[#156d6d]'
								: 'bg-[#0BC1C0] hover:bg-[#0a9a99]'}"
						>
							{plan.buttonText}
							<ArrowRight class="w-5 h-5" />
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Initial state: Cards hidden */
	.pricing-card.card-hidden {
		opacity: 0;
		transform: translateY(50px) scale(0.95);
	}

	/* Animated state: Cards visible */
	.pricing-card.card-visible {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	/* Smooth transitions for pricing cards */
	.pricing-card {
		transition-property: transform, box-shadow, opacity;
		transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
		transition-duration: 0.8s;
		will-change: transform, opacity;
	}

	/* Hover effect - only when visible */
	.pricing-card.card-visible:hover {
		transform: translateY(-8px) scale(1.02);
		box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
	}

	/* Ensure proper spacing and alignment */
	.pricing-card button {
		transition-property: transform, box-shadow, background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.pricing-card {
			max-width: 400px;
			margin: 0 auto;
		}
	}
</style>
