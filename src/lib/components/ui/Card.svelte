<script lang="ts">
	export let title: string;
	export let description: string;
</script>

<div class="rounded-lg border p-6 shadow-sm transition hover:shadow-md">
	<h3 class="mb-2 text-xl font-semibold">{title}</h3>
	<p class="text-gray-600">{description}</p>
	<slot name="footer" />
</div>
