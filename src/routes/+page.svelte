<script lang="ts">
	import AboutUs from '$lib/components/sections/home/AboutUs.svelte';
	import Hero from '$lib/components/sections/home/Hero.svelte';
	import WeAreImplesian from '$lib/components/sections/home/WeAreImplesian.svelte';
	import OurTeamMembers from '$lib/components/sections/home/OurTeamMembers.svelte';
	import Pricing from '$lib/components/sections/home/pricing.svelte';
	import FAQSection from '$lib/components/sections/home/faq-section.svelte';
	import ContactUs from '$lib/components/sections/home/ContactUs.svelte';
	import OurServices from '$lib/components/sections/home/OurServices.svelte';
</script>

<div>
	<Hero />
	<AboutUs />
	<OurServices />
	<WeAreImplesian />
	<OurTeamMembers />
	<Pricing />
	<FAQSection />
	<ContactUs />
</div>

