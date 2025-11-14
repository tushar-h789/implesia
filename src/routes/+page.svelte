<script lang="ts">
	import AboutUs from '$lib/components/sections/AboutUs.svelte';
	import Hero from '$lib/components/sections/Hero.svelte';
	import WeAreImplesian from '$lib/components/sections/WeAreImplesian.svelte';
	import OurTeamMembers from '$lib/components/sections/OurTeamMembers.svelte';
	import Pricing from '$lib/components/sections/pricing.svelte';
	import FAQSection from '$lib/components/sections/faq-section.svelte';
	import ContactUs from '$lib/components/sections/ContactUs.svelte';
	import OurServices from '$lib/components/sections/OurServices.svelte';
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

