<script lang="ts">
	import { ChevronDown, Menu, X, Facebook, Github, Twitter, Linkedin } from 'lucide-svelte';

	let open = false;
	let servicesOpen = false;
	let servicesTimeout: ReturnType<typeof setTimeout> | null = null;

	// Services dropdown data
	const services = [
		{ name: 'Web Development', icon: '💻' },
		{ name: 'Mobile Apps', icon: '📱' },
		{ name: 'UI/UX Design', icon: '🎨' },
		{ name: 'Digital Marketing', icon: '📊' },
		{ name: 'Consulting', icon: '💼' }
	];

	function toggleServices() {
		servicesOpen = !servicesOpen;
	}

	function handleServicesMouseEnter() {
		if (window.innerWidth >= 768) {
			// Only on desktop (768px and above)
			if (servicesTimeout) {
				clearTimeout(servicesTimeout);
				servicesTimeout = null;
			}
			servicesOpen = true;
		}
	}

	function handleServicesMouseLeave() {
		if (window.innerWidth >= 768) {
			// Only on desktop (768px and above) - add delay before closing
			servicesTimeout = setTimeout(() => {
				servicesOpen = false;
			}, 200); // 200ms delay
		}
	}
</script>

<nav
	class="border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur-md"
	role="navigation"
	aria-label="Main navigation"
>
	<div class="container flex items-center justify-between">
		<!-- Logo Section -->
		<div class="flex items-center space-x-3">
			<div
				class="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-purple-600 shadow-lg"
			>
				<span class="text-xl font-bold text-white">I</span>
			</div>
			<span
				class="bg-linear-to-r from-blue-600 to-pink-600 bg-clip-text text-2xl font-black text-transparent"
			>
				Implesia
			</span>
		</div>

		<!-- Mobile Menu Button -->
		<button
			class="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
			aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
			aria-expanded={open}
			aria-controls="mobile-menu"
			on:click={() => (open = !open)}
		>
			{#if open}
				<X class="h-6 w-6" />
			{:else}
				<Menu class="h-6 w-6" />
			{/if}
		</button>

		<!-- Navigation Items - Desktop -->
		<div class="hidden items-center space-x-8 md:flex" role="menubar">
			<a
				href="/"
				class="group relative font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600"
				role="menuitem"
			>
				Home
				<div
					class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"
				></div>
			</a>

			<a
				href="/about"
				class="group relative font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600"
				role="menuitem"
			>
				About
				<div
					class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"
				></div>
			</a>

			<!-- Services Dropdown -->
			<div
				class="relative"
				role="menuitem"
				aria-haspopup="true"
				aria-expanded={servicesOpen}
				on:mouseenter={handleServicesMouseEnter}
				on:mouseleave={handleServicesMouseLeave}
			>
				<button
					class="group flex items-center space-x-1 font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600"
					on:click={toggleServices}
					aria-label="Services menu"
				>
					<span>Services</span>
					<ChevronDown
						class="h-4 w-4 transition-transform duration-200 {servicesOpen ? 'rotate-180' : ''}"
					/>
					<div
						class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"
					></div>
				</button>

				<!-- Dropdown Menu -->
				{#if servicesOpen}
					<div
						class="absolute top-full left-0 z-50 animate-in rounded-xl pt-2 fade-in-0 zoom-in-95"
						role="menu"
						aria-label="Services submenu"
						on:mouseenter={handleServicesMouseEnter}
						on:mouseleave={handleServicesMouseLeave}
					>
						<div
							class="w-80 rounded-xl border border-gray-100 bg-white px-3 py-3 shadow-xl md:w-96"
						>
							<div class="grid grid-cols-2 gap-2 md:grid-cols-3">
								{#each services as service, index}
									<a
										href="/services/{service.name.toLowerCase().replace(' ', '-')}"
										class="group flex flex-col items-center space-y-2 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-blue-50"
										role="menuitem"
										tabindex="0"
									>
										<span class="text-2xl" aria-hidden="true">{service.icon}</span>
										<span
											class="text-center text-sm font-medium text-gray-700 group-hover:text-blue-600"
											>{service.name}</span
										>
									</a>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>

			<a
				href="/contact"
				class="group relative font-semibold text-gray-700 transition-colors duration-200 hover:text-blue-600"
				role="menuitem"
			>
				Contact
				<div
					class="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"
				></div>
			</a>
		</div>

		<!-- Social Links -->
		<div class="hidden items-center space-x-3 md:flex" role="group" aria-label="Social media links">
			<a
				href="https://www.facebook.com"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				aria-label="Facebook"
			>
				<Facebook class="h-4 w-4" />
			</a>
			<a
				href="https://www.github.com"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				aria-label="Github"
			>
				<Github class="h-4 w-4" />
			</a>
			<a
				href="https://www.twitter.com"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-sky-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				aria-label="Twitter"
			>
				<Twitter class="h-4 w-4" />
			</a>
			<a
				href="https://www.linkedin.com"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-blue-700 to-blue-800 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
				aria-label="LinkedIn"
			>
				<Linkedin class="h-4 w-4" />
			</a>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if open}
		<div
			id="mobile-menu"
			class="mt-4 animate-in border-t border-gray-200 pt-4 fade-in-0 slide-in-from-top-5 md:hidden"
			role="menu"
			aria-label="Mobile navigation menu"
		>
			<div class="flex flex-col space-y-4">
				<a
					href="/"
					class="py-2 font-semibold text-gray-700 transition-colors hover:text-blue-600"
					role="menuitem"
					on:click={() => (open = false)}
				>
					Home
				</a>
				<a
					href="/about"
					class="py-2 font-semibold text-gray-700 transition-colors hover:text-blue-600"
					role="menuitem"
					on:click={() => (open = false)}
				>
					About
				</a>

				<!-- Mobile Services Dropdown -->
				<div class="py-2" role="menuitem">
					<button
						class="flex w-full items-center justify-between font-semibold text-gray-700 transition-colors hover:text-blue-600"
						on:click={toggleServices}
						aria-expanded={servicesOpen}
						aria-label="Services menu"
					>
						<span>Services</span>
						<ChevronDown
							class="h-4 w-4 transition-transform duration-200 {servicesOpen ? 'rotate-180' : ''}"
						/>
					</button>

					{#if servicesOpen}
						<div
							class="mt-2 ml-4 animate-in space-y-2 fade-in-0 slide-in-from-top-2"
							role="menu"
							aria-label="Services submenu"
						>
							{#each services as service}
								<a
									href="/services/{service.name.toLowerCase().replace(' ', '-')}"
									class="flex items-center space-x-3 py-2 text-gray-600 transition-colors hover:text-blue-600"
									role="menuitem"
									on:click={() => {
										open = false;
										servicesOpen = false;
									}}
								>
									<span class="text-lg" aria-hidden="true">{service.icon}</span>
									<span>{service.name}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<a
					href="/contact"
					class="py-2 font-semibold text-gray-700 transition-colors hover:text-blue-600"
					role="menuitem"
					on:click={() => (open = false)}
				>
					Contact
				</a>

				<!-- Mobile Social Links -->
				<div class="flex space-x-3 pt-2" role="group" aria-label="Social media links">
					<a
						href="https://www.facebook.com"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white"
						aria-label="Facebook"
					>
						<Facebook class="h-4 w-4" />
					</a>
					<a
						href="https://www.github.com"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-purple-600 text-white"
						aria-label="Github"
					>
						<Github class="h-4 w-4" />
					</a>
					<a
						href="https://www.twitter.com"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white"
						aria-label="Twitter"
					>
						<Twitter class="h-4 w-4" />
					</a>
					<a
						href="https://www.linkedin.com"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white"
						aria-label="LinkedIn"
					>
						<Linkedin class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>

<style>
	/* Custom animations for shadcn-like feel */
	.animate-in {
		animation-duration: 0.2s;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	.fade-in-0 {
		animation-name: fadeIn;
	}

	.zoom-in-95 {
		animation-name: zoomIn;
	}

	.slide-in-from-top-5 {
		animation-name: slideFromTop;
	}

	.slide-in-from-top-2 {
		animation-name: slideFromTopSmall;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes slideFromTop {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideFromTopSmall {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
