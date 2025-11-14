<script lang="ts">
	// @ts-expect-error - vite-imagetools processes these at build time
	import aboutUsImage1 from '$lib/assets/images/home/banner/about-us.jpg?w=400&h=300&format=webp&quality=80';
	// @ts-expect-error - vite-imagetools processes these at build time
	import aboutUsImage2 from '$lib/assets/images/home/banner/banner-1.jpg?w=400&h=300&format=webp&quality=80';
	// @ts-expect-error - vite-imagetools processes these at build time
	import aboutUsImage3 from '$lib/assets/images/home/banner/banner-2.jpg?w=400&h=300&format=webp&quality=80';
	// @ts-expect-error - vite-imagetools processes these at build time
	import tusharImage from '$lib/assets/images/home/image.png?w=128&h=128&format=webp&quality=90';
</script>

<section class="w-full bg-gray-100 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
	<div class="container mx-auto max-w-7xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
			<!-- Left Section: Image Collage -->
			<div class="relative w-full h-full min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px] pb-32 sm:pb-40 md:pb-48 lg:pb-52">
				<!-- Image Grid/Collage -->
				<div class="relative w-full h-full grid grid-cols-2 gap-x-1.5 xs:gap-x-2 sm:gap-x-3 gap-y-0.5 xs:gap-y-1 sm:gap-y-1.5">
					<!-- Top Left Image -->
					<div class="relative overflow-hidden rounded-lg shadow-xl h-[150px] xs:h-[180px] sm:h-[200px] md:h-[220px]">
						<img 
							src={aboutUsImage1} 
							alt="Team Collaboration"
							class="w-full h-full object-cover"
							loading="lazy"
							width={300}
							height={220}
							sizes="(max-width: 1024px) 50vw, 25vw"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
					</div>

					<!-- Top Right Image -->
					<div class="relative overflow-hidden rounded-lg shadow-xl h-[150px] xs:h-[180px] sm:h-[200px] md:h-[220px]">
						<img 
							src={aboutUsImage2} 
							alt="Business Meeting"
							class="w-full h-full object-cover"
							loading="lazy"
							width={300}
							height={220}
							sizes="(max-width: 1024px) 50vw, 25vw"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
					</div>

					<!-- Bottom Image (spans both columns) -->
					<div class="relative overflow-hidden rounded-lg shadow-xl col-span-2 h-[170px] xs:h-[200px] sm:h-[220px] md:h-[240px]">
						<img 
							src={aboutUsImage3} 
							alt="Team Working"
							class="w-full h-full object-cover"
							loading="lazy"
							width={600}
							height={240}
							sizes="(max-width: 1024px) 100vw, 50vw"
						/>
						<div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
					</div>
				</div>

				<!-- Yellow Experience Box - Positioned at intersection of 3 images -->
				<div class="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 px-3 xs:px-4 sm:px-5 md:px-6 py-2 xs:py-3 sm:py-4 md:py-5 shadow-2xl z-20">
					<div class="text-center">
						<div class="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-0.5 sm:mb-1">
							25+
						</div>
						<div class="text-[10px] xs:text-xs sm:text-sm md:text-base font-bold text-gray-900 uppercase tracking-wide">
							Experience
						</div>
					</div>
				</div>
			</div>

			<!-- Right Section: Text Content -->
			<div class="flex flex-col justify-center space-y-3 xs:space-y-4 sm:space-y-6 mt-8 lg:mt-0">
				<!-- Section Heading -->
				<div class="text-gray-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
					ABOUT US
				</div>

				<!-- Main Title -->
				<h2 class="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
					The primary goal of Implesia is to help organizations transform their digital presence through innovative web and software solutions.
				</h2>

				<!-- Body Paragraphs -->
				<div class="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
					<p>
						At Implesia, we specialize in delivering comprehensive end-to-end solutions for web and software development. 
						From initial concept to final deployment, we handle every aspect of your digital journey with precision and innovation.
					</p>
					<p>
						Our expertise spans custom web applications, enterprise software solutions, and scalable digital platforms. 
						We combine cutting-edge technology with strategic thinking to build solutions that drive growth, efficiency, and competitive advantage.
					</p>
				</div>

				<!-- Quote Section -->
				<div class="pt-3 sm:pt-4 border-l-4 border-[#0BC1C0] pl-3 sm:pl-4 md:pl-6">
					<blockquote class="text-gray-700 text-sm sm:text-base md:text-lg italic leading-relaxed underline decoration-gray-500">
						"Implesia delivered exceptional end-to-end solutions that transformed our business operations. Their technical expertise and commitment to excellence are unmatched."
					</blockquote>
					<div class="mt-3 text-gray-600 text-xs sm:text-sm">
						- IMPLESIA FOUNDER
					</div>
				</div>

				<!-- CEO Profile -->
				<div class="flex items-center space-x-3 sm:space-x-4 pt-3 sm:pt-4">
					<div class="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border-2 border-[#0BC1C0] shadow-lg">
						<img 
							src={tusharImage} 
							alt="Tushar Hossen"
							class="w-full h-full object-cover"
							loading="lazy"
							width={80}
							height={80}
							sizes="80px"
						/>
					</div>
					<div>
						<div class="text-gray-900 text-base sm:text-lg md:text-xl font-bold">
							Tushar Hossen
						</div>
						<div class="text-gray-600 text-xs sm:text-sm md:text-base">
							FOUNDER & CEO
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

