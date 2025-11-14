<script lang="ts">
	import { onMount } from 'svelte';
	// @ts-expect-error - vite-imagetools processes these at build time
	import bannerImage from '$lib/assets/images/about/about-banner.jpg?w=1920&h=1080&format=webp&quality=75';

	let isVisible = $state(false);

	onMount(() => {
		// Trigger animation on mount
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<section 
	class="relative h-[60vh] min-h-[300px] md:min-h-[400px] lg:min-h-[400px] overflow-hidden"
	role="banner"
>
	<!-- Dark Grey Bands at Top and Bottom -->
	<!-- <div class="absolute top-0 left-0 w-full h-16 sm:h-20 md:h-24 bg-gray-900 z-20"></div>
	<div class="absolute bottom-0 left-0 w-full h-16 sm:h-20 md:h-24 bg-gray-900 z-20"></div> -->

	<!-- Background Image -->
	<div class="absolute inset-0 overflow-hidden">
		<img 
			src={bannerImage} 
			alt="About Implesia"
			class="w-full h-full object-cover object-center"
			loading="eager"
			fetchpriority="high"
			width="1920"
			height="1080"
			sizes="100vw"
		/>
		
		<!-- Gradient Overlay -->
		<div 
			class="absolute inset-0 opacity-85 transition-opacity duration-1000"
			style="background: linear-gradient(135deg, rgba(15, 23, 42, 0.75) 0%, rgba(30, 41, 59, 0.65) 50%, rgba(15, 23, 42, 0.75) 100%)"
		></div>
		<div class="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60"></div>
		
		<!-- Animated gradient mesh overlay -->
		<div class="absolute inset-0 opacity-20">
			<div class="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 via-transparent to-transparent animate-gradient-shift"></div>
		</div>
	</div>

	<!-- Floating Shapes -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="hidden sm:block absolute top-1/4 -left-10 sm:-left-16 md:-left-20 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-white/5 rounded-full blur-2xl sm:blur-3xl animate-float-slow"></div>
		<div class="hidden sm:block absolute bottom-1/4 -right-10 sm:-right-16 md:-right-20 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/3 rounded-full blur-2xl sm:blur-[80px] md:blur-[100px] animate-float-medium"></div>
		<div class="hidden sm:block absolute top-1/3 right-1/4 w-16 h-16 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-yellow-400/10 rounded-full blur-lg sm:blur-xl md:blur-2xl animate-float-fast"></div>
	</div>

	<!-- Content -->
	<div class="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
		<div 
			class="text-center w-full max-w-5xl transform transition-all duration-1000 ease-out"
			class:translate-y-0={isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:opacity-0={!isVisible}
		>
			<!-- Welcome Badge (Yellow Box) -->
			<div 
				class="inline-block mb-4 sm:mb-6 md:mb-8 transform transition-all duration-700 delay-100"
				class:translate-y-0={isVisible}
				class:translate-y-4={!isVisible}
				class:opacity-100={isVisible}
				class:opacity-0={!isVisible}
			>
				<div class="bg-yellow-400 px-2.5 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2.5 shadow-lg shadow-yellow-400/30">
					<span class="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider">
						Welcome to Implesia
					</span>
				</div>
			</div>

			<!-- Main Title -->
			<h1 
				class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 md:mb-6 text-white uppercase tracking-tight transform transition-all duration-1000 delay-200"
				class:translate-y-0={isVisible}
				class:translate-y-6={!isVisible}
			>
				<span class="block drop-shadow-2xl">
					About Us
				</span>
			</h1>

			<!-- Breadcrumb Navigation -->
			<div 
				class="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 text-[10px] sm:text-xs md:text-sm lg:text-base transform transition-all duration-1000 delay-300"
				class:translate-y-0={isVisible}
				class:translate-y-4={!isVisible}
			>
				<a 
					href="/" 
					class="text-[#0BC1C0] hover:text-[#0a9a99] font-semibold transition-colors duration-200"
				>
					HOME
				</a>
				<span class="text-white font-semibold">></span>
				<span class="text-white font-semibold">ABOUT US</span>
			</div>
		</div>
	</div>
</section>

<style>
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

	@keyframes gradient-shift {
		0%, 100% {
			transform: translateX(0) translateY(0);
			opacity: 0.2;
		}
		50% {
			transform: translateX(20px) translateY(-20px);
			opacity: 0.3;
		}
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

	.animate-gradient-shift {
		animation: gradient-shift 8s ease-in-out infinite;
	}

	/* Enhanced text shadows for better readability */
	h1 {
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	/* Smooth font rendering */
	* {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
