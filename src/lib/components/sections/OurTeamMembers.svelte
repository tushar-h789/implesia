<script lang="ts">
	import { Facebook, Twitter, Linkedin } from 'lucide-svelte';
    import nazrul from '$lib/assets/images/home/team/nazrul.jpg';
    import munna from '$lib/assets/images/home/team/munna.png';
    import turabi from '$lib/assets/images/home/team/turabi.png';
    import tauhid from '$lib/assets/images/home/team/tauhid.png';
    import soikot from '$lib/assets/images/home/team/tauhid.png';
    import rabbi from '$lib/assets/images/home/team/rabbi.png';

	// Team member data structure
	interface TeamMember {
		id: string;
		name: string;
		role: string;
		image: string;
		socialLinks: {
			facebook?: string;
			twitter?: string;
			linkedin?: string;
		};
	}

	// Team members data (JSON structure)
	const teamMembers: TeamMember[] = [
		{
			id: '1',
			name: 'Nazrul Islam',
			role: 'Co-Founder & Backend Developer & DevOps Engineer',
			image: nazrul, // Replace with actual image paths
			socialLinks: {
				facebook: 'https://facebook.com',
				twitter: 'https://twitter.com',
				linkedin: 'https://linkedin.com'
			}
		},
		{
			id: '2',
			name: 'Munna Hossain',
			role: 'Co-Founder & Marketing & Sales Manager',
			image: munna,
			socialLinks: {
				facebook: 'https://facebook.com',
				twitter: 'https://twitter.com',
				linkedin: 'https://linkedin.com'
			}
		},
		{
			id: '3',
			name: 'Turabi Hossain',
			role: 'Full Stack Developer',
			image: turabi,
			socialLinks: {
				facebook: 'https://facebook.com',
				twitter: 'https://twitter.com',
				linkedin: 'https://linkedin.com'
			}
		},
		{
			id: '4',
			name: 'Tauhid Hossain',
			role: 'Full Stack Developer',
			image: tauhid,
			socialLinks: {
				facebook: 'https://facebook.com',
				twitter: 'https://twitter.com',
				linkedin: 'https://linkedin.com'
			}
		},
		{
			id: '5',
			name: 'Sazubul Islam Soikot',
			role: 'Frontend Developer',
			image: soikot,
			socialLinks: {
				facebook: 'https://facebook.com',
				twitter: 'https://twitter.com',
				linkedin: 'https://linkedin.com'
			}
		},
		{
			id: '6',
			name: 'Rabbi Hossain',
			role: 'Full Stack Developer',
			image: rabbi,
			socialLinks: {
				facebook: 'https://facebook.com',
				twitter: 'https://twitter.com',
				linkedin: 'https://linkedin.com'
			}
		}
	];
</script>

<section class="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#198888]">
	<div class="container mx-auto max-w-7xl">
		<!-- Header Section -->
		<div class="text-center mb-16">
			<!-- Small Label: "OUR TEAM" -->
			<div class="inline-block mb-6">
				<span
					class="inline-block px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border-2 border-white rounded-lg tracking-wide"
				>
					OUR TEAM
				</span>
			</div>

			<!-- Main Title: "MEET OUR TEAM" -->
			<h2
				class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
			>
				MEET OUR TEAM
			</h2>

			<!-- Subtitle: "THE MINDS BEHIND THE MAGIC" -->
			<h3
				class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight"
			>
				THE IMPLESIA BEHIND THE MAGIC
			</h3>

			<!-- Description -->
			<p
				class="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed px-4"
			>
				Get to know the people who turn ideas into strategy and strategy into success. Each
				member of our team brings unique expertise to help your brand grow digitally.
			</p>
		</div>

		<!-- Team Members Grid -->
		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
		>
			{#each teamMembers as member (member.id)}
				<!-- Team Member Card -->
				<div
					class="team-card bg-[#f8fafc] rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
				>
					<!-- Member Image -->
					<div
						class="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-200"
					>
						<img
							src={member.image}
							alt="{member.name}"
							class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
							loading="lazy"
						/>
					</div>

					<!-- Card Content -->
					<div class="p-5 sm:p-6">
						<!-- Name -->
						<h3
							class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 text-center"
						>
							{member.name}
						</h3>

						<!-- Role -->
						<p
							class="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6 text-center"
						>
							{member.role}
						</p>

						<!-- Social Media Icons -->
						<div class="flex items-center justify-center gap-4">
							{#if member.socialLinks.facebook}
								<a
									href={member.socialLinks.facebook}
									target="_blank"
									rel="noopener noreferrer"
									class="social-icon text-gray-800 hover:text-[#1877f2] transition-colors duration-300"
									aria-label="{member.name} - Facebook"
								>
									<Facebook class="w-5 h-5" stroke-width="1.5" />
								</a>
							{/if}

							{#if member.socialLinks.twitter}
								<a
									href={member.socialLinks.twitter}
									target="_blank"
									rel="noopener noreferrer"
									class="social-icon text-gray-800 hover:text-[#1da1f2] transition-colors duration-300"
									aria-label="{member.name} - Twitter"
								>
									<Twitter class="w-5 h-5" stroke-width="1.5" />
								</a>
							{/if}

							{#if member.socialLinks.linkedin}
								<a
									href={member.socialLinks.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									class="social-icon text-gray-800 hover:text-[#0077b5] transition-colors duration-300"
									aria-label="{member.name} - LinkedIn"
								>
									<Linkedin class="w-5 h-5" stroke-width="1.5" />
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Smooth transitions for team cards */
	.team-card {
		transition-property: transform, box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Social icon hover effects */
	.social-icon {
		transition-property: color, transform;
		transition-duration: 0.3s;
		transition-timing-function: ease;
	}

	.social-icon:hover {
		transform: scale(1.2);
	}

	/* Image hover effect */
	.team-card img {
		transition: transform 0.5s ease;
	}

	/* Ensure proper image aspect ratio */
	.team-card .relative {
		aspect-ratio: 3 / 4;
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.team-card .relative {
			height: 280px;
		}
	}
</style>
