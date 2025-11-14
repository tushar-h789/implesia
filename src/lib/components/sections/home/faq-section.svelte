<script lang="ts">
	import { Phone, Mail, Plus, Minus } from 'lucide-svelte';

	// FAQ item interface
	interface FAQItem {
		id: string;
		question: string;
		answer: string;
		isOpen?: boolean;
	}

	// FAQ data (JSON structure) - All about Implesia's web and software solutions
	let faqItems: FAQItem[] = $state([
		{
			id: '1',
			question: 'WHAT END-TO-END SOLUTIONS DOES IMPLESIA OFFER?',
			answer:
				'Implesia specializes in comprehensive end-to-end web and software development solutions. We handle everything from initial concept and planning to design, development, testing, deployment, and ongoing maintenance. Our services include custom web applications, enterprise software solutions, mobile applications, UI/UX design, cloud infrastructure setup, DevOps, and digital transformation consulting. We take your project from idea to production with full support throughout the journey.',
			isOpen: true
		},
		{
			id: '2',
			question: 'HOW LONG DOES IT TAKE TO COMPLETE A SOFTWARE PROJECT?',
			answer:
				'The timeline for software projects varies based on complexity and scope. A simple web application typically takes 6-12 weeks, while enterprise-level software solutions may take 3-6 months or more. We provide detailed project timelines during our initial consultation, breaking down each phase from requirements gathering to final deployment. Our agile methodology ensures regular updates and iterative delivery.',
			isOpen: false
		},
		{
			id: '3',
			question: 'CAN I REQUEST CHANGES AFTER THE SOFTWARE IS DELIVERED?',
			answer:
				'Absolutely! Implesia offers comprehensive post-launch support and maintenance. We provide bug fixes, feature enhancements, security updates, and performance optimizations. The level of support depends on your chosen maintenance plan. We also offer flexible change request processes for ongoing improvements and can scale your solution as your business grows.',
			isOpen: false
		},
		{
			id: '4',
			question: 'WHAT TECHNOLOGIES AND STACKS DO YOU USE?',
			answer:
				'We work with modern, industry-standard technologies tailored to your project needs. Our expertise includes frontend frameworks (React, Vue, Svelte, Angular), backend technologies (Node.js, Python, .NET, Java), databases (PostgreSQL, MongoDB, MySQL), cloud platforms (AWS, Azure, GCP), and DevOps tools. We choose the best technology stack based on your requirements, scalability needs, and long-term maintenance considerations.',
			isOpen: false
		},
		{
			id: '5',
			question: 'DO YOU PROVIDE HOSTING AND DEPLOYMENT SERVICES?',
			answer:
				'Yes! As part of our end-to-end solution, Implesia handles complete deployment and hosting setup. We configure cloud infrastructure, set up CI/CD pipelines, manage domain and SSL certificates, and ensure optimal performance and security. We also provide ongoing monitoring, backups, and infrastructure management to keep your application running smoothly.',
			isOpen: false
		}
	]);

	// Toggle FAQ item - Click to open, click again to close
	function toggleFAQ(id: string) {
		faqItems = faqItems.map((item) => {
			if (item.id === id) {
				// Toggle the clicked item (open if closed, close if open)
				return { ...item, isOpen: !item.isOpen };
			} else {
				// Close all other items
				return { ...item, isOpen: false };
			}
		});
	}
</script>

<section class="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#faf9f6]">
	<div class="container mx-auto max-w-7xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
			<!-- Left Section: Contact Information -->
			<div class="space-y-8">
				<!-- Banner: "FREQUENTLY ASK QUESTIONS" -->
				<div
					class="bg-[#0d6b6b] rounded-lg px-6 py-3 inline-block"
				>
					<span class="text-white font-bold text-sm sm:text-base uppercase tracking-wide">
FREQUENTLY ASK QUESTIONS
					</span>
				</div>

				<!-- Heading -->
				<div class="space-y-2">
					<h2
						class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#089a99] leading-tight"
					>
						NEED HELP?
					</h2>
					<h3
						class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
					>
						WE'RE HERE TO ANSWER
					</h3>
				</div>

				<!-- Contact Information -->
				<div class="space-y-6 pt-4">
					<!-- Phone Contact -->
					<div class="flex items-start gap-4">
						<div
							class="shrink-0 w-12 h-12 rounded-lg bg-[#089a99]/20 flex items-center justify-center"
						>
							<Phone class="w-6 h-6 text-[#089a99]" />
						</div>
						<div>
							<p class="text-gray-700 font-semibold mb-1">24/7 Customer care</p>
							<a
								href="tel:+8801516527932"
								class="text-gray-600 text-sm sm:text-base hover:text-[#089a99] transition-colors duration-300 cursor-pointer"
							>
								Call us : (+880) 1516 527 932
							</a>
						</div>
					</div>

					<!-- Email Contact -->
					<div class="flex items-start gap-4">
						<div
							class="shrink-0 w-12 h-12 rounded-lg bg-[#089a99]/20 flex items-center justify-center"
						>
							<Mail class="w-6 h-6 text-[#089a99]" />
						</div>
						<div>
							<p class="text-gray-700 font-semibold mb-1">For Technical Issues</p>
							<a
								href="mailto:tushar788hossen@gmail.com"
								class="text-gray-600 text-sm sm:text-base hover:text-[#089a99] transition-colors duration-300 cursor-pointer"
							>
								Mail us : tushar788hossen@gmail.com
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Section: FAQ Accordion -->
			<div class="space-y-6">
				<!-- Introductory Paragraph -->
				<p class="text-gray-700 leading-relaxed text-base sm:text-lg">
					We understand that choosing the right partner for your web and software
					development needs comes with many questions — from our development process and
					technologies, to project timelines, pricing, and ongoing support. Here's a
					collection of the most frequently asked questions about Implesia's end-to-end
					solutions to help you understand how we can transform your digital vision into
					reality.
				</p>

				<!-- FAQ Accordion Items -->
				<div class="space-y-4">
					{#each faqItems as item (item.id)}
						<!-- FAQ Item -->
						<div class="faq-item">
							<!-- Question Button -->
							<button
								class="w-full text-left bg-[#089a99]/20 rounded-lg px-5 py-4 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-[#089a99]/30"
								onclick={() => toggleFAQ(item.id)}
								aria-expanded={item.isOpen}
								aria-controls="faq-answer-{item.id}"
							>
								<span class="font-bold text-gray-900 text-sm sm:text-base flex-1">
									{item.question}
								</span>
								<div class="shrink-0">
									{#if item.isOpen}
										<Minus class="w-5 h-5 text-gray-900" stroke-width="2.5" />
									{:else}
										<Plus class="w-5 h-5 text-gray-900" stroke-width="2.5" />
									{/if}
								</div>
							</button>

							<!-- Answer Panel -->
							{#if item.isOpen}
								<div
									id="faq-answer-{item.id}"
									class="faq-answer bg-white rounded-lg px-5 py-4 mt-2 shadow-sm"
									role="region"
									aria-labelledby="faq-question-{item.id}"
								>
									<p class="text-gray-700 text-sm sm:text-base leading-relaxed">
										{item.answer}
									</p>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Smooth accordion animations */
	.faq-item {
		transition: all 0.3s ease;
	}

	.faq-answer {
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Ensure proper spacing */
	.faq-item button {
		transition-property: background-color, transform;
		transition-duration: 0.3s;
		transition-timing-function: ease;
	}

	.faq-item button:active {
		transform: scale(0.98);
	}
</style>
