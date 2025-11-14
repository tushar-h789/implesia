<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	// Section visibility state
	let sectionElement: HTMLElement;
	let isInView = $state(false);
	let hasAnimated = $state(false);
	
	// Cursor color (matching CustomCursor component)
	const cursorColor = '#0BC1C0'; // rgba(11, 193, 192)
	const cursorColorRgb = '11, 193, 192';
	
	// Hover state for each card
	let hoveredCardIndex = $state<number | null>(null);

	// Statistics data matching the image design
	const statistics = [
		// {
		// 	id: '001',
		// 	label: 'Total Awards',
		// 	value: '16'
		// },
		{
			id: '002',
			label: 'Years of Services',
			value: '3+'
		},
		{
			id: '003',
			label: 'Location',
			value: '2'
		},
		{
			id: '004',
			label: 'Team Members',
			value: '30+'
		},
		{
			id: '005',
			label: 'Happy Clients',
			value: '100+'
		}
	];

	// Calculate card positions for animation
	// Cards start centered (stacked), then spread out horizontally
	function getCardOffset(index: number, total: number, isAnimated: boolean): number {
		if (!isAnimated) {
			// All cards centered (stacked at position 0)
			return 0;
		}

		// Calculate spacing: cards spread evenly with gaps
		// Using rem units for better responsiveness
		const cardWidthRem = 15; // ~240px at base font size
		const gapRem = 2; // ~32px gap
		const totalWidthRem = total * cardWidthRem + (total - 1) * gapRem;
		const startOffsetRem = -totalWidthRem / 2 + cardWidthRem / 2;

		// Position each card
		return startOffsetRem + index * (cardWidthRem + gapRem);
	}

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
</script>

<section
	bind:this={sectionElement}
	class="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#E8EDF0] py-20 px-4 sm:px-6 lg:px-8"
>
	<!-- Background Text: "We Are Implesian" -->
	<div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
		<!-- Top Text: "We are" -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center">
			<h2
				class="text-[clamp(5rem,18vw,14rem)] font-extrabold text-white/30 leading-none tracking-tight whitespace-nowrap"
				style="transform: translateY(-15%);"
			>
				We are
			</h2>
		</div>

		<!-- Bottom Text: "Implesian" -->
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center">
			<h2
				class="text-[clamp(5rem,18vw,14rem)] font-extrabold text-white/30 leading-none tracking-tight whitespace-nowrap"
				style="transform: translateY(15%);"
			>
				Implesian
			</h2>
		</div>
	</div>

	<!-- Holographic Blob Element - Positioned behind middle cards -->
	<div
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] sm:w-[700px] sm:h-[450px] lg:w-[900px] lg:h-[550px] z-10 pointer-events-none"
		class:animate-blob={isInView}
	>
		<div
			class="absolute inset-0 rounded-full blur-3xl opacity-50"
			style="background: linear-gradient(135deg, rgba(147, 197, 253, 0.5) 0%, rgba(196, 181, 253, 0.5) 25%, rgba(251, 207, 232, 0.5) 50%, rgba(254, 240, 138, 0.5) 75%, rgba(165, 243, 252, 0.5) 100%); filter: blur(100px);"
		></div>
	</div>

	<!-- Cards Container -->
	<div class="relative z-20 w-full max-w-7xl mx-auto">
		<div class="relative flex items-center justify-center min-h-[400px]">
			{#each statistics as stat, index (stat.id)}
				<div
					class="stat-card absolute rounded-lg shadow-lg p-6 sm:p-8 w-[220px] sm:w-[240px] transition-all duration-1000 ease-out"
					class:card-hovered={hoveredCardIndex === index}
					role="article"
					aria-label="{stat.label}: {stat.value}"
					style="--card-offset: {getCardOffset(index, statistics.length, hasAnimated)}rem; transform: translateX(var(--card-offset)) translateY(0); transition-delay: {index * 80}ms; opacity: {hasAnimated ? 1 : index === 0 ? 1 : 0.3}; z-index: {hasAnimated ? index : statistics.length - index}; --cursor-color: {cursorColor}; --cursor-color-rgb: {cursorColorRgb};"
					onmouseenter={() => hoveredCardIndex = index}
					onmouseleave={() => hoveredCardIndex = null}
				>
					<!-- Card Header -->
					<div class="mb-4 pb-4 border-b transition-colors duration-500" class:border-cursor={hoveredCardIndex === index}>
						<div class="flex items-center justify-between">
							<span class="text-xs sm:text-sm font-medium transition-colors duration-500" class:text-cursor={hoveredCardIndex === index} class:text-gray-500={hoveredCardIndex !== index}>
								{stat.id}
							</span>
						</div>
						<h3 class="text-sm sm:text-base font-medium mt-2 transition-colors duration-500" class:text-cursor={hoveredCardIndex === index} class:text-gray-600={hoveredCardIndex !== index}>
							{stat.label}
						</h3>
					</div>

					<!-- Card Value -->
					<div class="mt-4">
						<p
							class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-none transition-colors duration-500" class:text-cursor={hoveredCardIndex === index} class:text-gray-900={hoveredCardIndex !== index}
						>
							{stat.value}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Holographic blob animation */
	@keyframes blob {
		0%,
		100% {
			transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg);
		}
		33% {
			transform: translate(-50%, -50%) translate(30px, -40px) scale(1.08) rotate(5deg);
		}
		66% {
			transform: translate(-50%, -50%) translate(-30px, 30px) scale(0.92) rotate(-5deg);
		}
	}

	.animate-blob {
		animation: blob 25s ease-in-out infinite;
	}

	/* Card base styles */
	.stat-card {
		background-color: white;
		transition-property: opacity, transform, background-color, box-shadow, color;
		transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
		transition-duration: 0.5s;
		will-change: transform, opacity, background-color;
	}

	/* Hover effect for cards */
	.stat-card:hover,
	.stat-card.card-hovered {
		transform: translateX(var(--card-offset)) translateY(-10px) scale(1.03);
		box-shadow: 0 25px 50px rgba(var(--cursor-color-rgb), 0.4);
		z-index: 30 !important;
		background-color: var(--cursor-color) !important;
	}

	/* Text color change on hover - all text becomes white */
	.stat-card.card-hovered span,
	.stat-card.card-hovered h3,
	.stat-card.card-hovered p,
	.stat-card.card-hovered * {
		color: white !important;
		transition: color 0.5s ease;
	}

	/* Border color change on hover - make it white/light */
	.stat-card.card-hovered .border-cursor,
	.stat-card.card-hovered div[class*="border-b"] {
		border-color: rgba(255, 255, 255, 0.4) !important;
		transition: border-color 0.5s ease;
	}

	/* Responsive adjustments */
	@media (max-width: 1024px) {
		.stat-card {
			width: 200px !important;
		}
	}

	@media (max-width: 768px) {
		.stat-card {
			width: 180px !important;
			padding: 1rem !important;
		}
	}

	@media (max-width: 640px) {
		/* Stack cards vertically on mobile */
		.stat-card {
			position: relative !important;
			width: 100% !important;
			max-width: 300px;
			transform: translateX(0) translateY(0) !important;
			margin-bottom: 1rem;
		}
	}

	/* Ensure proper z-index layering */
	section {
		position: relative;
	}

	/* Smooth text rendering */
	.stat-card {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
