<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import CustomCursor from '$lib/components/ui/CustomCursor.svelte';
	import { Toaster } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	// Get canonical URL
	$: canonicalUrl = browser 
		? `${window.location.origin}${$page.url.pathname}`
		: `https://implesia.vercel.app${$page.url.pathname}`;
</script>

<svelte:head>
	<title>Implesia - Transforming Ideas into Digital Excellence</title>
	<meta name="description" content="Implesia specializes in delivering comprehensive end-to-end solutions for web and software development. From initial concept to final deployment, we handle every aspect of your digital journey with precision and innovation." />
	<meta name="keywords" content="web development, software development, digital solutions, custom web applications, enterprise software, Bangladesh" />
	<meta name="author" content="Implesia" />
	<link rel="canonical" href={canonicalUrl} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Implesia - Transforming Ideas into Digital Excellence" />
	<meta property="og:description" content="Implesia specializes in delivering comprehensive end-to-end solutions for web and software development. From initial concept to final deployment, we handle every aspect of your digital journey with precision and innovation." />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Implesia - Transforming Ideas into Digital Excellence" />
	<meta name="twitter:description" content="Implesia specializes in delivering comprehensive end-to-end solutions for web and software development. From initial concept to final deployment, we handle every aspect of your digital journey with precision and innovation." />
	
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
