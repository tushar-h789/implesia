<script lang="ts">
    import aboutUsImage from '$lib/assets/images/home/banner/about-us.jpg';
    import tusharImage from '$lib/assets/images/home/image.png';
  </script>
  
  <section class="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 py-20 px-6 lg:px-20">
    <!-- Left Image -->
    <div class="w-full h-full">
      <img 
        src={aboutUsImage} 
        alt="Office" 
        class="w-full h-full object-cover rounded-xl shadow-lg" 
        loading="lazy"
        width={800}
        height={1000}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  
    <!-- Right Text Content -->
    <div class="flex flex-col justify-center space-y-6">
      <h1 class="text-4xl lg:text-5xl font-bold leading-tight">
        Transforming Ideas into<br />
        Digital Excellence
      </h1>
  
      <p class="text-gray-600 text-lg leading-relaxed max-w-xl">
        At Implesia, we specialize in delivering comprehensive end-to-end solutions for web and software development. 
        From initial concept to final deployment, we handle every aspect of your digital journey with precision and innovation.
      </p>
  
      <p class="text-gray-600 text-lg leading-relaxed max-w-xl">
        Our expertise spans custom web applications, enterprise software solutions, and scalable digital platforms. 
        We combine cutting-edge technology with strategic thinking to build solutions that drive growth, efficiency, and competitive advantage.
      </p>
  
      <button class="w-fit px-8 py-3.5 text-white bg-linear-to-r from-[#0BC1C0] to-[#0a9a99] rounded-full text-lg font-semibold hover:from-[#0a9a99] hover:to-[#0BC1C0] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
        Learn More About Us
      </button>
  
      <!-- Testimonial -->
      <div class="pt-10 space-y-5">
        <p class="text-2xl lg:text-3xl font-semibold leading-snug max-w-xl">
          "Implesia delivered exceptional end-to-end solutions that transformed our business operations. Their technical expertise and commitment to excellence are unmatched."
        </p>
  
        <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-md flex items-center justify-center">
            <img 
              src={tusharImage} 
              alt="Tushar Hossen" 
              class="w-full h-full rounded-full" 
              loading="lazy"
              width={64}
              height={64}
              sizes="64px"
            />
          </div>
          <div>
            <p class="text-lg font-semibold">Tushar Hossen</p>
            <p class="text-gray-500 text-sm">CEO and Founder, Implesia<br />Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  