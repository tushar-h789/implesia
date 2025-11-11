<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import Button from '$lib/components/ui/Button.svelte';

	// Banner slide data
	const slides = [
		{
			id: 1,
			title: 'Innovate Your Digital Presence',
			subtitle: 'Transform your business with cutting-edge solutions',
			image: '/images/banner-1.jpg',
			ctaText: 'Explore Solutions',
			linear: 'from-blue-600 to-purple-700'
		},
		{
			id: 2,
			title: 'Elevate User Experience',
			subtitle: 'Create seamless digital journeys that captivate your audience',
			image: '/images/banner-2.jpg',
			ctaText: 'Learn More',
			linear: 'from-green-600 to-teal-700'
		},
		{
			id: 3,
			title: 'Scale With Confidence',
			subtitle: 'Robust infrastructure for growing businesses',
			image: '/images/banner-3.jpg',
			ctaText: 'Get Started',
			linear: 'from-orange-600 to-red-700'
		}
	];

	let emblaNode: HTMLDivElement;
	let emblaApi: ReturnType<typeof EmblaCarousel> | null = null;
	let selectedIndex = $state(0);

	onMount(() => {
		if (!emblaNode) return;

		emblaApi = EmblaCarousel(emblaNode, {
			loop: true,
			align: 'center',
			duration: 20
		});

		emblaApi.on('select', () => {
			if (emblaApi) {
				selectedIndex = emblaApi.selectedScrollSnap();
			}
		});

		// Set initial index
		selectedIndex = emblaApi.selectedScrollSnap();
	});

	onDestroy(() => {
		if (emblaApi) {
			emblaApi.destroy();
		}
	});

	function scrollTo(index: number) {
		if (!emblaApi) return;
		emblaApi.scrollTo(index);
	}
</script>

<section class="relative h-screen overflow-hidden bg-gray-900">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 mix-blend-overlay"></div>
		<div
			class="absolute inset-0"
		></div>
	</div>

	<!-- Embla Carousel -->
	<div class="relative h-full">
		<div class="embla h-full overflow-hidden" bind:this={emblaNode}>
			<div class="embla__container flex h-full">
				{#each slides as slide (slide.id)}
					<div class="embla__slide flex-[0_0_100%] min-w-0 relative h-full">
					<!-- Background Image with linear Overlay -->
					<div class="absolute inset-0">
						<div class={`absolute inset-0 bg-linear-to-r ${slide.linear} opacity-80`}></div>
						<!-- Placeholder for actual image -->
						<div class="absolute inset-0 bg-linear-to-br from-gray-800 to-gray-900"></div>
					</div>

					<!-- Content -->
					<div class="relative z-10 flex items-center justify-center h-full px-4">
						<div class="text-center text-white max-w-4xl">
							<div class="mb-6">
								<h1
									class="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up"
								>
									{slide.title}
								</h1>
								<p
									class="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
								>
									{slide.subtitle}
								</p>
							</div>

							<div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<Button variant="primary" size="lg" class="px-8 py-3 text-lg">
									{slide.ctaText}
								</Button>
								<Button
									variant="outline"
									size="lg"
									class="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-gray-900"
								>
									Learn More
								</Button>
							</div>
						</div>
					</div>

					<!-- Decorative Elements -->
					<div class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
					<div class="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
					<div class="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"></div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Navigation Dots -->
		<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
			<div class="flex space-x-3">
				{#each slides as _, index (index)}
					<button
						class={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === selectedIndex
								? 'bg-white scale-125'
								: 'bg-white/50 hover:bg-white/80'
						}`}
						onclick={() => scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					></button>
				{/each}
			</div>
		</div>

		<!-- Scroll Indicator -->
		<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
			<div class="animate-bounce">
				<div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
					<div class="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	:global(.embla) {
		overflow: hidden;
	}

	:global(.embla__container) {
		display: flex;
		height: 100%;
	}

	:global(.embla__slide) {
		flex: 0 0 100%;
		min-width: 0;
		position: relative;
	}

	.embla__slide {
		position: relative;
		transition: opacity 0.5s ease-in-out;
	}

	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out;
	}
</style>
