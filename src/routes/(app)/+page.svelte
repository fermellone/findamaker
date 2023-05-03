<script lang="ts">
	import NewProblem from './../../lib/components/NewProblem.svelte';
	import { pageTitle } from '$lib/store';

	pageTitle.set('Problems over the world');
</script>

<NewProblem />
