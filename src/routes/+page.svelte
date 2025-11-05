<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<Hero />

<section class="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-3">
	<Card title="Web Development" description="Build fast, scalable web applications">
		<div slot="footer" class="mt-4">
			<Button>Learn More</Button>
		</div>
	</Card>

	<Card title="Mobile Apps" description="Cross-platform apps for iOS and Android">
		<div slot="footer" class="mt-4">
			<Button>Learn More</Button>
		</div>
	</Card>

	<Card title="UI/UX Design" description="Beautiful interfaces and seamless experiences">
		<div slot="footer" class="mt-4">
			<Button>Learn More</Button>
		</div>
	</Card>
</section>
