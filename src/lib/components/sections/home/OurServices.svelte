<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Code,
		Server,
		Cloud,
		Palette,
		Image as ImageIcon,
		TrendingUp,
		Video,
		Globe
	} from 'lucide-svelte';

	interface Service {
		id: number;
		title: string;
		description: string;
		icon: typeof Code;
		gradient: string;
		features: string[];
	}

	const services: Service[] = [
		{
			id: 1,
			title: 'Frontend Development',
			description: 'Create stunning, responsive user interfaces with modern frameworks and cutting-edge technologies.',
			icon: Code,
			gradient: 'from-blue-500 via-cyan-500 to-teal-500',
			features: ['React, Vue, Svelte', 'Responsive Design', 'Performance Optimization', 'Modern UI/UX']
		},
		{
			id: 2,
			title: 'Backend Development',
			description: 'Build robust, scalable server-side solutions with secure APIs and efficient database management.',
			icon: Server,
			gradient: 'from-purple-500 via-pink-500 to-rose-500',
			features: ['REST & GraphQL APIs', 'Database Design', 'Cloud Integration', 'Security & Authentication']
		},
		{
			id: 3,
			title: 'DevOps & Server Management',
			description: 'Streamline deployment, monitoring, and infrastructure management for seamless operations.',
			icon: Cloud,
			gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
			features: ['CI/CD Pipelines', 'Cloud Infrastructure', 'Monitoring & Logging', 'Auto-scaling']
		},
		{
			id: 4,
			title: 'UI/UX Design',
			description: 'Design intuitive and beautiful user experiences that engage and convert your audience.',
			icon: Palette,
			gradient: 'from-orange-500 via-red-500 to-pink-500',
			features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems']
		},
		{
			id: 5,
			title: 'Graphics Design',
			description: 'Create compelling visual identities, branding, and marketing materials that stand out.',
			icon: ImageIcon,
			gradient: 'from-green-500 via-emerald-500 to-teal-500',
			features: ['Brand Identity', 'Logo Design', 'Print Design', 'Digital Graphics']
		},
		{
			id: 6,
			title: 'Digital Marketing',
			description: 'Boost your online presence with strategic marketing campaigns and data-driven insights.',
			icon: TrendingUp,
			gradient: 'from-yellow-500 via-orange-500 to-red-500',
			features: ['SEO Optimization', 'Social Media', 'Content Marketing', 'Analytics & Reporting']
		},
		{
			id: 7,
			title: 'Motion Design',
			description: 'Bring your brand to life with captivating animations and motion graphics.',
			icon: Video,
			gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
			features: ['2D/3D Animation', 'Video Production', 'Motion Graphics', 'Interactive Media']
		},
		{
			id: 8,
			title: 'WordPress Development',
			description: 'Build powerful, customizable websites and e-commerce solutions with WordPress.',
			icon: Globe,
			gradient: 'from-[#0BC1C0] via-[#0a9a99] to-[#088a89]',
			features: ['Custom Themes', 'Plugin Development', 'WooCommerce', 'Performance Tuning']
		}
	];

	let hoveredCard: number | null = $state(null);
	let isVisible = $state(false);

	onMount(() => {
		// Trigger animation on mount
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
</script>

<section class="relative w-full py-20 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden bg-linear-to-br from-gray-50 via-white to-gray-50">
	<!-- Animated Background Elements -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-slow"></div>
		<div class="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float-medium"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-200/10 rounded-full blur-3xl animate-pulse-slow"></div>
	</div>

	<!-- Content Container -->
	<div class="relative z-10 container mx-auto max-w-7xl">
		<!-- Section Header -->
		<div 
			class="text-center mb-12 sm:mb-16 lg:mb-20 transform transition-all duration-1000"
			class:translate-y-0={isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:opacity-0={!isVisible}
		>
			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#0BC1C0]/10 to-[#0a9a99]/10 border border-[#0BC1C0]/20 mb-6 backdrop-blur-sm">
				<div class="w-2 h-2 rounded-full bg-[#0BC1C0] animate-pulse"></div>
				<span class="text-sm font-semibold text-[#0a9a99] uppercase tracking-wide">Our Services</span>
			</div>
			
			<h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
				<span class="bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
					End-to-End Solutions
				</span>
			</h2>
			
			<p class="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
				Comprehensive web and software solutions tailored to your business needs. 
				From concept to deployment, we've got you covered.
			</p>
		</div>

		<!-- Services Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
			{#each services as service, index (service.id)}
				<div
					class="group relative h-full"
					role="button"
					tabindex="0"
					onmouseenter={() => hoveredCard = service.id}
					onmouseleave={() => hoveredCard = null}
					style="animation-delay: {index * 100}ms"
				>
					<!-- Service Card -->
					<div
						class="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out cursor-pointer"
						class:scale-105={hoveredCard === service.id}
						class:scale-100={hoveredCard !== service.id}
						class:z-10={hoveredCard === service.id}
						class:z-0={hoveredCard !== service.id}
						class:shadow-2xl={hoveredCard === service.id}
						class:shadow-lg={hoveredCard !== service.id}
					>
						<!-- Gradient Background -->
						<div 
							class="absolute inset-0 bg-linear-to-br {service.gradient} transition-opacity duration-500"
							class:opacity-100={hoveredCard === service.id}
							class:opacity-90={hoveredCard !== service.id}
						></div>

						<!-- Animated Overlay -->
						<div 
							class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent transition-opacity duration-500"
							class:opacity-100={hoveredCard === service.id}
							class:opacity-60={hoveredCard !== service.id}
						></div>

						<!-- Shine Effect -->
						<div 
							class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000"
							class:translate-x-full={hoveredCard === service.id}
						></div>

						<!-- Card Content -->
						<div class="relative z-10 p-6 sm:p-8 h-full flex flex-col">
							<!-- Icon -->
							<div 
								class="mb-4 sm:mb-6 transform transition-all duration-500"
								class:scale-110={hoveredCard === service.id}
								class:rotate-12={hoveredCard === service.id}
								class:scale-100={hoveredCard !== service.id}
							>
								<div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/30">
									{#if service.icon}
										{@const Icon = service.icon}
										<Icon 
											class="w-7 h-7 sm:w-8 sm:h-8 text-white"
										/>
									{/if}
								</div>
							</div>

							<!-- Title -->
							<h3 
								class="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 transition-all duration-500"
								class:translate-y-0={hoveredCard === service.id}
								class:translate-y-2={hoveredCard !== service.id}
							>
								{service.title}
							</h3>

							<!-- Description -->
							<p 
								class="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 leading-relaxed transition-all duration-500 line-clamp-3"
								class:opacity-100={hoveredCard === service.id}
								class:opacity-80={hoveredCard !== service.id}
							>
								{service.description}
							</p>

							<!-- Features List (Expands on Hover) -->
							<div 
								class="flex-1 overflow-hidden transition-all duration-500"
								class:max-h-96={hoveredCard === service.id}
								class:max-h-0={hoveredCard !== service.id}
							>
								<ul class="space-y-2 sm:space-y-3 pt-2">
									{#each service.features as feature}
									<li 
										class="flex items-center gap-2 text-sm sm:text-base text-white/90 transform transition-all duration-500"
										class:translate-x-0={hoveredCard === service.id}
										class:translate-x-4={hoveredCard !== service.id}
										style="transition-delay: {hoveredCard === service.id ? index * 50 : 0}ms"
									>
										<div class="w-1.5 h-1.5 rounded-full bg-white shrink-0"></div>
										<span>{feature}</span>
									</li>
									{/each}
								</ul>
							</div>

							<!-- Learn More Button -->
							<div 
								class="mt-4 sm:mt-6 transform transition-all duration-500"
								class:translate-y-0={hoveredCard === service.id}
								class:translate-y-4={hoveredCard !== service.id}
								class:opacity-100={hoveredCard === service.id}
								class:opacity-0={hoveredCard !== service.id}
							>
								<button 
									class="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm sm:text-base hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg"
								>
									Learn More
								</button>
							</div>
						</div>

						<!-- Decorative Corner Elements -->
						<div 
							class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-bl-full transition-all duration-500"
							class:opacity-100={hoveredCard === service.id}
							class:opacity-0={hoveredCard !== service.id}
						></div>
						<div 
							class="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-tr-full transition-all duration-500"
							class:opacity-100={hoveredCard === service.id}
							class:opacity-0={hoveredCard !== service.id}
						></div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Call to Action -->
		<div 
			class="mt-12 sm:mt-16 lg:mt-20 text-center transform transition-all duration-1000 delay-300"
			class:translate-y-0={isVisible}
			class:translate-y-8={!isVisible}
			class:opacity-100={isVisible}
			class:opacity-0={!isVisible}
		>
			<button 
				class="px-8 sm:px-10 py-3.5 sm:py-4 text-white bg-linear-to-r from-[#0BC1C0] to-[#0a9a99] rounded-full text-base sm:text-lg font-semibold hover:from-[#0a9a99] hover:to-[#0BC1C0] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
			>
				View All Services
			</button>
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

	.animate-float-slow {
		animation: float-slow 10s ease-in-out infinite;
	}

	.animate-float-medium {
		animation: float-medium 8s ease-in-out infinite;
	}

	.animate-pulse-slow {
		animation: pulse-slow 4s ease-in-out infinite;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Smooth transitions for all interactive elements */
	.group {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Improve card hover effect on mobile */
	@media (max-width: 640px) {
		.group:hover .group\:scale-105 {
			transform: scale(1.02);
		}
	}
</style>

