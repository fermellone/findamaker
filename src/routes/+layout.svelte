<script lang="ts">
	import { page } from '$app/stores';
	import Analytics from '$lib/components/Analytics.svelte';
	import '../app.postcss';

	let refreshingAnalytics = false;

	$: {
		$page.url.pathname;

		refreshingAnalytics = true;

		setTimeout(() => {
			refreshingAnalytics = false;
		}, 1);
	}
</script>

{#if !refreshingAnalytics}
	<Analytics />
{/if}

<slot />
