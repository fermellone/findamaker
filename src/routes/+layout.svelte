<script lang="ts">
	import { page } from '$app/stores';
	import Analytics from '$lib/components/Analytics.svelte';
	import '../app.postcss';
</script>

<Analytics />

<slot />
