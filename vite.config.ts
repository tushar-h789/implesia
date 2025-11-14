import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [
		imagetools({
			defaultDirectives: (url) => {
				// Default to WebP format with 85% quality
				if (url.searchParams.has('format')) return new URLSearchParams();
				return new URLSearchParams('?format=webp&quality=85');
			}
		}),
		tailwindcss(),
		sveltekit()
	]
});
