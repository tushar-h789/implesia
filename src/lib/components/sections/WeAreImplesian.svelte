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

	// Responsive card dimensions based on screen size
	let windowWidth = $state(0);
	
	function updateWindowWidth() {
		if (browser) {
			windowWidth = window.innerWidth;
		}
	}

	// Get card width in rem for current screen size
	function getCardWidthRem(): number {
		if (!browser || windowWidth < 640) {
			return 0;
		} else if (windowWidth < 768) {
			return 10.5;
		} else if (windowWidth < 1024) {
			const availableWidthPx = windowWidth - 48;
			const availableWidthRem = availableWidthPx / 16;
			const gapRem = 0.875;
			const cardWidthRem = (availableWidthRem - 3 * gapRem) / 4;
			return cardWidthRem < 10 ? 10 : cardWidthRem;
		} else {
			return 15;
		}
	}

	// Calculate card positions for animation
	// Cards start centered (stacked), then spread out horizontally
	function getCardOffset(index: number, total: number, isAnimated: boolean): number {
		if (!isAnimated || !browser) {
			// All cards centered (stacked at position 0)
			return 0;
		}

		// Responsive card width and gap based on screen size
		let cardWidthRem: number;
		let gapRem: number;

		if (windowWidth < 640) {
			// Mobile: cards stack vertically, no horizontal offset needed
			return 0;
		} else if (windowWidth < 768) {
			// Small tablets (640-768px)
			cardWidthRem = 10.5; // ~168px
			gapRem = 0.75; // ~12px
		} else if (windowWidth < 1024) {
			// Tablets (768-1024px) - ensure all cards fit
			// At 768px with padding (48px), we have ~720px available
			// 4 cards need to fit: 4 * cardWidth + 3 * gap <= 720px
			// Calculate dynamically to ensure fit
			const availableWidthPx = windowWidth - 48; // Account for padding
			const availableWidthRem = availableWidthPx / 16;
			// Total needed: 4 cards + 3 gaps
			// cardWidth = (availableWidth - 3*gap) / 4
			// Let's use gap = 0.875rem (14px) for better fit
			gapRem = 0.875; // ~14px
			cardWidthRem = (availableWidthRem - 3 * gapRem) / 4;
			// Ensure minimum card width
			if (cardWidthRem < 10) cardWidthRem = 10;
		} else {
			// Desktop
			cardWidthRem = 15; // ~240px
			gapRem = 2; // ~32px
		}

		// Calculate spacing: cards spread evenly with gaps
		const totalWidthRem = total * cardWidthRem + (total - 1) * gapRem;
		const startOffsetRem = -totalWidthRem / 2 + cardWidthRem / 2;

		// Position each card
		return startOffsetRem + index * (cardWidthRem + gapRem);
	}

	// Intersection Observer for scroll detection
	let intersectionObserver: IntersectionObserver | null = null;

	onMount(() => {
		if (!browser || !sectionElement) return;

		// Initialize window width
		updateWindowWidth();
		window.addEventListener('resize', updateWindowWidth);

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
		if (browser) {
			window.removeEventListener('resize', updateWindowWidth);
		}
	});
</script>

<section
	bind:this={sectionElement}
	class="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#E8EDF0] py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
>
	<!-- Background Text: "We Are Implesian" -->
	<div class="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
		<!-- Top Text: "We are" -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center px-2">
			<h2
				class="text-[clamp(3rem,12vw,14rem)] sm:text-[clamp(4rem,15vw,14rem)] md:text-[clamp(5rem,18vw,14rem)] font-extrabold text-white/30 leading-none tracking-tight"
				style="transform: translateY(-15%); word-break: break-word;"
			>
				We are
			</h2>
		</div>

		<!-- Bottom Text: "Implesian" -->
		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center px-2">
			<h2
				class="text-[clamp(3rem,12vw,14rem)] sm:text-[clamp(4rem,15vw,14rem)] md:text-[clamp(5rem,18vw,14rem)] font-extrabold text-white/30 leading-none tracking-tight"
				style="transform: translateY(15%); word-break: break-word;"
			>
				Implesian
			</h2>
		</div>
	</div>

	<!-- Holographic Blob Element - Positioned behind middle cards -->
	<div
		class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] sm:w-[400px] sm:h-[280px] md:w-[500px] md:h-[350px] lg:w-[600px] lg:h-[400px] xl:w-[700px] xl:h-[450px] 2xl:w-[900px] 2xl:h-[550px] z-10 pointer-events-none"
		class:animate-blob={isInView}
	>
		<div
			class="absolute inset-0 rounded-full blur-3xl opacity-40 sm:opacity-50"
			style="background: linear-gradient(135deg, rgba(147, 197, 253, 0.5) 0%, rgba(196, 181, 253, 0.5) 25%, rgba(251, 207, 232, 0.5) 50%, rgba(254, 240, 138, 0.5) 75%, rgba(165, 243, 252, 0.5) 100%); filter: blur(100px);"
		></div>
	</div>

	<!-- Cards Container -->
	<div class="relative z-20 w-full max-w-7xl mx-auto overflow-x-visible">
		<div class="relative flex flex-col sm:flex-row items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] gap-4 sm:gap-0 px-2 sm:px-0">
			{#each statistics as stat, index (stat.id)}
				{@const cardTransform = windowWidth >= 640 ? `translateX(var(--card-offset)) translateY(0)` : 'translateX(0) translateY(0)'}
				{@const cardWidthRem = getCardWidthRem()}
				{@const calculatedCardWidth = windowWidth >= 640 && windowWidth < 1024 ? `${cardWidthRem}rem` : ''}
				<div
					class="stat-card rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-full max-w-[280px] sm:w-[200px] md:w-[220px] lg:w-[240px] transition-all duration-1000 ease-out"
					class:absolute={windowWidth >= 640}
					class:card-hovered={hoveredCardIndex === index}
					role="article"
					aria-label="{stat.label}: {stat.value}"
					style="--card-offset: {getCardOffset(index, statistics.length, hasAnimated)}rem; {calculatedCardWidth ? `width: ${calculatedCardWidth};` : ''} transform: {cardTransform}; transition-delay: {index * 80}ms; opacity: {hasAnimated ? 1 : index === 0 ? 1 : 0.3}; z-index: {hasAnimated ? index : statistics.length - index}; --cursor-color: {cursorColor}; --cursor-color-rgb: {cursorColorRgb};"
					onmouseenter={() => hoveredCardIndex = index}
					onmouseleave={() => hoveredCardIndex = null}
				>
					<!-- Card Header -->
					<div class="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b transition-colors duration-500" class:border-cursor={hoveredCardIndex === index}>
						<div class="flex items-center justify-between">
							<span class="text-xs sm:text-sm font-medium transition-colors duration-500" class:text-cursor={hoveredCardIndex === index} class:text-gray-500={hoveredCardIndex !== index}>
								{stat.id}
							</span>
						</div>
						<h3 class="text-xs sm:text-sm md:text-base font-medium mt-1 sm:mt-2 transition-colors duration-500" class:text-cursor={hoveredCardIndex === index} class:text-gray-600={hoveredCardIndex !== index}>
							{stat.label}
						</h3>
					</div>

					<!-- Card Value -->
					<div class="mt-3 sm:mt-4">
						<p
							class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none transition-colors duration-500" class:text-cursor={hoveredCardIndex === index} class:text-gray-900={hoveredCardIndex !== index}
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

	/* Mobile hover adjustments */
	@media (max-width: 640px) {
		.stat-card:hover,
		.stat-card.card-hovered {
			transform: translateY(-5px) scale(1.02) !important;
			box-shadow: 0 15px 30px rgba(var(--cursor-color-rgb), 0.3);
		}
	}

	/* Tablet hover adjustments */
	@media (min-width: 640px) and (max-width: 1024px) {
		.stat-card:hover,
		.stat-card.card-hovered {
			transform: translateX(var(--card-offset)) translateY(-8px) scale(1.02);
		}
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
	@media (max-width: 1536px) {
		.stat-card {
			max-width: 100%;
		}
	}

	@media (max-width: 1024px) {
		.stat-card {
			/* Width will be calculated dynamically in JS, but set a max */
			max-width: 180px;
			min-width: 160px;
		}
	}

	@media (max-width: 768px) {
		.stat-card {
			max-width: 175px;
			min-width: 160px;
		}
	}

	@media (max-width: 640px) {
		/* Stack cards vertically on mobile */
		.stat-card {
			position: relative !important;
			width: 100% !important;
			max-width: 300px;
			transform: translateX(0) translateY(0) !important;
			margin-bottom: 0;
			opacity: 1 !important;
		}
		
		/* Ensure cards container doesn't use absolute positioning on mobile */
		.stat-card.absolute {
			position: relative !important;
		}
	}

	/* Extra small devices */
	@media (max-width: 375px) {
		.stat-card {
			padding: 0.875rem !important;
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

	/* Prevent horizontal overflow */
	section {
		overflow-x: hidden;
	}

	/* Ensure cards container can show all cards at tablet sizes */
	@media (min-width: 640px) and (max-width: 1024px) {
		/* Cards container should allow overflow for proper positioning */
		section > div:first-child {
			overflow-x: visible;
		}
	}

	/* Improve touch interactions on mobile */
	@media (max-width: 768px) {
		.stat-card {
			touch-action: manipulation;
		}
	}

	/* Adjust blob animation for smaller screens */
	@media (max-width: 640px) {
		@keyframes blob {
			0%,
			100% {
				transform: translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg);
			}
			33% {
				transform: translate(-50%, -50%) translate(15px, -20px) scale(1.05) rotate(3deg);
			}
			66% {
				transform: translate(-50%, -50%) translate(-15px, 15px) scale(0.95) rotate(-3deg);
			}
		}
	}
</style>
