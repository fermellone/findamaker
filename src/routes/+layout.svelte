<script lang="ts">
	import Analytics from '$lib/components/Analytics.svelte';
	import '../app.postcss';
</script>

<Analytics />

<div class="dark:bg-gray-900 dark:text-white">
	<slot />
</div>
