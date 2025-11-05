<script lang="ts">
	import { onMount } from 'svelte';
	let open = false;
</script>

<nav class="bg-white shadow-md">
	<div class="container bg-red-600 mx-auto flex items-center justify-between px-4 py-4">
		<a href="/" class="text-2xl font-bold text-blue-600">MyCompany</a>

		<button class="md:hidden" on:click={() => (open = !open)}>
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
				/>
			</svg>
		</button>

		<div class={`space-x-6 md:flex ${open ? 'block' : 'hidden'} mt-4 md:mt-0`}>
			<a href="/" class="transition hover:text-blue-500">Home</a>
			<a href="/about" class="transition hover:text-blue-500">About</a>
			<a href="/services" class="transition hover:text-blue-500">Services</a>
			<a href="/contact" class="transition hover:text-blue-500">Contact</a>
		</div>
	</div>
</nav>
