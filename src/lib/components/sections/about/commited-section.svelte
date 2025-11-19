
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const donutSegments = [
		{ label: 'Strategy', value: 42, color: '#F5C518' },
		{ label: 'Execution', value: 28, color: '#FF9100' },
		{ label: 'Support', value: 30, color: '#8B949E' }
	];

	const skills = [
		{ label: 'Problem Solving', value: 92 },
		{ label: 'Product Strategy', value: 87 },
		{ label: 'Infrastructure', value: 78 },
		{ label: 'Networking', value: 94 },
		{ label: 'Learning Agility', value: 85 }
	];

	const bulletPoints = [
		'We co-create solutions with founders and internal teams.',
		'Every sprint ends with a measurable impact on your product.',
		'Security, accessibility, and performance are reviewed every cycle.',
		'Stakeholders get transparent reporting with zero surprises.',
		'24/7 Implesia support desk keeps your systems healthy.'
	];

	const donutStyle = () => {
		let start = 0;
		const gradients: string[] = [];

		donutSegments.forEach((segment) => {
			const end = start + (segment.value / 100) * 360;
			gradients.push(`${segment.color} ${start}deg ${end}deg`);
			start = end;
		});

		return `conic-gradient(${gradients.join(', ')})`;
	};

	// Card visibility states
	let card1Visible = $state(false);
	let card2Visible = $state(false);
	let card3Visible = $state(false);
	let card4Visible = $state(false);
	let rightContentVisible = $state(false);

	let card1Ref: HTMLDivElement;
	let card2Ref: HTMLDivElement;
	let card3Ref: HTMLDivElement;
	let card4Ref: HTMLDivElement;
	let rightContentRef: HTMLDivElement;

	onMount(() => {
		if (!browser) return;

		const observerOptions = {
			threshold: 0.2,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const target = entry.target as HTMLElement;
					const cardId = target.dataset.cardId;
					
					if (cardId === 'card1') card1Visible = true;
					if (cardId === 'card2') card2Visible = true;
					if (cardId === 'card3') card3Visible = true;
					if (cardId === 'card4') card4Visible = true;
					if (cardId === 'right') rightContentVisible = true;
					
					observer.unobserve(entry.target);
				}
			});
		}, observerOptions);

		if (card1Ref) observer.observe(card1Ref);
		if (card2Ref) observer.observe(card2Ref);
		if (card3Ref) observer.observe(card3Ref);
		if (card4Ref) observer.observe(card4Ref);
		if (rightContentRef) observer.observe(rightContentRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<section class="w-full bg-[#0d6b6b] text-white py-16 sm:py-20 md:py-24">
	<div class="container mx-auto max-w-6xl px-4 sm:px-6">
		<div class="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12">
			<!-- Left grid -->
			<div class="grid grid-cols-2 gap-4 md:gap-6">
				<!-- Donut chart -->
				<div 
					bind:this={card1Ref}
					data-card-id="card1"
					class="card group card-animate"
					class:card-open={card1Visible}
				>
					<div class="flex flex-col items-center gap-2 sm:gap-4">
						<div
							class="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full"
							style={`background: ${donutStyle()}`}
						>
							<div class="absolute inset-3 xs:inset-3.5 sm:inset-4 bg-[#063f3f] rounded-full border border-white/10"></div>
						</div>
						<div class="flex flex-col gap-1.5 sm:gap-2 text-[10px] xs:text-xs sm:text-sm">
							{#each donutSegments as segment}
								<div class="flex items-center gap-1.5 sm:gap-2">
									<span class="inline-block w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm" style={`background:${segment.color}`}></span>
									<span class="text-white/80">{segment.label}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Complete work -->
				<div 
					bind:this={card2Ref}
					data-card-id="card2"
					class="card card-animate"
					class:card-open={card2Visible}
				>
					<p class="text-white/70 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
						Implesia runs collaborative workshops before delivery so your vision is never lost in code.
					</p>
					<div class="text-3xl sm:text-4xl md:text-5xl font-black text-white">
						86<span class="text-[#F5C518] text-xl sm:text-2xl md:text-3xl align-top">%</span>
					</div>
					<p class="text-white/60 text-xs sm:text-sm mt-2 sm:mt-3">Deliverables approved in the first review</p>
				</div>

				<!-- Internal expertise -->
				<div 
					bind:this={card3Ref}
					data-card-id="card3"
					class="card card-animate"
					class:card-open={card3Visible}
				>
					<div class="border-t-2 border-[#F5C518] w-full mb-4 sm:mb-6"></div>
					<p class="text-white/70 text-xs sm:text-sm leading-relaxed">
						Specialized squads for SaaS, fintech, healthcare, and creative agencies.
					</p>
					<div class="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-black">
						92<span class="text-[#F5C518] text-lg sm:text-xl md:text-2xl align-top">+</span>
					</div>
					<p class="text-white/60 text-xs sm:text-sm mt-2">Collective internal expertise score</p>
				</div>

				<!-- Skill bars -->
				<div 
					bind:this={card4Ref}
					data-card-id="card4"
					class="card card-animate"
					class:card-open={card4Visible}
				>
					{#each skills as skill}
						<div class="mb-3 sm:mb-4 last:mb-0">
							<div class="flex justify-between text-white/70 text-[10px] xs:text-xs sm:text-sm mb-1">
								<span>{skill.label}</span>
								<span>{skill.value}%</span>
							</div>
							<div class="h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.18);">
								<div
									class="h-full bg-linear-to-r from-[#F5C518] via-[#FF9100] to-[#F5C518] rounded-full animate-grow-bar"
									style={`width:${skill.value}%;`}
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right content -->
			<div 
				bind:this={rightContentRef}
				data-card-id="right"
				class="flex flex-col justify-center space-y-6 content-animate"
				class:content-open={rightContentVisible}
			>
				<div class="text-[10px] xs:text-xs sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-white/70 uppercase">
					Totally committed
				</div>
				<h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight">
					Implesia helps you find the right build partner for every milestone.
				</h2>
				<p class="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">
					Our leadership pods operate like an extension of your team. From discovery to launch, we plug in
					strategy, engineering, DevOps, and design to accelerate outcomes without sacrificing stability.
				</p>

				<ul class="space-y-2 sm:space-y-3 text-white/80 text-xs sm:text-sm md:text-base">
					{#each bulletPoints as point, index}
						<li class="flex items-start gap-2 sm:gap-3">
							<span class="mt-1 inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#F5C518] animate-pulse-dark"></span>
							<span>{point}</span>
						</li>
					{/each}
				</ul>

				<button class="inline-flex items-center justify-center w-fit px-4 sm:px-6 py-2 sm:py-3 bg-[#F5C518] text-black text-xs sm:text-sm md:text-base font-semibold rounded-sm shadow-lg shadow-[#F5C518]/20 hover:translate-y-[-2px] transition-all">
					Learn More
					<svg
						class="w-4 h-4 ml-2"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</section>

<style>
	.card {
		background: rgba(4, 24, 29, 0.78);
		border-radius: 0.5rem;
		padding: 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.12);
		box-shadow: 0 18px 45px rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(12px);
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.card-animate {
		opacity: 0;
		transform: scale(0.85) translateY(30px);
		transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.card-animate.card-open {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	.card-animate.card-open:hover {
		transform: scale(1.02) translateY(-4px);
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
	}

	.content-animate {
		opacity: 0;
		transform: scale(0.85) translateY(30px);
		transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.content-animate.content-open {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	@media (min-width: 640px) {
		.card {
			padding: 1.5rem;
		}
	}

	@media (max-width: 1024px) {
		.card {
			padding: 1rem;
		}
	}

	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes grow-bar {
		from {
			width: 0;
		}
		to {
			width: var(--target, 100%);
		}
	}

	@keyframes pulse-dark {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.3);
			opacity: 0.6;
		}
	}

	.animate-grow-bar {
		animation: grow-bar 1.4s ease forwards;
	}

	.animate-pulse-dark {
		animation: pulse-dark 1.8s ease-in-out infinite;
	}

	@media (max-width: 1024px) {
		.card {
			padding: 1rem;
		}
	}
</style>