<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import EmblaCarousel from 'embla-carousel';
	import Button from '$lib/components/ui/Button.svelte';
	import banner1 from '$lib/assets/images/home/banner/banner-1.jpg';
	import banner2 from '$lib/assets/images/home/banner/banner-2.jpg';
	import banner3 from '$lib/assets/images/home/banner/banner-3.jpg';

	// Banner slide data
	const slides = [
		{
			id: 1,
			title: 'Innovate Your Digital Presence',
			subtitle: 'Transform your business with cutting-edge solutions that drive growth and success',
			image: banner1,
			ctaText: 'Explore Solutions',
			linear: 'from-blue-600 via-purple-600 to-indigo-700',
			accentColor: 'blue',
			gradientOverlay: 'linear-gradient(135deg, rgba(59, 130, 246, 0.85) 0%, rgba(147, 51, 234, 0.75) 50%, rgba(79, 70, 229, 0.85) 100%)'
		},
		{
			id: 2,
			title: 'Elevate User Experience',
			subtitle: 'Create seamless digital journeys that captivate your audience and exceed expectations',
			image: banner2,
			ctaText: 'Learn More',
			linear: 'from-emerald-600 via-teal-600 to-cyan-700',
			accentColor: 'green',
			gradientOverlay: 'linear-gradient(135deg, rgba(5, 150, 105, 0.85) 0%, rgba(20, 184, 166, 0.75) 50%, rgba(14, 165, 233, 0.85) 100%)'
		},
		{
			id: 3,
			title: 'Scale With Confidence',
			subtitle: 'Robust infrastructure and innovative solutions for growing businesses worldwide',
			image: banner3,
			ctaText: 'Get Started',
			linear: 'from-orange-600 via-red-600 to-rose-700',
			accentColor: 'orange',
			gradientOverlay: 'linear-gradient(135deg, rgba(234, 88, 12, 0.85) 0%, rgba(220, 38, 38, 0.75) 50%, rgba(225, 29, 72, 0.85) 100%)'
		}
	];

	let emblaNode: HTMLDivElement;
	let emblaApi: ReturnType<typeof EmblaCarousel> | null = null;
	let selectedIndex = $state(0);
	let isAutoPlaying = $state(true);
	let autoPlayInterval: NodeJS.Timeout;
	let isHovered = $state(false);

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
		
		// Auto-play functionality
		autoPlayInterval = setInterval(() => {
			if (isAutoPlaying && emblaApi && !isHovered) {
				emblaApi.scrollNext();
			}
		}, 6000);
	});

	onDestroy(() => {
		if (emblaApi) {
			emblaApi.destroy();
		}
		if (autoPlayInterval) {
			clearInterval(autoPlayInterval);
		}
	});

	function scrollTo(index: number) {
		if (!emblaApi) return;
		emblaApi.scrollTo(index);
	}
	
	function toggleAutoPlay() {
		isAutoPlaying = !isAutoPlaying;
	}
</script>

<section 
	class="relative h-screen min-h-[500px] sm:min-h-[650px] md:min-h-[750px] lg:min-h-[800px] xl:min-h-[850px] 2xl:min-h-[900px] overflow-hidden"
	role="banner"
	onmouseenter={() => isHovered = true}
	onmouseleave={() => isHovered = false}
>
	<!-- Embla Carousel -->
	<div class="relative h-full">
		<div class="embla h-full overflow-hidden" bind:this={emblaNode}>
			<div class="embla__container flex h-full">
				{#each slides as slide (slide.id)}
					<div class="embla__slide flex-[0_0_100%] min-w-0 relative h-full">
						<!-- Background Image with Gradient Overlay -->
						<div class="absolute inset-0 overflow-hidden">
							<img 
								src={slide.image} 
								alt={slide.title}
								class="w-full h-full object-cover object-center transform scale-105 sm:scale-110 transition-all duration-15000 ease-out"
								class:scale-100={selectedIndex === slide.id - 1}
								loading={slide.id === 1 ? "eager" : "lazy"}
								fetchpriority={slide.id === 1 ? "high" : "auto"}
								width="1920"
								height="1080"
								sizes="100vw"
							/>
							<!-- Multi-layer gradient overlay for depth -->
							<div 
								class="absolute inset-0 opacity-90 transition-opacity duration-1000"
								style="background: {slide.gradientOverlay}"
							></div>
							<div class="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60"></div>
							<!-- Animated gradient mesh overlay -->
							<div class="absolute inset-0 opacity-30">
								<div class="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 via-transparent to-transparent animate-gradient-shift"></div>
							</div>
						</div>

						<!-- Enhanced Floating Shapes with responsive sizing -->
						<div class="absolute inset-0 overflow-hidden pointer-events-none">
							<div class="hidden sm:block absolute top-1/4 -left-10 sm:-left-16 md:-left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-white/8 rounded-full blur-2xl sm:blur-3xl animate-float-slow"></div>
							<div class="hidden sm:block absolute bottom-1/4 -right-10 sm:-right-16 md:-right-20 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-2xl sm:blur-[80px] md:blur-[100px] animate-float-medium"></div>
							<div class="hidden sm:block absolute top-1/3 right-1/4 w-16 h-16 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-400/15 rounded-full blur-lg sm:blur-xl md:blur-2xl animate-float-fast"></div>
							<div class="hidden sm:block absolute bottom-1/3 left-1/4 w-20 h-20 sm:w-40 sm:h-40 md:w-56 md:h-56 bg-purple-400/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl animate-float-slow"></div>
							<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-400/8 rounded-full blur-[50px] sm:blur-[60px] md:blur-[80px] animate-pulse-slow"></div>
						</div>

						<!-- Content with enhanced responsive styling -->
						<div class="relative z-10 flex items-center justify-center h-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-12 md:pb-28 lg:py-16 lg:pb-20 xl:py-20">
							<div 
								class="text-center text-white max-w-5xl w-full transform transition-all duration-1000 ease-out" 
								class:translate-y-0={selectedIndex === slide.id - 1}
								class:translate-y-8={selectedIndex !== slide.id - 1}
								class:opacity-100={selectedIndex === slide.id - 1}
								class:opacity-0={selectedIndex !== slide.id - 1}
								class:scale-100={selectedIndex === slide.id - 1}
								class:scale-95={selectedIndex !== slide.id - 1}
							>
								<div class="mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
									<!-- Enhanced Badge with responsive sizing -->
									<div 
										class="inline-flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 lg:px-5 lg:py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 sm:mb-4 md:mb-6 lg:mb-8 shadow-lg shadow-black/20 transform transition-all duration-700 delay-100"
										class:translate-y-0={selectedIndex === slide.id - 1}
										class:translate-y-4={selectedIndex !== slide.id - 1}
										class:opacity-100={selectedIndex === slide.id - 1}
										class:opacity-0={selectedIndex !== slide.id - 1}
									>
										<div class="relative">
											<div class="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-white mr-0.5 sm:mr-1 animate-pulse"></div>
											<div class="absolute inset-0 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-white animate-ping opacity-75"></div>
										</div>
										<span class="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-semibold tracking-wide uppercase">Featured Solution</span>
									</div>
									
									<!-- Enhanced Title with perfect responsive typography -->
									<h1 
										class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-[1.15] sm:leading-[1.1] md:leading-[1.15] lg:leading-[1.1] tracking-tight px-1 sm:px-2 md:px-4 transform transition-all duration-1000 delay-200"
										class:translate-y-0={selectedIndex === slide.id - 1}
										class:translate-y-6={selectedIndex !== slide.id - 1}
									>
										<span class="block bg-linear-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
											{slide.title}
										</span>
									</h1>
									
									<!-- Enhanced Subtitle with responsive sizing -->
									<p 
										class="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-100 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed font-light px-2 sm:px-3 md:px-4 transform transition-all duration-1000 delay-300"
										class:translate-y-0={selectedIndex === slide.id - 1}
										class:translate-y-4={selectedIndex !== slide.id - 1}
									>
										{slide.subtitle}
									</p>
								</div>

								<!-- Enhanced CTA Buttons with responsive sizing -->
								<div 
									class="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 justify-center items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-3 sm:px-4 md:px-0 transform transition-all duration-1000 delay-400"
									class:translate-y-0={selectedIndex === slide.id - 1}
									class:translate-y-4={selectedIndex !== slide.id - 1}
								>
									<Button 
										variant="primary" 
										size="lg" 
										class="group relative w-full sm:w-auto max-w-[280px] sm:max-w-none px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 lg:px-10 lg:py-5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold rounded-lg sm:rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-1.5 hover:scale-105 bg-linear-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30 text-white hover:from-white/30 hover:to-white/20 overflow-hidden"
									>
										<span class="relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2">
											{slide.ctaText}
											<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
											</svg>
										</span>
										<div class="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
									</Button>
									<Button
										variant="outline"
										size="lg"
										class="w-full sm:w-auto max-w-[280px] sm:max-w-none px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 lg:px-10 lg:py-5 text-xs sm:text-sm md:text-base lg:text-lg font-semibold rounded-lg sm:rounded-xl border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
									>
										Learn More
									</Button>
								</div>
								
								<!-- Enhanced Stats with responsive design -->
								<div 
									class="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-lg xl:max-w-2xl mx-auto px-1 sm:px-2 md:px-4 mb-8 md:mb-16 lg:mb-8 transform transition-all duration-1000 delay-500"
									class:translate-y-0={selectedIndex === slide.id - 1}
									class:translate-y-6={selectedIndex !== slide.id - 1}
									class:opacity-100={selectedIndex === slide.id - 1}
									class:opacity-0={selectedIndex !== slide.id - 1}
								>
									<div class="text-center group">
										<div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-0.5 sm:mb-1 md:mb-2 bg-linear-to-b from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
											98%
										</div>
										<div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-gray-300 font-medium uppercase tracking-wider leading-tight">Client Satisfaction</div>
									</div>
									<div class="text-center group">
										<div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-0.5 sm:mb-1 md:mb-2 bg-linear-to-b from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
											24/7
										</div>
										<div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-gray-300 font-medium uppercase tracking-wider leading-tight">Support</div>
									</div>
									<div class="text-center group">
										<div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold mb-0.5 sm:mb-1 md:mb-2 bg-linear-to-b from-white to-gray-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
											5x
										</div>
										<div class="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm text-gray-300 font-medium uppercase tracking-wider leading-tight">Faster Growth</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Enhanced Navigation Dots with responsive sizing -->
		<div class="absolute bottom-8 sm:bottom-12 md:bottom-6 lg:bottom-10 xl:bottom-12 2xl:bottom-16 left-1/2 transform -translate-x-1/2 z-20">
			<div class="flex space-x-1.5 sm:space-x-2 md:space-x-3 items-center bg-black/30 backdrop-blur-md rounded-full px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 lg:px-5 lg:py-3 border border-white/10 shadow-2xl">
				{#each slides as _, index (index)}
					<button
						class={`relative w-6 sm:w-8 md:w-10 h-1 sm:h-1 md:h-1.5 lg:w-14 lg:h-1.5 rounded-full transition-all duration-500 overflow-hidden group min-w-[24px] sm:min-w-[32px] ${
							index === selectedIndex
								? 'bg-white shadow-lg shadow-white/50'
								: 'bg-white/30 hover:bg-white/50 active:bg-white/60'
						}`}
						onclick={() => scrollTo(index)}
						aria-label={`Go to slide ${index + 1}`}
					>
						{#if index === selectedIndex}
							<div class="absolute top-0 left-0 h-full bg-linear-to-r from-white to-gray-200 rounded-full animate-progress shadow-inner"></div>
						{/if}
						<div class="absolute inset-0 bg-white/0 group-hover:bg-white/20 group-active:bg-white/30 transition-colors duration-300 rounded-full"></div>
					</button>
				{/each}
				
				<!-- Enhanced Auto-play toggle with responsive sizing -->
				<button
					class="ml-1.5 sm:ml-2 md:ml-3 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 transition-all duration-300 group backdrop-blur-sm min-w-[24px] sm:min-w-[28px]"
					onclick={toggleAutoPlay}
					aria-label={isAutoPlaying ? 'Pause auto-play' : 'Play auto-play'}
				>
					{#if isAutoPlaying}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 text-white group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4 text-white group-hover:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
						</svg>
					{/if}
				</button>
			</div>
		</div>

		<!-- Enhanced Scroll Indicator with responsive visibility -->
		<!-- <div class="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block">
			<div class="animate-bounce-slow">
				<div class="w-5 h-8 sm:w-6 sm:h-10 md:w-7 md:h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-md bg-black/20 shadow-lg">
					<div class="w-1 h-3 sm:w-1.5 sm:h-4 bg-linear-to-b from-white to-white/50 rounded-full mt-1.5 sm:mt-2 md:mt-2.5 animate-pulse"></div>
				</div>
			</div>
		</div> -->
		
		<!-- Enhanced Previous/Next Buttons with responsive sizing -->
		<button
			class="absolute left-1 sm:left-2 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 backdrop-blur-md flex items-center justify-center transition-all duration-300 group border border-white/10 shadow-2xl hover:shadow-white/20 hover:scale-110 active:scale-105 min-w-[36px] sm:min-w-[40px]"
			onclick={() => emblaApi?.scrollPrev()}
			aria-label="Previous slide"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white group-hover:scale-125 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
		
		<button
			class="absolute right-1 sm:right-2 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-black/40 hover:bg-black/60 active:bg-black/70 backdrop-blur-md flex items-center justify-center transition-all duration-300 group border border-white/10 shadow-2xl hover:shadow-white/20 hover:scale-110 active:scale-105 min-w-[36px] sm:min-w-[40px]"
			onclick={() => emblaApi?.scrollNext()}
			aria-label="Next slide"
		>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white group-hover:scale-125 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
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

	@keyframes float-slow {
		0%, 100% {
			transform: translateY(0) translateX(0) scale(1);
		}
		33% {
			transform: translateY(-30px) translateX(15px) scale(1.05);
		}
		66% {
			transform: translateY(-20px) translateX(-10px) scale(0.95);
		}
	}

	@keyframes float-medium {
		0%, 100% {
			transform: translateY(0) translateX(0) scale(1);
		}
		50% {
			transform: translateY(-25px) translateX(-20px) scale(1.1);
		}
	}

	@keyframes float-fast {
		0%, 100% {
			transform: translateY(0) translateX(0) rotate(0deg);
		}
		50% {
			transform: translateY(-15px) translateX(10px) rotate(5deg);
		}
	}

	@keyframes progress {
		0% {
			width: 0%;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes gradient-shift {
		0%, 100% {
			transform: translateX(0) translateY(0);
			opacity: 0.3;
		}
		50% {
			transform: translateX(20px) translateY(-20px);
			opacity: 0.5;
		}
	}

	@keyframes pulse-slow {
		0%, 100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.1);
		}
	}

	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out;
	}

	.animate-float-slow {
		animation: float-slow 10s ease-in-out infinite;
	}

	.animate-float-medium {
		animation: float-medium 8s ease-in-out infinite;
	}

	.animate-float-fast {
		animation: float-fast 5s ease-in-out infinite;
	}

	.animate-progress {
		animation: progress 6s linear;
	}

	.animate-gradient-shift {
		animation: gradient-shift 8s ease-in-out infinite;
	}

	.animate-pulse-slow {
		animation: pulse-slow 4s ease-in-out infinite;
	}

	.animate-bounce-slow {
		animation: bounce-slow 2s ease-in-out infinite;
	}

	.scale-105 {
		transform: scale(1.05);
	}
	
	.scale-100 {
		transform: scale(1);
	}

	/* Smooth transitions for all interactive elements */
	button {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Enhanced text shadows for better readability - responsive */
	h1 {
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4), 0 1px 5px rgba(0, 0, 0, 0.3);
	}

	@media (min-width: 640px) {
		h1 {
			text-shadow: 0 3px 15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);
		}
	}

	@media (min-width: 768px) {
		h1 {
			text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3);
		}
	}

	/* Extra small devices (phones, 320px and up) */
	@media (min-width: 320px) {
		section {
			min-height: 500px;
		}
	}

	/* Small devices (phones, 375px and up) */
	@media (min-width: 375px) {
		section {
			min-height: 550px;
		}
	}

	/* Responsive text sizing for better mobile readability */
	@media (max-width: 374px) {
		h1 {
			font-size: 1.25rem;
			line-height: 1.2;
		}
	}

	@media (min-width: 375px) and (max-width: 639px) {
		h1 {
			font-size: 1.5rem;
			line-height: 1.2;
		}
	}

	/* Glassmorphism effect */
	.backdrop-blur-md {
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	/* Better touch targets for mobile */
	@media (max-width: 768px) {
		button {
			min-height: 44px;
			min-width: 44px;
		}
	}

	/* Landscape orientation adjustments */
	@media (max-height: 500px) and (orientation: landscape) {
		section {
			min-height: 100vh;
			height: 100vh;
		}
		
		.embla__slide {
			padding-top: 1rem;
			padding-bottom: 1rem;
		}
	}

	/* Tablet portrait adjustments */
	@media (min-width: 768px) and (max-width: 1024px) and (orientation: portrait) {
		section {
			min-height: 100vh;
		}
	}

	/* Tablet size (768px - 1024px) - Fix content and navigation overlap */
	@media (min-width: 768px) and (max-width: 1024px) {
		/* Ensure content wrapper has enough bottom padding to avoid navigation dots */
		section .embla__slide > div[class*="relative"][class*="z-10"] {
			padding-bottom: 7rem !important;
		}
		
		/* Adjust stats section margin for better spacing */
		section [class*="grid"][class*="grid-cols-3"] {
			margin-bottom: 2.5rem !important;
		}
		
		/* Adjust navigation dots position for tablet - ensure it's visible */
		section > div > div[class*="absolute"][class*="bottom"]:last-of-type {
			bottom: 1.5rem !important;
		}
	}

	/* Desktop size (1024px+) - Ensure navigation dots stay at bottom */
	@media (min-width: 1024px) {
		/* Keep navigation dots at reasonable bottom position */
		section > div > div[class*="absolute"][class*="bottom"]:last-of-type {
			bottom: 2.5rem !important;
		}
	}

	/* Large desktop adjustments */
	@media (min-width: 1920px) {
		section {
			min-height: 100vh;
		}
		
		/* Large desktop - keep navigation dots visible */
		section > div > div[class*="absolute"][class*="bottom"]:last-of-type {
			bottom: 4rem !important;
		}
	}

	/* Prevent text selection on mobile for better UX */
	@media (max-width: 768px) {
		button {
			-webkit-tap-highlight-color: transparent;
			touch-action: manipulation;
		}
	}

	/* Improve image rendering on mobile */
	img {
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
	}

	@media (min-width: 640px) {
		img {
			image-rendering: auto;
		}
	}

	/* Smooth font rendering */
	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>