<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Heart,
		Mail,
		Phone,
		MapPin,
		Facebook,
		Twitter,
		Github,
		Linkedin,
		ArrowUp,
		ExternalLink
	} from 'lucide-svelte';

	// Reactive state
	let currentYear = new Date().getFullYear();
	let isVisible = false;
	let scrollY = 0;

	// Footer data
	const quickLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Services', href: '/services' },
		{ name: 'Portfolio', href: '/portfolio' },
		{ name: 'Contact', href: '/contact' }
	];

	const services = [
		'Web Development',
		'Mobile Apps',
		'UI/UX Design',
		'Digital Marketing',
		'Consulting'
	];

	const socialLinks = [
		{ icon: Facebook, href: '#', name: 'Facebook', color: 'hover:text-blue-600' },
		{ icon: Twitter, href: '#', name: 'Twitter', color: 'hover:text-sky-500' },
		{ icon: Github, href: '#', name: 'Github', color: 'hover:text-white' },
		{ icon: Linkedin, href: '#', name: 'LinkedIn', color: 'hover:text-blue-700' }
	];

	// Animation functions
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function handleScroll() {
		scrollY = window.scrollY;
		isVisible = scrollY > 300;
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<footer
	class="relative overflow-hidden px-4 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
>
	<!-- Animated background elements -->
	<div class="absolute inset-0 opacity-5">
		<div
			class="absolute top-10 left-10 h-20 w-20 animate-pulse rounded-full bg-blue-500 blur-xl"
		></div>
		<div
			class="absolute top-1/3 right-20 h-16 w-16 animate-pulse rounded-full bg-purple-500 blur-xl delay-1000"
		></div>
		<div
			class="absolute bottom-20 left-1/4 h-24 w-24 animate-pulse rounded-full bg-pink-500 blur-xl delay-500"
		></div>
	</div>

	<!-- Main footer content -->
	<div class="relative z-10 container mx-auto py-16">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
			<!-- Company Info -->
			<div class="lg:col-span-1">
				<!-- logo -->
				<div class="mb-6 flex items-center space-x-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg"
					>
						<span class="text-xl font-bold text-white">I</span>
					</div>
					<span
						class="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-black text-transparent"
					>
						Implesia
					</span>
				</div>

				<p class="mb-6 text-lg leading-relaxed text-gray-300">
					Creating digital experiences that inspire and transform businesses through innovative
					solutions and cutting-edge technology.
				</p>

				<div class="flex space-x-4">
					{#each socialLinks as social}
						<a
							href={social.href}
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:shadow-lg {social.color}"
							aria-label={social.name}
						>
							<social.icon class="h-5 w-5" />
						</a>
					{/each}
				</div>
			</div>

			<!-- Quick Links -->
			<div class="lg:col-span-1">
				<h3 class="group relative mb-6 inline-block text-xl font-bold">
					Quick Links
					<div
						class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"
					></div>
				</h3>

				<ul class="space-y-3">
					{#each quickLinks as link}
						<li>
							<a
								href={link.href}
								class="group flex items-center space-x-2 text-gray-300 transition-all duration-300 hover:translate-x-2 hover:text-white"
							>
								<ExternalLink
									class="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								/>
								<span>{link.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Services -->
			<div class="lg:col-span-1">
				<h3 class="group relative mb-6 inline-block text-xl font-bold">
					Services
					<div
						class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"
					></div>
				</h3>

				<ul class="space-y-3">
					{#each services as service}
						<li>
							<a
								href="/services/{service.toLowerCase().replace(/ /g, '-')}"
								class="group flex items-center text-gray-300 transition-all duration-300 hover:text-white"
							>
								<div
									class="mr-3 h-2 w-2 transform rounded-full bg-blue-400 opacity-0 transition-all duration-300 group-hover:scale-150 group-hover:opacity-100"
								></div>
								<span class="transition-transform duration-300 group-hover:translate-x-2"
									>{service}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Info -->
			<div class="lg:col-span-1">
				<h3 class="group relative mb-6 inline-block text-xl font-bold">
					Get In Touch
					<div
						class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"
					></div>
				</h3>

				<div class="space-y-4">
					<!-- Email -->
					<a
						href="mailto:hello@implesia.com"
						class="group flex transform cursor-pointer items-center space-x-3 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-white/5"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/30"
						>
							<Mail class="h-4 w-4 text-blue-400" />
						</div>
						<div>
							<p class="text-sm text-gray-400">Email</p>
							<p class="text-white transition-colors duration-300 group-hover:text-blue-300">
								hello@implesia.com
							</p>
						</div>
					</a>

					<!-- Phone -->
					<a
						href="tel:+1516527932"
						class="group flex transform cursor-pointer items-center space-x-3 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-white/5"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-500/30"
						>
							<Phone class="h-4 w-4 text-green-400" />
						</div>
						<div>
							<p class="text-sm text-gray-400">Phone</p>
							<p class="text-white transition-colors duration-300 group-hover:text-green-300">
								+880 1516 527 932
							</p>
						</div>
					</a>

					<!-- Address -->
					<div
						class="group flex transform cursor-pointer items-center space-x-3 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-white/5"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-500/30"
						>
							<MapPin class="h-4 w-4 text-purple-400" />
						</div>
						<div>
							<p class="text-sm text-gray-400">Address</p>
							<p class="text-white transition-colors duration-300 group-hover:text-purple-300">
								287/A Mirpur, Dhaka, Bangladesh
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Newsletter Section -->
		<div class="mt-16 border-t border-gray-700/50 pt-8">
			<div class="mx-auto max-w-md text-center">
				<h4 class="mb-4 text-lg font-semibold">Stay Updated</h4>
				<div class="flex flex-col gap-3 sm:flex-row">
					<input
						type="email"
						placeholder="Enter your email"
						class="flex-1 rounded-xl border border-gray-600 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
					/>
					<button
						class="transform rounded-xl bg-linear-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl"
					>
						Subscribe
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Bottom Bar -->
	<div class="relative z-10 border-t border-gray-700/50">
		<div class="container mx-auto px-6 py-6">
			<div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
				<div class="flex items-center space-x-2 text-gray-400">
					<span>&copy; {currentYear} Implesia. All rights reserved.</span>
				</div>

				<div class="flex items-center space-x-6 text-sm text-gray-400">
					<a href="/privacy" class="transition-colors duration-300 hover:text-white"
						>Privacy Policy</a
					>
					<a href="/terms" class="transition-colors duration-300 hover:text-white"
						>Terms of Service</a
					>
					<a href="/cookies" class="transition-colors duration-300 hover:text-white"
						>Cookie Policy</a
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll to Top Button -->
	<button
		class="fixed right-8 bottom-8 flex h-12 w-12 transform items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl {isVisible
			? 'translate-y-0 opacity-100'
			: 'translate-y-10 opacity-0'}"
		on:click={scrollToTop}
		aria-label="Scroll to top"
	>
		<ArrowUp class="h-5 w-5" />
	</button>
</footer>

<style>
	/* Custom animations */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.animate-float {
		animation: float 3s ease-in-out infinite;
	}

	/* Smooth transitions for all interactive elements */
	* {
		transition-property: color, background-color, border-color, transform, opacity;
		transition-duration: 300ms;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
