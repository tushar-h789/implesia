
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	// @ts-expect-error - processed by vite-imagetools
	import ceoImage from '$lib/assets/images/home/tushar-2.jpg?w=280&h=360&format=webp&quality=85';
	// @ts-expect-error - processed by vite-imagetools
	import marketingImage from '$lib/assets/images/home/team/nazrul.jpg?w=280&h=360&format=webp&quality=85';
	// @ts-expect-error
	import managerImage from '$lib/assets/images/home/team/munna.png?w=280&h=360&format=webp&quality=85';

	const teamMembers = [
		{
			name: 'Nazrul Islam',
			role: 'Co-Founder & Tech Lead',
			image: marketingImage,
			accent: 'linear-gradient(180deg, #00D1C1 0%, #007E7C 100%)',
			borderColor: '#00d1c1'
		},
		{
			name: 'Tushar Hossen',
			role: 'Founder & CEO',
			image: ceoImage,
            accent: 'linear-gradient(180deg, #FFDA27 0%, #F9A602 100%)',
			borderColor: '#F8C537',
			featured: true
		},
		{
            name: 'Munna Hossain',
			role: 'Co-Founder & Marketing Manager',
			image: managerImage,
            accent: 'linear-gradient(180deg, #F72585 0%, #B5179E 100%)',
			borderColor: '#F9A602'
		}
	];

	let sectionVisible = $state(false);
	let sectionRef: HTMLElement;

	onMount(() => {
		if (!browser) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						sectionVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.25 }
		);

		if (sectionRef) observer.observe(sectionRef);

		return () => observer.disconnect();
	});
</script>

<section 
	bind:this={sectionRef} 
	class="py-16 px-6 flex justify-center bg-gradient-radial from-slate-900/95 via-slate-950 to-slate-950"
	class:visible={sectionVisible}
>
	<div class="w-full max-w-2xl bg-slate-950 rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/6 text-center text-slate-50">
		<div class="mb-10">
			<p class="text-xs sm:text-sm tracking-[0.4em] uppercase text-white/70 mb-3">
				Meet our team
			</p>
			<h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
				People crafting every Implesia milestone
			</h2>
			<p class="text-sm sm:text-base text-slate-200/80 leading-relaxed">
				Diverse dreamers, engineers, and strategists who treat your roadmap like their own. We stay small so we
				can stay personal.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
			{#each teamMembers as member, index}
				<div 
					class="team-card flex flex-col items-center gap-2.5 p-2 transition-all duration-600 ease-out-bounce"
					class:opacity-0={!sectionVisible}
					class:translate-y-10={!sectionVisible}
					class:scale-90={!sectionVisible}
					class:opacity-100={sectionVisible}
					class:translate-y-0={sectionVisible}
					class:scale-100={sectionVisible && !member.featured}
					class:scale-105={sectionVisible && member.featured}
					class:featured={member.featured}
					class:visible={sectionVisible}
					style={`transition-delay: ${index * 120}ms`}
				>
					<div 
						class="w-full max-w-[150px] rounded-full p-1.5 relative shadow-[0_15px_35px_rgba(0,0,0,0.4)] border-2 avatar-wrapper"
						class:max-w-[180px]={member.featured}
						class:p-[0.45rem]={member.featured}
						style={`background: ${member.accent}; border-color: ${member.borderColor}`}
					>
						<img 
							src={member.image} 
							alt={`${member.name} - ${member.role}`} 
							loading="lazy"
							class="w-full h-[220px] sm:h-[220px] object-cover rounded-full block saturate-105"
							class:h-[250px]={member.featured}
							class:h-[200px]={!member.featured}
						/>
					</div>
					<p 
						class="font-bold tracking-wide uppercase text-sm"
						class:text-base={member.featured}
					>
						{member.name}
					</p>
					<p 
						class="text-sm text-slate-200/75"
						class:text-[0.95rem]={member.featured}
					>
						{member.role}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.bg-gradient-radial {
		background: radial-gradient(circle at top, rgba(11, 22, 38, 0.95), #030712 70%);
	}

	.avatar-wrapper::after {
		content: '';
		position: absolute;
		inset: 8px;
		border-radius: 999px;
		border: 2px solid rgba(255, 255, 255, 0.25);
		pointer-events: none;
	}

	.duration-600 {
		transition-duration: 0.6s;
	}

	.ease-out-bounce {
		transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.team-card.visible:hover:not(.featured) {
		transform: translateY(-6px) scale(1.03);
	}

	.team-card.visible.featured:hover {
		transform: translateY(-6px) scale(1.08);
	}
</style>