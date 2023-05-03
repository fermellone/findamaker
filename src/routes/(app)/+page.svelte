<script lang="ts">
	import ProblemsList from './../../lib/components/ProblemsList.svelte';
	import NewProblem from './../../lib/components/NewProblem.svelte';
	import { pageTitle } from '$lib/store';
	import type { PageData } from './$types';

	pageTitle.set('Problems over the world');

	export let data: PageData;

	$: ({ problems } = data);
</script>

<NewProblem />

<ProblemsList {problems} />
