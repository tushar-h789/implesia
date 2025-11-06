<!-- <script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>


{@render children()} -->

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
