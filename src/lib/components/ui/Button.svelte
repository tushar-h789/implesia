<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	let sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	let variantClasses = {
		primary: 'bg-blue-600 text-white hover:bg-blue-700',
		secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
		outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-100'
	};

	// Get class from $$restProps if provided
	let className = $$restProps.class || '';
</script>

<button
	{type}
	class={`rounded font-semibold transition ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
	{...$$restProps}
>
	<slot />
</button>
