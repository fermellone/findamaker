<script lang="ts">
	import Analytics from '$lib/components/Analytics.svelte';
	import '../app.postcss';

	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Analytics />

<slot />
