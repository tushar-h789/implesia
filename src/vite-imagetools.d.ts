// Type declarations for vite-imagetools
// This allows TypeScript to recognize image imports with query parameters

declare module '*.jpg?*' {
	const src: string;
	export default src;
}

declare module '*.jpeg?*' {
	const src: string;
	export default src;
}

declare module '*.png?*' {
	const src: string;
	export default src;
}

declare module '*.webp?*' {
	const src: string;
	export default src;
}

declare module '*.gif?*' {
	const src: string;
	export default src;
}

declare module '*.svg?*' {
	const src: string;
	export default src;
}

