<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CustomCursor from '$lib/components/ui/CustomCursor.svelte';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Custom Cursor for entire website -->
<CustomCursor />

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="grow">
		<slot />
	</main>
	<Footer />
</div>
