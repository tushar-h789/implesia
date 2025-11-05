<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<button
	{type}
	class={`rounded px-6 py-3 font-semibold transition ${
		variant === 'primary'
			? 'bg-blue-600 text-white hover:bg-blue-700'
			: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
	}`}
>
	<slot />
</button>
