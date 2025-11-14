<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CustomCursor from '$lib/components/ui/CustomCursor.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- Custom Cursor for entire website -->
<CustomCursor />

<!-- Toast Notifications -->
<Toaster position="top-right" richColors />

<div class="flex min-h-screen flex-col">
	<Navbar />
	<main class="grow">
		<slot />
	</main>
	<Footer />
</div>
