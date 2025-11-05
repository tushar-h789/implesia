<!-- <script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()} -->

<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
